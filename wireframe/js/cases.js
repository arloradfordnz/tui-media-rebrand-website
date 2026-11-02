/* The case studies, in one place. /work lists them and /work/case/ shows
   one at a time (/work/case/?client=atk-detailing). The home page's four
   are written into index.html by hand, so a new client goes there too.

   slug     the client's address on the site
   name     the client
   trade    one or two words, shown beside the name
   summary  a sentence on what the work was
   made     what we made them; left empty, the page skips that line
   shots    how many 16:9 frames to show. They are placeholders until the
            landscape cuts exist. */
window.TUI_CASES = [
  { slug: 'johnson-residential', name: 'Johnson Residential', trade: 'Residential building',
    summary: "Videos from Johnson Residential's building sites, with the team on camera talking through their homes, from the concrete pour to the finished build.",
    made: 'Short vertical videos filmed on site, with the builders on camera and drone shots of the finished homes.',
    shots: 3 },
  { slug: 'atk-detailing', name: 'ATK Detailing', trade: 'Car detailing',
    summary: "ATK Detailing's owner on camera, talking through the work and the protection they offer, with the detailing shown up close.",
    made: 'Short vertical videos built around the owner talking to camera, cut with close-ups of the work.',
    shots: 3 },
  { slug: 'landscape-transformers', name: 'Landscape Transformers', trade: 'Landscaping',
    summary: 'Videos made for Landscape Transformers.',
    made: '',
    shots: 3 },
  { slug: 'sky-automotive', name: 'Sky Automotive', trade: 'Automotive servicing',
    summary: "Sky Automotive's workshop on camera, from detail work on the cars to the opening of their new Nelson location.",
    made: 'Short vertical videos shot in the workshop, including one for the launch of the new location.',
    shots: 3 }
];
