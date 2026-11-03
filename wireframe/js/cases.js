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
            sound) and <name>-cover.webp. Nothing downloads until a
            visitor taps one.
   stills   landscape (16:9) pictures shown big at the top of the client's page
            (a client can have stills, clips or both; the first still is the hero): media/<name>.webp (1600 wide) with a smaller
            media/<name>-thumb.webp for the card. Shown big on their page.
   stillsTall  vertical 9:16 grabs (media/<name>.webp, 720x1280) for a client
            whose footage is vertical; shown four across like the video cards
   hidden   true keeps a client off /work, out of "Next case study" and
            sends their page back to /work, until there's footage to show
            (nobody is hidden right now). To bring one back, take it off
            and put their card on the home page. */
window.TUI_CASES = [
  { slug: 'johnson-residential', image: '/media/johnson-residential-still-1-thumb.webp', name: 'Johnson Residential', trade: 'Residential building',
    summary: "Johnson Residential's builders on camera, walking through their homes from the concrete pour to the finished build.",
    made: 'Short vertical videos filmed on site, with the builders on camera and drone shots of the finished homes.',
    stills: ['johnson-residential-still-1', 'johnson-residential-still-2', 'johnson-residential-still-3'],
    alt: ['A Johnson Residential builder in a hi-vis vest and sunglasses talking to camera on a building site', 'A drone view of a timber-framed Johnson Residential build site in Nelson', 'A Johnson Residential builder standing in front of the site hoarding and scaffolding'],
    clips: ['johnson-residential-4', 'johnson-residential-3', 'johnson-residential-1', 'johnson-residential-2'] },
  { slug: 'atk-detailing', image: '/media/atk-detailing-thumb.webp', name: 'ATK Detailing', trade: 'Car detailing',
    summary: "ATK Detailing's owner on camera, talking through the work and the protection they offer, with the detailing shown up close.",
    made: 'Short vertical videos built around the owner talking to camera, cut with close-ups of the work.',
    stillsTall: ['atk-detailing-still-1', 'atk-detailing-still-2', 'atk-detailing-still-3', 'atk-detailing-still-4'],
    altTall: ["ATK Detailing's owner in the branded tee in front of a car", 'Washing the side of a car by hand', 'Working on a car door up close', 'Detailing the inside of a car'],
    clips: ['atk-detailing-3', 'atk-detailing'] },
  { slug: 'landscape-transformers', image: '/media/landscape-transformers-1-thumb.webp', name: 'Landscape Transformers', trade: 'Landscaping',
    summary: 'The Landscape Transformers crew at work on a new build: the team on camera, the work up close, and the whole site from the air.',
    made: 'Videos filmed on site with the team talking to camera, close-ups of the work and drone footage of the job.',
    stills: ['landscape-transformers-1', 'landscape-transformers-2', 'landscape-transformers-3'],
    alt: ['A Landscape Transformers team member in a branded cap and shirt on a building site', 'A drone view of a new build with the landscaping crew at work on the site', 'A close-up of a builder cutting timber with a circular saw on site'] },
  { slug: 'sky-automotive', image: '/media/sky-automotive-thumb.webp', name: 'Sky Automotive', trade: 'Automotive servicing',
    summary: "Sky Automotive's workshop on camera, from detail work on the cars to the opening of their new Nelson location.",
    made: 'Short vertical videos shot in the workshop, including one for the launch of the new location.',
    stillsTall: ['sky-automotive-still-1', 'sky-automotive-still-2', 'sky-automotive-still-3', 'sky-automotive-still-4'],
    altTall: ['A red classic Porsche under the lights in the Sky Automotive workshop', 'Polishing the bonnet of the Porsche', 'A Porsche headlight and gleaming red paint up close', 'The Porsche badge on freshly polished red paint'],
    clips: ['sky-automotive-3', 'sky-automotive-1'] },
  { slug: 'brook-sanctuary', image: '/media/brook-sanctuary-1-thumb.webp', name: 'Brook Waimārama Sanctuary', trade: 'Wildlife sanctuary',
    summary: "The people of the Brook Waimārama Sanctuary on camera, filmed on site under the sanctuary's big bird sign.",
    made: 'Interview videos filmed on site at the sanctuary, with the team talking to camera.',
    stills: ['brook-sanctuary-1', 'brook-sanctuary-2', 'brook-sanctuary-3'],
    alt: ["A man laughing in front of the sanctuary's bird sign", "A man in a cap and overalls smiling in front of the sanctuary's bird sign", "A man in a hi-vis vest and glasses laughing in front of the sanctuary's bird sign"] }
];
