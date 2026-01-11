#!/usr/bin/env python3
"""
Process new textures from 'nowe png' folder
- Copy textures to resource_pack/textures/items/
- Keep original dimensions (no cropping for now)
- Clean up transparency if needed
"""
from PIL import Image
import os
import shutil

# Mapping: source filename -> target filename
texture_mapping = {
    # Wojanek drinks (keep tall/vertical)
    "wojanekmalina_t.png": "wojanekmalina.png",
    "wojanekpomarancza_t.png": "wojanekpomarancza.png",
    "wojanekgumabalonowa_t.png": "wojanekgumabalonowa.png",
    "wojanek_mulitiwitamina_t.png": "wojanekmultiwitamina.png",  # Fix typo: mulitiwitamina -> multiwitamina

    # Decorative items (maskotki)
    "maskotkawojan_t.png": "maskotkawojan.png",
    "wojankati_t.png": "maskotkakati.png",
    "wojannoobek_t.png": "maskotkanoobek.png",
    "wojanptys_t.png": "maskotkaptyś.png",

    # Clothing/accessories
    "czapkazimowapalion_t.png": "czapkapalion.png",
    "palionlogo_t.png": "logopalion.png"
}

source_dir = "nowe png"
target_dir = "resource_pack/textures/items"

print("🎨 Processing new textures...\n")

for source_name, target_name in texture_mapping.items():
    source_path = os.path.join(source_dir, source_name)
    target_path = os.path.join(target_dir, target_name)

    if not os.path.exists(source_path):
        print(f"⚠️  {source_name} not found, skipping")
        continue

    # Open image
    img = Image.open(source_path)

    # Keep original size (no cropping)
    print(f"✓ {source_name} ({img.width}x{img.height}) -> {target_name}")

    # Save to target
    img.save(target_path, "PNG", optimize=True)

print(f"\n✅ Processed {len(texture_mapping)} textures")
print(f"📁 Saved to: {target_dir}/")
