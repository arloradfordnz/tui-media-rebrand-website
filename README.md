# Tui Media Rebrand Website

New build for the Tui Media rebrand. Starts clean: nothing here is carried over from
`tui-media-website`, the `redesign/bloom` branch, or any earlier draft.

## Folders

- `wireframe/` — layout, typography and spacing study. Single self-contained HTML file,
  no build step. Open `wireframe/index.html` in a browser.
- `reference/` — screenshots, boards and anything the direction is being pulled from.

## Current state

Stage: **wireframe draft, rev 17**. One file, two routed views. Structure, rhythm and interaction behaviour.

- Type: Bricolage Grotesque (Google Fonts), variable, optical sizing on.
- Colour: two full palettes live in the file, blue (default) and purple (saved).
  Switch with `data-palette="purple"` on the `<html>` tag. See PALETTES.md.
- Text selection uses the accent.
- Logo: two marks now, both embedded as data URIs.
  `assets/tui-bird.png` (bird only, supplied pre-trimmed) is masked in accent for the
  nav — 18x32 at rest, so the pill has room for the menu. `assets/tui-logo-trimmed.png`
  (the full lockup, canvas trimmed off `24Artboard 5.png`) stays an `<img>` in the footer,
  where there's space for it., white artwork on transparency, embedded in the HTML as
  a base64 data URI. That's deliberate: a linked file breaks the moment the wireframe is
  opened on its own, same reason there's no second page.
- Media blocks are four stepped greys (`--slot-1` to `--slot-4`) standing in for video and stills.
- Copy: placeholder, written in voice so line lengths are honest, not lorem.

## The frame

Two tokens. `--frame` is the gap above the nav and the minimum side gutter. `--content`
(1120px) is where content stops, so columns aren't stretched edge to edge on a wide
screen. Nav, hero media, fit cards, process, team and FAQ all resolve to the same left
and right edge — measured at 1084px wide with a 90px gap each side on a 1280 viewport.

Deliberately full bleed and outside that edge: the case-study marquee (it's a continuous
scroll) and the closing panel (rounded top corners, meets the bottom of the window).

## Section order

1. Pill nav on `--surface`, not sticky, capped at 1120px. Logo, menu links, CTA
2. Hero — location eyebrow, centred two-line display headline, lede, two buttons
3. Hero media block, 16:9, swaps as you scroll (colour steps 1 through 4)
4. Client logos — one scrolling line of plates, white logos, direction follows scroll
5. Reveal statement — words light up on scroll scrub, double.io style
6. It's not for everyone — subheading plus two `--surface` cards: ticks on one side,
    crosses on the other, icons in accent
7. The process we follow — one vertical line per step, no numbers, no rules.
    The lines fill with accent in turn on a loop and the image changes with each one
8. Case studies — 9:16 cards (1080x1920, so social cuts drop straight in), rounded,
    continuous horizontal marquee
9. Meet the team — square portrait left, "Hey there" heading and four paragraphs right
10. Questions? — ported from tui-media-website/components/FAQ.tsx: hairline rows,
    28px circled plus, one open at a time, icon spins on hover
11. Closing panel — `--surface`, full bleed, rounded top corners only, one centred
    button, footer inside it: logo bottom left, location and links right

## Book view

Every Book a Call button routes to the book view: a filter form (name, business, email,
what you sell, monthly ad spend, timeline, notes). Fields are rounded and outlined on the
same tokens; focus turns the outline accent. Submit validates and swaps to a success
panel — no backend wired yet, that's flow only.

**Why one file, not two.** A second `contact.html` breaks the moment the wireframe is
opened anywhere the relative link can't resolve — a `data:` embed, or the file downloaded
on its own. So both views live in `index.html` and the router is click-driven, with the
hash kept in sync where the protocol allows it so browser back still works. It maps 1:1
to a real `/book` route in the build.

## Motion

The hero grow animation was removed in rev 14; the media block is full bleed instead.

One easing token, `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`. No libraries.

- **Entrance reveals**: `[data-anim]` fades and rises 16px, 520ms, one-shot via
  IntersectionObserver. Siblings stagger 60ms apart, set in JS as `--anim-delay`.
  A sweep in the scroll painter reveals anything scrolled past outright, so anchor
  jumps and scroll restoration can't leave content stuck invisible.
- **Hover motion is gated** behind `(hover: hover) and (pointer: fine)` so taps don't
  fire it on touch.
- **Reduced motion** drops movement and keeps meaning: no scale, no rise, opacity only
  at 200ms, marquee stopped, and the scrubbed sentence shown fully lit.

## Behaviour notes

- **Scroll swap** and **reveal** are both scrubbed off scroll position, not one-shot
  triggers, so they read the same going back up the page.
- **Case marquee** duplicates its own track in JS so the loop is seamless.
- **Logo marquee** is frame-driven instead of a CSS animation so it can follow the scroll
  direction, easing between forward and reverse rather than flipping instantly.
- **Process line** is distance-based, not a timer per step: one head travels the column at
  a constant 52px/s (~11s for five steps), so it doesn't jump between segments. Segment gaps
  are 4px, crossed in ~80ms. At the bottom the whole line clears in one frame, holds 420ms,
  then runs again from the top — no per-segment drain.
- **The process list does not expand.** Both columns are the same height because the image
  stretches to whatever the list needs, rather than the list being capped to the image.
- **Buttons** are accent-filled by default, `.btn.light` for the near-white variant. The
  circled arrow is always the inverse of the button surface. On hover the label slides up
  and a duplicate underneath takes its place, double.io style. Both label copies live in
  `.btn-label`, so changing button text means changing it twice.
- Everything degrades under `prefers-reduced-motion`.

## Scale

Type and spacing run off tokens at the top of the stylesheet (`--t-*` for type,
`--s-*` for space, `--frame` for the page edge). Change those, not the individual rules.

Breakpoints at 1024px (pad spacing), 900px (process/team stack), 700px (fit cards
stack) and 620px (full-width buttons, tighter nav, smaller cases).

## Not decided yet

- Final palette, and what the four media slots actually are
- Whether case studies link out to their own pages
- Whether the process image is a still or a loop
