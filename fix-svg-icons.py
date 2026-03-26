#!/usr/bin/env python3
"""
fix-svg-icons.py
Run from your project root: python fix-svg-icons.py

Finds every .png file in src/assets/tech/ and src/assets/icons/
that is actually an SVG, and re-saves it as a real 256x256 PNG.
Three.js Ball canvas requires real raster images — SVGs won't work.
"""

import os
import sys

try:
    import cairosvg
except ImportError:
    print("Installing cairosvg...")
    os.system(f"{sys.executable} -m pip install cairosvg")
    import cairosvg

DIRS = [
    "src/assets/tech",
    "src/assets/icons",
    "src/assets/projects",
]

SIZE = 256
converted = 0
skipped = 0

for folder in DIRS:
    if not os.path.exists(folder):
        print(f"  ⚠️  Folder not found, skipping: {folder}")
        continue

    for filename in os.listdir(folder):
        if not filename.endswith(".png"):
            continue

        filepath = os.path.join(folder, filename)

        # Read raw bytes to check if it's actually an SVG
        with open(filepath, "rb") as f:
            header = f.read(512)

        is_svg = (
            b"<svg" in header
            or b"<?xml" in header
            or b"xmlns" in header
        )

        if not is_svg:
            print(f"  ✓  Already a real PNG: {filename}")
            skipped += 1
            continue

        print(f"  🔄 Converting SVG→PNG: {filename} ...", end=" ")
        try:
            with open(filepath, "rb") as f:
                svg_data = f.read()

            png_data = cairosvg.svg2png(
                bytestring=svg_data,
                output_width=SIZE,
                output_height=SIZE,
            )

            with open(filepath, "wb") as f:
                f.write(png_data)

            print("✅")
            converted += 1
        except Exception as e:
            print(f"❌  Error: {e}")

print()
print("=" * 50)
print(f"✅  Converted: {converted} files")
print(f"⏭️   Skipped (already PNG): {skipped} files")
print()
print("Restart your Next.js dev server: npm run dev")
print("=" * 50)