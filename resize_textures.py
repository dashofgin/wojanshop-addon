#!/usr/bin/env python3
"""
Resize all item textures to 256x256 for performance optimization.
Creates backups of original files before resizing.
"""

from PIL import Image
import os
import shutil

# Configuration
TEXTURE_DIR = "resource_pack/textures/items"
BACKUP_DIR = "resource_pack/textures/items/backup_original"
TARGET_SIZE = 256
SKIP_SIZES = [16, 112, 168, 196, 252]  # Already small enough

def should_resize(width, height):
    """Check if image needs resizing"""
    # Skip if already at target size or smaller
    if max(width, height) <= TARGET_SIZE:
        return False
    # Skip if it's one of the already-optimized sizes
    if width in SKIP_SIZES or height in SKIP_SIZES:
        return False
    return True

def resize_image(input_path, output_path, target_size):
    """
    Resize image to target size while maintaining aspect ratio.
    Uses high-quality Lanczos resampling.
    """
    with Image.open(input_path) as img:
        # Get original dimensions
        width, height = img.size

        if not should_resize(width, height):
            print(f"  ⏭️  Skipping {os.path.basename(input_path)} ({width}x{height}) - already optimized")
            return False

        # Calculate new size maintaining aspect ratio
        if width > height:
            new_width = target_size
            new_height = int(height * (target_size / width))
        elif height > width:
            new_height = target_size
            new_width = int(width * (target_size / height))
        else:
            new_width = new_height = target_size

        # Resize with high-quality Lanczos filter
        resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

        # Save with optimization
        resized.save(output_path, optimize=True, quality=95)

        print(f"  ✅ Resized {os.path.basename(input_path)}: {width}x{height} → {new_width}x{new_height}")
        return True

def main():
    # Create backup directory
    os.makedirs(BACKUP_DIR, exist_ok=True)

    print(f"🔍 Scanning textures in {TEXTURE_DIR}...")
    print(f"📦 Backup location: {BACKUP_DIR}")
    print(f"🎯 Target size: {TARGET_SIZE}x{TARGET_SIZE}")
    print()

    # Get all PNG files
    png_files = [f for f in os.listdir(TEXTURE_DIR) if f.endswith('.png')]

    resized_count = 0
    skipped_count = 0

    for filename in sorted(png_files):
        input_path = os.path.join(TEXTURE_DIR, filename)
        backup_path = os.path.join(BACKUP_DIR, filename)

        # Skip if it's a directory
        if os.path.isdir(input_path):
            continue

        # Create backup if doesn't exist
        if not os.path.exists(backup_path):
            shutil.copy2(input_path, backup_path)

        # Resize image
        if resize_image(input_path, input_path, TARGET_SIZE):
            resized_count += 1
        else:
            skipped_count += 1

    print()
    print("=" * 60)
    print(f"✨ Optimization complete!")
    print(f"   Resized: {resized_count} textures")
    print(f"   Skipped: {skipped_count} textures (already optimized)")
    print(f"   Backups stored in: {BACKUP_DIR}")
    print("=" * 60)

    # Calculate space savings
    original_size = sum(os.path.getsize(os.path.join(BACKUP_DIR, f))
                       for f in os.listdir(BACKUP_DIR) if f.endswith('.png'))
    new_size = sum(os.path.getsize(os.path.join(TEXTURE_DIR, f))
                  for f in os.listdir(TEXTURE_DIR) if f.endswith('.png'))

    if resized_count > 0:
        savings_mb = (original_size - new_size) / (1024 * 1024)
        print(f"\n💾 Space saved: {savings_mb:.2f} MB")
        print(f"   Original: {original_size / (1024 * 1024):.2f} MB")
        print(f"   New: {new_size / (1024 * 1024):.2f} MB")

if __name__ == "__main__":
    main()
