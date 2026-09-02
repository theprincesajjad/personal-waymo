# Personal Waymo — waitlist site

Static marketing / waitlist page for **Personal Waymo** (independent product name — not affiliated with Waymo, Uber, or Lyft).

Cream manifesto design from ICP lock: `#FBF7EB` background, ember `#F05100` primary CTA only.

## Local

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080 --directory .
```

## Waitlist form

Client-side only: `preventDefault`, validate email + 18+, show success, optional `localStorage`. **Nothing is posted to a backend.**

To collect submissions later, wire [Formspree](https://formspree.io/) (or similar) to the form `action` / `fetch` — do not invent a fake endpoint.

## GitHub Pages

Repo: public static files at repo root on `main`.

Enable Pages (legacy / branch source):

```bash
gh api repos/OWNER/REPO/pages -X POST \
  -f build_type=legacy \
  -f source[branch]=main \
  -f source[path]=/
```

Or: **Settings → Pages → Deploy from a branch → `main` / `/` (root).**

Site URL pattern: `https://theprincesajjad.github.io/<repo>/`

## Forbidden on this site

- No hiring / “Drive with us” CTAs  
- No live-city / “we’re operating” claims  
- No Waymo / Uber / Lyft partnership claims  
- No App Store badge, live map, fake metrics, testimonials, partner logos, robotaxi hero  

Copy source of truth: `house-ops/personal-waymo/launch/COPY.md`
