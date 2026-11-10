/* The Summer Sorted popup. Every page except /summer loads this file.

   A small card that slides up in the bottom-right corner (a sheet along
   the bottom on phones) and points to /summer. It doesn't block the page
   or grab focus, so it's an invitation rather than a wall: the page
   behind still scrolls and clicks as normal.

   When it shows:
   - after 12 seconds on the page, or once the visitor has scrolled 40% of
     the way down, whichever comes first
   - never on /summer itself, never on the home page's booking form, and
     never after the offer closes (end of Friday 18 December, NZ time)
   - "Close" keeps it away for 3 days; "See the offer" keeps it away for
     good (they've seen it). Stored in localStorage, so it's per browser.

   Closes on Escape or the close button. It hides itself if the home page
   swaps to the booking form while it's open.

   Its styles are added here, so the pages only need the one <script> tag.
   To switch it off early, remove that tag from each page (or change END). */
(function () {
  'use strict';

  var END = Date.UTC(2026, 11, 18, 11, 0, 0); /* 19 Dec 00:00 NZDT */
  var KEY = 'tui-summer-popup';
  var SNOOZE = 3 * 24 * 60 * 60 * 1000;
  var DELAY = 12000;
  var DEPTH = 0.4;

  if (Date.now() >= END) return;
  if (/^\/summer\/?$/.test(location.pathname)) return;

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var saved = read();
  if (saved === 'seen') return;
  if (saved && Date.now() - Number(saved) < SNOOZE) return;

  function onBookForm() {
    var book = document.querySelector('[data-view="book"]');
    return location.hash === '#book' || !!(book && !book.hidden);
  }

  /* the same queue Vercel's analytics reads, as on the home page */
  function track(name) {
    try {
      window.va = window.va || function () { (window.vaq = window.vaq || []).push([].slice.call(arguments)); };
      window.va('event', { name: name });
    } catch (e) {}
  }

  var css = ''
    + '.sp{position:fixed;z-index:80;right:var(--frame,1rem);bottom:var(--frame,1rem);width:min(380px,calc(100vw - 2 * var(--frame,1rem)));'
    +   'padding:22px 22px 22px;border:1px solid var(--rule,rgba(239,242,248,.13));border-radius:28px;'
    +   'background:var(--surface,#0F1930);color:var(--ink,#EFF2F8);'
    +   'box-shadow:0 30px 60px -20px rgba(0,0,0,.7),0 0 0 1px rgba(0,0,0,.2);'
    +   'font-family:inherit;line-height:1.5;'
    +   'opacity:0;transform:translateY(24px);visibility:hidden;'
    +   'transition:opacity 420ms var(--ease-out,ease),transform 520ms var(--ease-out,ease),visibility 0s linear 520ms}'
    + '.sp.is-in{opacity:1;transform:none;visibility:visible;transition:opacity 420ms var(--ease-out,ease),transform 520ms var(--ease-out,ease),visibility 0s}'
    + '.sp-tag{display:inline-flex;align-items:center;gap:9px;padding:6px 13px 6px 11px;border:1px solid var(--rule,rgba(239,242,248,.13));border-radius:999px;'
    +   'font-size:.75rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--muted,#8996B2)}'
    + '.sp-tag i{position:relative;width:7px;height:7px;border-radius:50%;background:var(--accent,#6E9BF7);flex:none}'
    + '.sp-tag i::after{content:"";position:absolute;inset:0;border-radius:50%;background:var(--accent,#6E9BF7);opacity:.5;animation:spPing 2.4s cubic-bezier(.16,1,.3,1) infinite}'
    + '@keyframes spPing{from{transform:scale(1);opacity:.5}to{transform:scale(3);opacity:0}}'
    + '.sp-x{position:absolute;top:14px;right:14px;display:grid;place-items:center;width:36px;height:36px;padding:0;'
    +   'border:0;border-radius:50%;background:transparent;color:var(--muted,#8996B2);cursor:pointer;'
    +   'transition:background-color 160ms ease,color 160ms ease;-webkit-tap-highlight-color:transparent}'
    + '.sp-x svg{width:14px;height:14px}'
    + '@media (hover:hover){.sp-x:hover{background:var(--paper,#060D1A);color:var(--ink,#EFF2F8)}}'
    + '.sp-h{margin:16px 0 0;font-size:clamp(1.5rem,2.2vw,1.75rem);font-weight:500;letter-spacing:-.035em;line-height:1;text-wrap:balance}'
    + '.sp-p{margin:10px 0 0;font-size:.9375rem;color:var(--muted,#8996B2)}'
    + '.sp-stats{display:grid;grid-template-columns:repeat(3,1fr);margin:18px 0 0;padding:14px 0 0;border-top:1px solid var(--rule-2,rgba(239,242,248,.26))}'
    + '.sp-stats div{display:flex;flex-direction:column;gap:2px}'
    + '.sp-stats b{font-size:1.75rem;font-weight:500;letter-spacing:-.035em;line-height:1}'
    + '.sp-stats span{font-size:.75rem;color:var(--muted,#8996B2)}'
    + '.sp-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:20px 0 0}'
    + '.sp-price{display:flex;flex-direction:column;line-height:1.2}'
    + '.sp-price b{font-size:1.375rem;font-weight:600;letter-spacing:-.03em}'
    + '.sp-price span{font-size:.75rem;color:var(--muted,#8996B2)}'
    + '.sp .btn{flex:none}'
    + '.sp-x:focus-visible,.sp .btn:focus-visible{outline:2px solid var(--accent,#6E9BF7);outline-offset:3px}'
    + '@media (max-width:620px){'
    +   '.sp{left:var(--frame,.75rem);right:var(--frame,.75rem);width:auto;padding:20px;border-radius:24px;'
    +     'bottom:calc(var(--frame,.75rem) + env(safe-area-inset-bottom,0px))}'
    + '}'
    + '@media (prefers-reduced-motion:reduce){.sp,.sp.is-in{transform:none}.sp-tag i::after{animation:none}}';

  var el;

  function build() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    el = document.createElement('aside');
    el.className = 'sp';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'false');
    el.setAttribute('aria-labelledby', 'sp-h');
    el.innerHTML = ''
      + '<button class="sp-x" type="button" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>'
      + '<span class="sp-tag"><i aria-hidden="true"></i>Summer Sorted</span>'
      + '<h2 class="sp-h" id="sp-h">Film before the rush. Post all summer.</h2>'
      + '<p class="sp-p">One shoot before Christmas, a quick pickup in January when it\'s busy. Nothing ongoing.</p>'
      + '<div class="sp-stats">'
      +   '<div><b>10</b><span>Videos</span></div>'
      +   '<div><b>2</b><span>Ad-ready cuts</span></div>'
      +   '<div><b>40</b><span>Photos</span></div>'
      + '</div>'
      + '<div class="sp-foot">'
      +   '<div class="sp-price"><b>$3,000</b><span>6 businesses, book by 18 Dec</span></div>'
      +   '<a class="btn" href="/summer"><span class="btn-label"><span>See the offer</span><span aria-hidden="true">See the offer</span></span></a>'
      + '</div>';
    document.body.appendChild(el);

    el.querySelector('.sp-x').addEventListener('click', function () {
      write(String(Date.now()));
      track('Summer popup closed');
      hide();
    });
    el.querySelector('.btn').addEventListener('click', function () {
      write('seen');
      track('Summer popup clicked');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && el.classList.contains('is-in')) {
        write(String(Date.now()));
        hide();
      }
    });
  }

  var shown = false;
  function show() {
    if (shown || onBookForm()) return;
    shown = true;
    cleanup();
    if (!el) build();
    /* two frames so the starting position is painted before it moves */
    requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('is-in'); }); });
    track('Summer popup shown');
  }
  function hide() { if (el) el.classList.remove('is-in'); }

  var timer = setTimeout(show, DELAY);
  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (max > 0 && window.scrollY / max >= DEPTH) show();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  function cleanup() {
    clearTimeout(timer);
    window.removeEventListener('scroll', onScroll);
  }

  /* the home page swaps to the booking form without a page load */
  function onRoute() { if (onBookForm()) hide(); }
  window.addEventListener('hashchange', onRoute);
  window.addEventListener('popstate', onRoute);
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('[data-route="book"]')) hide();
  });
})();
