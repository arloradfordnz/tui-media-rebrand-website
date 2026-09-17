# tuimedia.nz

The Tui Media website. One hand-written HTML file, no build step, no framework,
deployed on Vercel.

## Layout of the repo

- `wireframe/` — **the deployed site**. This is Vercel's root directory, so
  `wireframe/index.html` is served at `/`, `wireframe/api/` at `/api/`, and so on.
  The folder name is historical; renaming it means changing the Root Directory
  setting in the Vercel project at the same time.
  - `index.html` — the whole site: markup, styles and script in one file.
  - `work/index.html` — the unlisted examples page at `/work`. Nothing links to
    it; it exists to be pasted into a message. Its clips are the only ones on
    the site that carry audio, and they live in `media/work/`.
  - `img/` — logos, marks and the founder portrait, all WebP.
  - `media/` — case-study clips and their poster frames.
  - `fonts/` — the self-hosted Bricolage Grotesque subsets.
  - `api/enquiry.js` — serverless function behind the booking form.
  - `vercel.json` — cache and security headers.
- `assets/`, `logo/` — brand source artwork the web assets are derived from.
- `videos/`, `videos-compressed/` — the video masters (git-ignored, kept locally).
  The web-ready cuts in `wireframe/media/` are made from these.
- `PALETTES.md` — the blue palette that ships, and the purple one that doesn't.

## Running it

```bash
python3 -m http.server 8777 --directory wireframe
```

Absolute paths (`/img/…`, `/fonts/…`) mean it has to be served, not opened as a
`file://` URL.

## The two views

`index.html` holds both `#home` and `#book` and swaps between them with a
click-driven router, with the hash kept in sync so browser back still works. The
curtain that plays on first paint is the same element that plays between routes,
driven by one state machine with a timer backing up every `animationend`, so a
swallowed event can't leave the site looking dead.

The book view is a filter form — name, business, email, what you sell, customer
value, ad spend, timing, decision maker, capacity, notes. It validates client
side, posts JSON to `/api/enquiry`, and that function emails the details through
Resend. It needs `RESEND_API_KEY` in the Vercel project's environment variables.

## Performance

The page carries no media on first load. Concretely: ~167KB of HTML and ~215KB of
everything else, and nothing from `media/`.

That rests on a few decisions worth not undoing:

- **Nothing is embedded as a data URI.** Images live in `img/` as WebP so they are
  cached across visits instead of being re-downloaded inside the HTML every time.
- **Case-study videos are `preload="none"` with no `autoplay`,** and their posters
  are held on `data-poster` rather than `poster`. One IntersectionObserver on the
  *strip* decides when the section is worth any work, 400px out; a 4fps poll then
  matches playback to the cards actually inside the frame. It is a poll and not an
  observer per video on purpose — see the long comment above `caseTick` in
  `index.html`, which is the bug that made the strip sit static. Putting `autoplay`
  back makes the browser fetch every clip on load regardless of what `preload` says.
- **`/work` loads its posters and nothing else.** The clips sit on `data-src`, so
  the first request for an mp4 there is the first time someone plays one.
- **Every `<img>` carries `width` and `height`.** The logo strip measures its own
  track to work out how many copies it needs, and a track measured before the
  plates have intrinsic sizes comes out short and runs dry before it wraps.
- **The font is self-hosted** and the latin subset is preloaded. Google Fonts cost
  two extra connections and a chained request on the critical path.
- **`vercel.json` sets the cache headers.** Vercel's default for static files is
  `max-age=0, must-revalidate` — every asset revalidated on every visit. Fonts are
  immutable for a year; `img/` and `media/` are cached 30 days with
  stale-while-revalidate, so a replaced clip under an existing filename takes up to
  a month to propagate. Rename the file if it needs to be immediate.

Video masters are re-encoded twice, because the two surfaces want different
things. The home-page marquee is silent wallpaper — small, muted, many at once
— at 608x1080, CRF 28, 25fps, no audio, `+faststart`:

```bash
ffmpeg -i in.mp4 -an -c:v libx264 -preset slow -crf 28 -profile:v high -level 4.0 \
  -pix_fmt yuv420p -vf "scale=608:1080:flags=lanczos" -r 25 -g 50 \
  -movflags +faststart out.mp4
```

`/work` is the opposite: one clip at a time, watched deliberately, with sound.
Those go to `media/work/` at 720x1280, CRF 24, 30fps, AAC 128k:

```bash
ffmpeg -i in.mp4 -c:v libx264 -preset slow -crf 24 -profile:v high -level 4.1 \
  -pix_fmt yuv420p -vf "scale=720:1280:flags=lanczos" -r 30 -g 60 \
  -c:a aac -b:a 128k -ac 2 -ar 48000 \
  -movflags +faststart media/work/out.mp4
```

Posters are a frame at 1s, half size, WebP q72. This ffmpeg has no webp
encoder and `sips` only reads the format, so the frame comes out as PNG and
Pillow converts it.

## Motion

One easing token, `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`. No libraries.

- **Entrance reveals**: `[data-anim]` fades and rises, one-shot via
  IntersectionObserver. Siblings stagger 60ms apart, set in JS as `--anim-delay`.
  A sweep in the scroll painter reveals anything scrolled past outright, so anchor
  jumps and scroll restoration can't leave content stuck invisible.
- **The scrubbed sentence** and the **process rail** are tied to scroll position
  rather than a clock, so they read the same going back up the page.
- **The case marquee** duplicates its own track in JS so the loop is seamless. The
  **logo marquee** is frame-driven rather than a CSS animation so it can follow the
  scroll direction, easing between forward and reverse instead of flipping.
- **Hover motion is gated** behind `(hover: hover) and (pointer: fine)` so taps
  don't fire it on touch.
- **Reduced motion** drops movement and keeps meaning: opacity only, marquees
  stopped, the scrubbed sentence shown fully lit, and case-study posters standing
  in for the loops.

## Conventions

- Type and spacing run off tokens at the top of the stylesheet (`--t-*` for type,
  `--s-*` for space, `--frame` for the page edge, `--content` for where content
  stops). Change those, not the individual rules.
- Breakpoints at 1024px (pad spacing), 900px (process and team stack), 700px (fit
  cards stack) and 620px (full-width buttons, tighter nav, smaller cases).
- **Button labels appear twice.** The hover slide keeps a duplicate label
  underneath, both inside `.btn-label`, so changing button text means changing it
  in both spans.

## SEO

- `/work` is deliberately absent from the sitemap and the nav, and carries both a
  `noindex` meta and an `X-Robots-Tag` from `vercel.json`. None of that is a lock —
  anyone with the URL can open it. It is unlisted, not private.
- Canonical, `og:url`, the sitemap and every `@id` in the JSON-LD point at
  `https://www.tuimedia.nz/`, which is what the apex redirects to. If the primary
  domain in Vercel is ever switched to the apex, all four have to move with it.
- The JSON-LD graph is ProfessionalService, Person, WebSite, WebPage and FAQPage.
  The FAQ answers there are duplicated in the markup and have to stay in step.
- There is deliberately no `aggregateRating`. Google does not allow a business to
  mark up reviews of itself on its own site, and the "5.0 from 12 Google reviews"
  line stays as plain text for that reason.
