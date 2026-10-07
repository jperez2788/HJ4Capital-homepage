# HJ4 Capital: static site

Plain HTML, CSS and JavaScript. No build step: open `index.html` in a browser, or upload this whole folder to any web host.

## Files

| File | What it is |
| --- | --- |
| `index.html`, `about.html`, `approach.html`, `markets.html`, `faq.html`, `contact.html` | One file per page. The header and footer are copied into each page, so edit them in all six. |
| `css/styles.css` | All styles. Custom site styles (colors, fonts, `.reveal`, `.ticker-track`, `.grain`) are near the end. |
| `js/main.js` | Mobile menu, header scroll effect, FAQ accordion, markets explorer, scroll-in animations, deal form. Market metros are listed at the top of this file. |
| `images/`, `fonts/` | Photos, logo and the Inter / Libre Baskerville font files. |

## Main menu

The desktop menu (`<nav class="nav-tabs">` in each page's header) shows an icon above each label. A gold bar sits under the current page, the one whose link has `aria-current="page"`. Styles are under "Main menu" in `css/styles.css`. To add a page to the menu, copy one `<a class="nav-tab">` link in all six pages, and add the matching link to the phone menu (`<nav aria-label="Mobile">`).

## Animated background

`js/shader-background.js` draws moving lines behind every section that has `data-shader="light"` (cream) or `data-shader="dark"` (near-black with gold lines). The hero has no `data-shader`, so it is left alone.

- To turn it on for another section, add `data-shader="light"` or `data-shader="dark"` to that section. To turn it off, remove the attribute and give the section a normal background class such as `bg-paper`.
- Colors, line strength and speed are in the `PALETTE` and `SPEED` settings at the top of the file.
- If a browser can't run WebGL, these sections fall back to their solid colors. Visitors who turn on "reduce motion" get a still image.

## Heading animation

`js/text-block-animation.js` animates every `h1` and `h2` inside `<main>`: a bar wipes across each line and reveals the text. The bar is gold on dark sections and ink on light sections. The hero heading plays when the page loads; the others play as you scroll to them.

- To animate any other element, add `data-text-reveal` to it. Add `data-block-color="#hex"` to give it a custom bar color.
- To stop a heading from animating, change `SELECTOR` at the top of the file.
- Speed and colors are set at the top of the file. GSAP lives in `js/vendor/`.

## Word-by-word text effect

The three homepage focus cards and six Approach investment priorities have `data-text-generate`. When one scrolls into view, the words of its title and description fade in from a blur, one after another.

- To use it elsewhere, add `data-text-generate` to any block. It animates the `h3` and `p` elements inside it.
- To change the speed, edit `WORD_STAGGER_MS` in `js/main.js` (the time between words). The fade length is in the `.tg-word` rule in `css/styles.css`.
- You can edit the text in the HTML as usual; the script splits it into words in the browser.

## Markets map (Markets page)

The map near the bottom of the Markets page has two layers:

- `images/markets-map.svg` is the base: watercolor-blue water, solid gray for the states we're not in, and light gray for Mexico and the islands.
- Our seven states, plus the pins, arcs and labels, are the `<svg class="markets-map-overlay">` written right in `markets.html`. The states are raised, colored tiles. Hovering (or tapping) one lifts it higher with a deeper shadow. The arcs draw out from Orlando when the map scrolls into view. Each pin and arc has a comment with its city name.

The lift, shadow and panel styles are under "Markets map" in `css/styles.css` (`--lift` and `--step` control how far a state pops). State colors are baked into the map, so ask to have them regenerated if you want different ones.

## Team photos (About page)

The Team section is an expanding photo gallery. Hovering, tapping or tabbing to a person widens their panel and shows their name and role, while the others narrow, dim and turn mostly black-and-white. A panel shows the person's initials until their photo exists. To add a photo, save it in `images/team/` with this exact name:

| Person | File |
| --- | --- |
| Henrry Martinez | `images/team/henrry-martinez.jpg` |
| Jeremy Perez | `images/team/jeremy-perez.jpg` |
| Matthew Teifke | `images/team/matthew-teifke.webp` |
| Stephan Shenk | `images/team/stephan-shenk.jpg` |

Refresh the page and the photo replaces the initials. Stephan's photo is currently missing, so his image tag is commented out in `about.html`. After adding his photo, uncomment that tag. The filename must match exactly: lowercase, with dashes, no spaces. To use a different file type (`.png`, `.webp`…), change the `src` in that person's card in `about.html` to match. For the other existing image tags, no HTML changes are needed. Head-and-shoulders photos work best. To move a photo's crop, change `object-position` on its `<img>` (for example `center 25%`; lower numbers show more of the top). Names and roles are in the Team section of `about.html`, and the styles are under "Team (About page)" in `css/styles.css`.

## Editing styles

Headings use Libre Baskerville; body text, navigation and buttons use Inter. Both are served locally from `fonts/`, with their licenses included. Change `--font-display` and `--font-sans` near the top of `css/styles.css` to change the pairing.

The pages use Tailwind-style class names (`text-paper`, `py-20`, `lg:grid-cols-12`…). Each of those is an ordinary rule in `css/styles.css`, so they keep working as long as you only use classes that already appear somewhere on the site.

If you use a class that isn't on the site yet, nothing will happen, since there is no Tailwind compiler. Instead, give the element your own class and add a rule at the bottom of `styles.css`:

```css
.my-callout { padding: 2rem; background: var(--color-paper-2); }
```

Each page links the stylesheet as `css/styles.css?v=2026-10-07`. After changing `styles.css`, change that date in all seven pages (including `404.html`) so visitors' browsers download the new file instead of using a saved copy.

The site colors are CSS variables: `--color-ink`, `--color-paper`, `--color-paper-2`, `--color-stone`, `--color-steel`, `--color-muted`, `--color-hairline`.

## Deal form

The homepage and Contact forms are wired to FormSubmit for **Henrry.martinez@hj4capital.com**. The location is Fort Lauderdale, Florida; no street address is published.

The HTML forms have a native POST action at `https://formsubmit.co/Henrry.martinez@hj4capital.com`. With JavaScript enabled, `main.js` uses the AJAX endpoint so visitors stay on the page. `SITE.dealFormEndpoint` is the shared fallback for forms without an action. These URLs are public; no API keys or server secrets are needed.

The forms validate name, email, and opportunity details, prevent duplicate sends while waiting, and show confirmation only after the service explicitly accepts the inquiry. Failures preserve the fields for retry. The `_honey` field is a spam honeypot; `_subject` and `_template` set the email subject and format. Inquiries are no longer saved in localStorage.

### Required activation before publishing

FormSubmit requires the recipient to confirm the first activation email. Submit a test from the hosted website, open the activation email in **Henrry.martinez@hj4capital.com**, and confirm the destination. Then submit another test through both forms and check the inbox. Live delivery remains unverified until this is done. Browser checks use intercepted responses and do not send emails.

FormSubmit requires a served website rather than opening an HTML file directly. See [setup and activation](https://formsubmit.co/) and [AJAX submission documentation](https://formsubmit.co/ajax-documentation).
