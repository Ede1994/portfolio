# Developer Portfolio

Dark, minimal developer portfolio for [Eric Einspänner](https://github.com/Ede1994) — medical physicist, clinical AI researcher, and software developer.

**Live site:** https://ede1994.github.io/portfolio/

## Features

- Dark-first responsive single-page layout
- Featured projects with tech stack badges
- Publications from Google Scholar with DOI links
- Skills, stats, and contact sections
- Typing animation, particle background, scroll reveal effects
- Sticky navigation with active section highlighting

## Customize

Edit the data files:

- `js/config.js` — name, about, skills, links, stats
- `js/projects.js` — featured and additional GitHub projects
- `js/publications.js` — peer-reviewed publications

## Local preview

```bash
cd portfolio
python3 -m http.server 8080
```

Open http://localhost:8080

## Deploy to GitHub Pages

This repo deploys as a **project site** at `https://ede1994.github.io/portfolio/`.

1. Push to the `Ede1994/portfolio` repository on GitHub
2. Go to **Settings → Pages → Build and deployment**
3. Source: **Deploy from a branch**
4. Branch: **main** / **/ (root)**

The site will be live within a few minutes.

## Related

- Personal site: https://ede1994.github.io/
- GitHub: https://github.com/Ede1994
- Google Scholar: https://scholar.google.de/citations?user=pBNy9LwAAAAJ
