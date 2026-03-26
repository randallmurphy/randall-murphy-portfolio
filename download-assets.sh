#!/bin/bash
# ============================================================
# Randall Murphy Portfolio — Missing Asset Downloader
# Run from your project root: bash download-assets.sh
# ============================================================

set -e

ICONS_DIR="src/assets/icons"
TECH_DIR="src/assets/tech"
PROJECTS_DIR="src/assets/projects"

mkdir -p "$ICONS_DIR" "$TECH_DIR" "$PROJECTS_DIR"

echo "📦 Downloading tech icons..."

# TypeScript
curl -sL "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" \
  -o "$TECH_DIR/typescript.png" && echo "  ✅ typescript"

# Next.js
curl -sL "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" \
  -o "$TECH_DIR/nextjs.png" && echo "  ✅ nextjs"

# PostgreSQL
curl -sL "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" \
  -o "$TECH_DIR/postgresql.png" && echo "  ✅ postgresql"

# Supabase
curl -sL "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" \
  -o "$TECH_DIR/supabase.png" && echo "  ✅ supabase"

# Firebase
curl -sL "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" \
  -o "$TECH_DIR/firebase.png" && echo "  ✅ firebase"

# Docker
curl -sL "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" \
  -o "$TECH_DIR/docker.png" && echo "  ✅ docker"

# Python
curl -sL "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" \
  -o "$TECH_DIR/python.png" && echo "  ✅ python"

# n8n — no devicon, use simpleicons
curl -sL "https://cdn.simpleicons.org/n8n/EA4B71" \
  -o "$TECH_DIR/n8n.png" && echo "  ✅ n8n"

echo ""
echo "🏢 Downloading company icons..."

# Banyan Labs — download their logo from their public site
curl -sL "https://banyanlabs.io/_next/static/media/logo.0f741192.png" \
  -o "$ICONS_DIR/banyanlabs.png" && echo "  ✅ banyanlabs"

echo ""
echo "🖼️  Project placeholder images..."
echo "  ⚠️  JONA and COMPASS project images need to be screenshots."
echo "  Take a screenshot of:"
echo "    → https://jona.careers  (save as src/assets/projects/jona.jpg)"
echo "    → https://banyan-onboarding-staging--banyan-labs-training.us-east4.hosted.app/welcome"
echo "      (save as src/assets/projects/compass.jpg)"
echo ""
echo "  Or use these placeholder images for now:"

# Temporary color-block placeholders using a public placeholder API
curl -sL "https://placehold.co/600x400/1A1A2E/4FC3F7.png?text=JONA" \
  -o "$PROJECTS_DIR/jona.jpg" && echo "  ✅ jona (placeholder)"

curl -sL "https://placehold.co/600x400/0D2137/64B5F6.png?text=COMPASS" \
  -o "$PROJECTS_DIR/compass.jpg" && echo "  ✅ compass (placeholder)"

echo ""
echo "============================================================"
echo "✅ Done! All assets downloaded."
echo ""
echo "⚠️  NOTE: The .svg files saved as .png will work for most"
echo "   Next.js setups. If you see issues, add this to"
echo "   next.config.js / next.config.ts:"
echo ""
echo "   images: { dangerouslyAllowSVG: true }"
echo ""
echo "   OR convert them to real PNGs using:"
echo "   npx svgexport src/assets/tech/typescript.png src/assets/tech/typescript.png 128:128"
echo "============================================================"