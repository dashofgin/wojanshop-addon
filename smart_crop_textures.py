#!/usr/bin/env python3
"""
Smart crop Wojanek textures - remove shadows, trim to content, center on square canvas
"""
from PIL import Image
import os

# Wojanek textures to process
textures = [
    "wojanekmalina.png",
    "wojanekpomarancza.png",
    "wojanekgumabalonowa.png",
    "wojanekmultiwitamina.png"
]

textures_dir = "resource_pack/textures/items"
backup_dir = "resource_pack/textures/items/backup_tall"

print("🎨 Smart cropping Wojanek textures...\n")

for texture_name in textures:
    texture_path = os.path.join(textures_dir, texture_name)
    backup_path = os.path.join(backup_dir, texture_name)

    # Restore original from backup
    if os.path.exists(backup_path):
        img = Image.open(backup_path)
    else:
        img = Image.open(texture_path)

    print(f"📏 {texture_name}")
    print(f"   Original: {img.width}x{img.height}")

    # Convert to RGBA if needed
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    # Get bounding box of non-transparent content
    bbox = img.getbbox()

    if bbox:
        # Crop to content (removes all transparent borders including shadows)
        cropped = img.crop(bbox)
        print(f"   Cropped to content: {cropped.width}x{cropped.height}")

        # Determine target size (1024x1024 square)
        target_size = 1024

        # Calculate scaling to fit within square while maintaining aspect ratio
        scale = min(target_size / cropped.width, target_size / cropped.height)
        new_width = int(cropped.width * scale)
        new_height = int(cropped.height * scale)

        # Resize maintaining aspect ratio
        resized = cropped.resize((new_width, new_height), Image.Resampling.LANCZOS)
        print(f"   Resized to: {new_width}x{new_height}")

        # Create square transparent canvas
        square = Image.new('RGBA', (target_size, target_size), (0, 0, 0, 0))

        # Center the resized image
        x_offset = (target_size - new_width) // 2
        y_offset = (target_size - new_height) // 2
        square.paste(resized, (x_offset, y_offset), resized)

        # Save optimized image
        square.save(texture_path, "PNG", optimize=True)
        file_size = os.path.getsize(texture_path)

        print(f"   Final: {target_size}x{target_size} ({file_size/1024:.1f} KB)")
        print(f"   ✓ Centered on transparent canvas\n")
    else:
        print(f"   ⚠️ No content found, skipping\n")

print(f"✅ Smart crop complete!")
print(f"📁 Originals preserved in: {backup_dir}/")
