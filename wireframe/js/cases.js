/* The case studies, in one place. /work lists them and /work/case/ shows
   one at a time (/work/case/?client=atk-detailing). The home page's cards
   are written into index.html by hand, so a new client goes there too.

   slug     the client's address on the site
   name     the client
   trade    one or two words, shown beside the name
   summary  a sentence on what the work was
   brief    the fuller story: why they came to us and what the job
            involved, a short paragraph on the client's own page; left
            empty, the page skips it
   service  which of our two offers it was, as a short phrase
   made     what we made them; left empty, the page skips that line
   results  real numbers from the client's own accounts, each
            { n: the figure, t: one plain sentence on what it means };
            left out, the page has no results section. Never estimate.
   image    the picture on the client's card on /work; left out, the card
            shows the plain ground
   clips    the client's videos on their case study page, newest first.
            Each name is a pair in media/work/: <name>.mp4 (720x1280 with
            sound) and <name>-cover.webp. Nothing downloads until a
            visitor taps one.
   clipsWide  the same, for 5:4 landscape cuts (1080x864); they sit two
            across under the vertical ones instead of being cropped to 9:16
   stills   landscape (16:9) pictures shown big at the top of the client's page
            (a client can have stills, clips or both; the first still is the hero): media/<name>.webp (2400 wide) with a smaller
            media/<name>-thumb.webp (1600 wide) for the card. Shown big on their page.
   stillsTall  vertical 9:16 grabs (media/<name>.webp, 720x1280) for a client
            whose footage is vertical; shown four across like the video cards
   hidden   true keeps a client off /work, out of "Next case study" and
            sends their page back to /work, until there's footage to show
            (nobody is hidden right now). To bring one back, take it off
            and put their card on the home page. */
window.TUI_CASES = [
  { slug: 'johnson-residential', image: '/media/johnson-residential-still-1-thumb.webp?v=3', name: 'Johnson Residential', trade: 'Residential building',
    summary: "Johnson Residential's builders on camera, walking through their homes from the concrete pour to the finished build.",
    brief: "Johnson Residential brought us on for monthly content of their builds in progress, from the framing through to the finished home, for their own social media. We're still shooting for them every month.",
    service: 'Monthly content',
    results: [
      { n: '+274%', t: 'more views on our best video for them than on their best usual post (7,100 against 1,900).' },
      { n: '+141%', t: 'more likes on that video than on their best usual post (106 against 44).' },
      { n: '+68%', t: 'more views on a second video, at 3,200, than on their best usual post.' }
    ],
    made: 'Short vertical videos filmed on site, with the builders on camera and drone shots of the finished homes.',
    stills: ['johnson-residential-still-1', 'johnson-residential-still-2', 'johnson-residential-still-3'],
    alt: ['A Johnson Residential builder in a hi-vis vest and sunglasses talking to camera on a building site', 'A drone view of a timber-framed Johnson Residential build site in Nelson', 'A Johnson Residential builder standing in front of the site hoarding and scaffolding'],
    clips: ['johnson-residential-4', 'johnson-residential-3', 'johnson-residential-1', 'johnson-residential-2'] },
  { slug: 'atk-detailing', image: '/media/atk-detailing-2-thumb.webp?v=3', name: 'ATK Detailing', trade: 'Car detailing',
    summary: "ATK Detailing's owner on camera, talking through the work and the protection they offer, with the detailing shown up close.",
    brief: "ATK Detailing came to us wanting more bookings for his detailing work. We've shot five or so videos with him over the past year, at different stages of the business: mostly social content, plus one video ad.",
    service: 'Social content and a video ad',
    results: [
      { n: '+5,900%', t: 'more views on the ad than on his usual videos: 60,000 on Instagram against about 1,000.' },
      { n: '1,204', t: 'likes on the same ad across Instagram (674) and TikTok (530, from just 7,000 views).' },
      { n: '500+', t: 'likes when he shared his videos in local Facebook groups.' }
    ],
    made: 'Short vertical videos built around the owner talking to camera, cut with close-ups of the work.',
    stills: ['atk-detailing-1', 'atk-detailing-2', 'atk-detailing-3'],
    alt: ["ATK Detailing's owner in the branded tee talking to camera in a park", 'Polishing a blue car with a cordless polisher', 'Dripping a coating onto a gloved hand beside a blue car'],
    clips: ['atk-detailing-3', 'atk-detailing'] },
  { slug: 'landscape-transformers', image: '/media/landscape-transformers-6-thumb.webp?v=3', name: 'Landscape Transformers', trade: 'Landscaping',
    summary: 'The Landscape Transformers crew at work on a new build: the team on camera, the work up close, and the whole site from the air.',
    brief: "We film monthly content for Landscape Transformers as their projects come together. Most recently that was the artificial grass install at their Emano St job, from the site prep through to the finished lawn.",
    service: 'Monthly content',
    made: 'Videos filmed on site with the team talking to camera, close-ups of the work and drone footage of the job.',
    stills: ['landscape-transformers-6', 'landscape-transformers-2', 'landscape-transformers-5', 'landscape-transformers-4', 'landscape-transformers-3'],
    alt: ['A spreader rolling across the new artificial lawn, a blower on the path beside it', 'A drone view of a new build with the landscaping crew at work on the site', 'Brushing up the pile of a freshly laid artificial lawn outside a new home', 'Trimming the edge of a roll of artificial grass with a utility knife', 'A close-up of a builder cutting timber with a circular saw on site'],
    clips: ['landscape-transformers-1', 'landscape-transformers-3', 'landscape-transformers-4'] },
  { slug: 'sky-automotive', image: '/media/sky-automotive-thumb.webp?v=3', name: 'Sky Automotive', trade: 'Automotive servicing',
    summary: "Sky Automotive's workshop on camera, from detail work on the cars to the opening of their new Nelson location.",
    brief: "Sky Automotive wanted Meta ads that would bring new customers through the door, alongside video for the launch of their new Nelson location. We filmed their detail work in the workshop, including a red classic Porsche, and cut the video for the new site's opening.",
    service: 'Meta video ads',
    made: 'Short vertical videos shot in the workshop, including one for the launch of the new location.',
    stillsTall: ['sky-automotive-still-1', 'sky-automotive-still-2', 'sky-automotive-still-3', 'sky-automotive-still-4'],
    altTall: ['A red classic Porsche under the lights in the Sky Automotive workshop', 'Polishing the bonnet of the Porsche', 'A Porsche headlight and gleaming red paint up close', 'The Porsche badge on freshly polished red paint'],
    clips: ['sky-automotive-3', 'sky-automotive-1'] },
  { slug: 'brook-sanctuary', image: '/media/brook-sanctuary-1-thumb.webp?v=3', name: 'Brook Waimārama Sanctuary', trade: 'Wildlife sanctuary',
    summary: "The people of the Brook Waimārama Sanctuary on camera, filmed on site under the sanctuary's big bird sign.",
    brief: "We make monthly content for the Brook Waimārama Sanctuary's social media, interviewing the people who work to protect the reserve about what they do there.",
    service: 'Monthly content',
    made: 'Interview videos filmed on site at the sanctuary, with the team talking to camera.',
    stills: ['brook-sanctuary-1', 'brook-sanctuary-2', 'brook-sanctuary-3'],
    alt: ["A man laughing in front of the sanctuary's bird sign", "A man in a cap and overalls smiling in front of the sanctuary's bird sign", "A man in a hi-vis vest and glasses laughing in front of the sanctuary's bird sign"] }
];
