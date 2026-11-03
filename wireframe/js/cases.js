/* The case studies, in one place. /work lists them and /work/case/ shows
   one at a time (/work/case/?client=atk-detailing). The home page's cards
   are written into index.html by hand, so a new client goes there too.

   slug     the client's address on the site
   name     the client
   trade    one or two words, shown beside the name
   summary  a sentence on what the work was
   made     what we made them; left empty, the page skips that line
   image    the picture on the client's card on /work; left out, the card
            shows the plain ground
   clips    the client's videos on their case study page, newest first.
            Each name is a pair in media/work/: <name>.mp4 (720x1280 with
            sound) and <name>-poster.webp. Nothing downloads until a
            visitor taps one.
   stills   landscape (16:9) pictures for a client who has stills rather than
            vertical clips: media/<name>.webp (1600 wide) with a smaller
            media/<name>-card.webp for the card. Shown big on their page.
   hidden   true keeps a client off /work, out of "Next case study" and
            sends their page back to /work, until there's footage to show
            (nobody is hidden right now). To bring one back, take it off
            and put their card on the home page. */
window.TUI_CASES = [
  { slug: 'johnson-residential', image: '/media/johnson-residential-1-poster.webp', name: 'Johnson Residential', trade: 'Residential building',
    summary: "Videos from Johnson Residential's building sites, with the team on camera talking through their homes, from the concrete pour to the finished build.",
    made: 'Short vertical videos filmed on site, with the builders on camera and drone shots of the finished homes.',
    clips: ['johnson-residential-4', 'johnson-residential-3', 'johnson-residential-1', 'johnson-residential-2'] },
  { slug: 'atk-detailing', image: '/media/atk-detailing-poster.webp', name: 'ATK Detailing', trade: 'Car detailing',
    summary: "ATK Detailing's owner on camera, talking through the work and the protection they offer, with the detailing shown up close.",
    made: 'Short vertical videos built around the owner talking to camera, cut with close-ups of the work.',
    clips: ['atk-detailing-3', 'atk-detailing'] },
  { slug: 'landscape-transformers', image: '/media/landscape-transformers-1-card.webp', name: 'Landscape Transformers', trade: 'Landscaping',
    summary: 'Landscape Transformers at work on a new build, with the team on camera, close-ups of the crew and drone shots of the site.',
    made: 'Videos filmed on site with the team talking to camera, close-ups of the work and drone footage of the job.',
    stills: ['landscape-transformers-1', 'landscape-transformers-2', 'landscape-transformers-3'],
    alt: ['A Landscape Transformers team member in a branded cap and shirt on a building site', 'A drone view of a new build with the landscaping crew at work on the site', 'A close-up of a builder cutting timber with a circular saw on site'] },
  { slug: 'sky-automotive', image: '/media/sky-automotive-1-poster.webp', name: 'Sky Automotive', trade: 'Automotive servicing',
    summary: "Sky Automotive's workshop on camera, from detail work on the cars to the opening of their new Nelson location.",
    made: 'Short vertical videos shot in the workshop, including one for the launch of the new location.',
    clips: ['sky-automotive-3', 'sky-automotive-1'] },
  { slug: 'brook-sanctuary', image: '/media/brook-sanctuary-1-card.webp', name: 'Brook Waimārama Sanctuary', trade: 'Wildlife sanctuary',
    summary: "Interview-style videos with the people from the Brook Waimārama Sanctuary, filmed on site at the sanctuary's entrance.",
    made: 'Interview videos filmed on site at the sanctuary, with the team talking to camera.',
    stills: ['brook-sanctuary-1', 'brook-sanctuary-2', 'brook-sanctuary-3'],
    alt: ["A man laughing in front of the sanctuary's bird sign", "A man in a cap and overalls smiling in front of the sanctuary's bird sign", "A man in a hi-vis vest and glasses laughing in front of the sanctuary's bird sign"] }
];
