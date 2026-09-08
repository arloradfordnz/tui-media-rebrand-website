// Vercel serverless function. Receives the booking form and emails the
// details via Resend instead of the visitor's own mail client.
// Needs RESEND_API_KEY set in the Vercel project's environment variables.

const TO = 'hello@tuimedia.nz';
const FROM = 'Tui Media <noreply@tuimedia.nz>';

const FIELD_LABELS = {
  name: 'Your name',
  business: 'Business',
  email: 'Email',
  sell: 'What do you sell?',
  value: "What's a customer worth to you?",
  spend: 'Monthly ad spend',
  when: 'When do you want ads live?',
  decision: 'Who signs this off?',
  capacity: 'Could you handle more work right now?',
  notes: 'Anything else?'
};
const FIELD_ORDER = ['name', 'business', 'email', 'sell', 'value', 'spend', 'when', 'decision', 'capacity', 'notes'];
const REQUIRED = ['name', 'business', 'email', 'sell', 'value', 'spend', 'when', 'decision', 'capacity'];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Needs CRM_ENQUIRY_URL (https://<crm>/api/enquiry) and CRM_ENQUIRY_SECRET set
// in the Vercel project. With either missing this is a no-op, which is the
// right behaviour for a preview deployment that has no business writing to the
// live CRM.
async function postToCrm(data) {
  const url = process.env.CRM_ENQUIRY_URL;
  const secret = process.env.CRM_ENQUIRY_SECRET;
  if (!url || !secret) {
    console.warn('CRM_ENQUIRY_URL/CRM_ENQUIRY_SECRET not set — enquiry emailed but not filed in the CRM');
    return;
  }

  // A slow CRM must not hold up the visitor's form submission. The email has
  // already gone by this point, so abandoning the write costs a record, not
  // the lead.
  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), 5000);
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-enquiry-secret': secret },
      body: JSON.stringify(data),
      signal: abort.signal
    });
    if (!resp.ok) {
      console.error('CRM enquiry write failed', resp.status, await resp.text());
    }
  } catch (err) {
    console.error('CRM enquiry write failed', err);
  } finally {
    clearTimeout(timer);
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const data = req.body || {};

  for (const field of REQUIRED) {
    if (!String(data[field] || '').trim()) {
      return res.status(400).json({ ok: false, error: `Missing field: ${field}` });
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ ok: false, error: 'Email is not configured' });
  }

  const rows = FIELD_ORDER
    .filter((f) => String(data[f] || '').trim())
    .map((f) => `<tr><td style="padding:4px 12px 4px 0;color:#666;white-space:nowrap;vertical-align:top">${escapeHtml(FIELD_LABELS[f])}</td><td style="padding:4px 0">${escapeHtml(data[f]).replace(/\n/g, '<br>')}</td></tr>`)
    .join('');

  const textBody = FIELD_ORDER
    .filter((f) => String(data[f] || '').trim())
    .map((f) => `${FIELD_LABELS[f]}: ${data[f]}`)
    .join('\n');

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: data.email,
        subject: `New enquiry: ${data.business}`,
        html: `<table cellpadding="0" cellspacing="0">${rows}</table>`,
        text: textBody
      })
    });

    if (!resp.ok) {
      const body = await resp.text();
      console.error('Resend error', resp.status, body);
      return res.status(502).json({ ok: false, error: 'Failed to send email' });
    }

    // Also file it in the CRM, so the answers land against a client record
    // instead of only in an inbox.
    //
    // Deliberately after the email and deliberately non-fatal. The email is
    // what guarantees a human sees the enquiry; the CRM write is what makes it
    // workable. If the CRM is down, mid-deploy, or the secret is wrong, the
    // visitor must still get a success — they did their part, and the enquiry
    // is not lost. The failure is logged for whoever reads the function logs.
    await postToCrm(data);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Enquiry send failed', err);
    return res.status(500).json({ ok: false, error: 'Failed to send email' });
  }
}
