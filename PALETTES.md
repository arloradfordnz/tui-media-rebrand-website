# Palettes

Two full sets, kept in sync tone for tone. Blue is live.

**Only the blue set ships.** The purple block used to sit in the stylesheet under
`[data-palette="purple"]`, downloaded by every visitor and used by none of them, so
it lives here instead. To switch, paste the purple values over the ones in `:root`
in `wireframe/index.html` — nothing else changes. Every surface, rule and form
control reads from these tokens.

| Token | Blue (live) | Purple (saved) | Used for |
| --- | --- | --- | --- |
| `--paper` | `#060D1A` | `#0E0817` | Page background |
| `--surface` | `#0F1930` | `#1B1329` | Nav pill, footer panel, fit cards, case detail |
| `--ink` | `#EFF2F8` | `#F2F0F7` | Foreground text, light buttons |
| `--muted` | `#8996B2` | `#9891A8` | Secondary text |
| `--accent` | `#6E9BF7` | `#9B87F5` | Buttons, process lines, fit icons, focus, selection |
| `--accent-ink` | `#0A1428` | `#150F24` | Text and glyphs sitting on the accent |
| `--accent-soft` | `rgba(110,155,247,.16)` | `rgba(155,135,245,.16)` | Fit icon backgrounds |
| `--slot-1` | `#111B33` | `#1D1530` | Ground under a media block before it paints |

Rules and hairlines are alphas of `--ink` in both sets, so they follow automatically.

## Earlier sets, not kept in the file

| Name | Paper | Accent | Note |
| --- | --- | --- | --- |
| Rich Black / Pale Azure | `#000F0F` | `#68C7EC` | From the swatch card |
| Tui wing blue | `#0F0F12` | `#1CA9CE` | Sampled off the tui photo |
| Tui teal | `#0F0F12` | `#1FD0AE` | First tui accent |
| Deep blue | `#0B1A3A` | n/a | White footer version |

Say the word and any of these can come back the same way.
