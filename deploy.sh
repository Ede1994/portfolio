#!/usr/bin/env bash
set -euo pipefail

REPO="Ede1994/portfolio"
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

TOKEN=$(printf "protocol=https\nhost=github.com\n\n" | git credential-osxkeychain get | awk -F= '/^password=/{print $2}')

echo "→ Creating GitHub repo (if needed)..."
HTTP_CODE=$(curl -s -o /tmp/portfolio-create.json -w "%{http_code}" \
  -X POST "https://api.github.com/user/repos" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -d '{"name":"portfolio","description":"Dark minimal developer portfolio for GitHub Pages","homepage":"https://ede1994.github.io/portfolio/","public":true}')

if [[ "$HTTP_CODE" == "201" ]]; then
  echo "   Created https://github.com/${REPO}"
elif [[ "$HTTP_CODE" == "422" ]]; then
  echo "   Repo already exists"
else
  echo "   Warning: repo create returned HTTP ${HTTP_CODE}"
  cat /tmp/portfolio-create.json 2>/dev/null || true
fi

echo "→ Pushing to GitHub..."
git push -u origin main

echo "→ Enabling GitHub Pages..."
PAGES_CODE=$(curl -s -o /tmp/portfolio-pages.json -w "%{http_code}" \
  -X POST "https://api.github.com/repos/${REPO}/pages" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -d '{"build_type":"legacy","source":{"branch":"main","path":"/"}}')

if [[ "$PAGES_CODE" == "201" || "$PAGES_CODE" == "409" ]]; then
  echo "   Pages enabled"
else
  echo "   Pages setup returned HTTP ${PAGES_CODE} (enable manually in repo Settings → Pages)"
fi

echo ""
echo "Done! Site will be live at:"
echo "  https://ede1994.github.io/portfolio/"
echo ""
echo "Verify in a minute:"
echo "  curl -sI https://ede1994.github.io/portfolio/ | head -3"
