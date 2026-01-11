#!/usr/bin/env python3
"""
Optimize Wojanek textures - crop tall images to square format
This will reduce file size and prevent lag/deformation in-game
"""
import os
import sys

try:
    from PIL import Image
except ImportError:
    print("❌ PIL (Pillow) not installed")
    print("Installing Pillow...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

# Wojanek textures to optimize (tall → square)
wojanek_textures = [
    "wojanekmalina.png",
    "wojanekpomarancza.png",
    "wojanekgumabalonowa.png",
    "wojanekmultiwitamina.png"
]

textures_dir = "resource_pack/textures/items"
backup_dir = "resource_pack/textures/items/backup_tall"

# Create backup directory
os.makedirs(backup_dir, exist_ok=True)

print("🎨 Optimizing Wojanek textures...\n")

for texture_name in wojanek_textures:
    texture_path = os.path.join(textures_dir, texture_name)
    backup_path = os.path.join(backup_dir, texture_name)

    if not os.path.exists(texture_path):
        print(f"⚠️  {texture_name} not found, skipping")
        continue

    # Open image
    img = Image.open(texture_path)
    original_size = os.path.getsize(texture_path)

    print(f"📏 {texture_name}")
    print(f"   Original: {img.width}x{img.height} ({original_size/1024:.1f} KB)")

    # Backup original
    img.save(backup_path, "PNG")

    # Determine target square size (use max dimension, capped at 1024)
    target_size = min(max(img.width, img.height), 1024)

    # Create square canvas with transparency
    square_img = Image.new('RGBA', (target_size, target_size), (0, 0, 0, 0))

    # Resize image to fit within square (maintain aspect ratio)
    img.thumbnail((target_size, target_size), Image.Resampling.LANCZOS)

    # Center image on square canvas
    x_offset = (target_size - img.width) // 2
    y_offset = (target_size - img.height) // 2
    square_img.paste(img, (x_offset, y_offset), img if img.mode == 'RGBA' else None)

    # Save optimized image
    square_img.save(texture_path, "PNG", optimize=True)
    new_size = os.path.getsize(texture_path)

    print(f"   Optimized: {square_img.width}x{square_img.height} ({new_size/1024:.1f} KB)")
    print(f"   ✓ Saved {(original_size - new_size)/1024:.1f} KB ({(1 - new_size/original_size)*100:.1f}% reduction)\n")

print(f"✅ Optimization complete!")
print(f"📁 Original tall textures backed up to: {backup_dir}/")
print(f"\n💡 Test in-game. If you want to restore originals, copy from backup folder.")
