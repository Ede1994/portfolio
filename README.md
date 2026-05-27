# Developer Portfolio

A static, dark-themed developer portfolio you can host on GitHub Pages or any static file host. No build step - plain HTML, CSS, and JavaScript.

## Quick start

1. **Fork or clone** this repository.
2. **Customize** your content (see below).
3. **Preview locally**, then **deploy** when ready.

## Customize

All personal content lives in `js/`:

| File | Purpose |
|------|---------|
| `js/config.js` | Name, bio, skills, social links, stats |
| `js/projects.js` | Featured and additional projects |
| `js/tools.js` | Tools and platforms (grouped by category) |

Update `index.html` for page title, meta description, and favicon (`assets/favicon.svg`). Styles are in `css/style.css`.

## Local preview

From the repository root:

```bash
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080). Any static file server works (e.g. `npx serve .`).

## Deploy

### GitHub Pages (recommended)

1. Push the repo to GitHub.
2. Open **Settings → Pages → Build and deployment**.
3. Set **Source** to **Deploy from a branch**.
4. Choose your default branch (e.g. `main`) and folder **/ (root)**.

After a few minutes, the site is live. The URL depends on how you name the repository:

| Repository name | Site URL |
|-----------------|----------|
| `username.github.io` | `https://username.github.io/` (user or org site) |
| Any other name (e.g. `portfolio`) | `https://username.github.io/portfolio/` (project site) |

No `gh-pages` branch or build action is required — the site is served from the repo root.

### Other hosts

Upload the project root (or point the host at this folder). Ensure `index.html` is the default document. Works with Netlify, Cloudflare Pages, S3 + CloudFront, and similar static hosts.

### Optional: `deploy.sh`

`deploy.sh` is an example script that creates a GitHub repo, pushes `main`, and enables Pages via the GitHub API. Edit `REPO` and related values before use; it assumes macOS keychain credentials for GitHub.

## Project layout

```
├── index.html      # Page structure and sections
├── css/style.css   # Theme and layout
├── js/
│   ├── config.js   # Profile and site config
│   ├── projects.js # Project cards
│   ├── tools.js    # Tools / platforms
│   └── main.js     # UI behavior (nav, animations, etc.)
└── assets/         # Favicon and static assets
```

## License

Use and adapt this project for your own portfolio. If you fork it, consider replacing branding and content in the files above before publishing.
