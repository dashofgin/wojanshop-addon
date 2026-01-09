#!/usr/bin/env python3
"""
Optymalizuje attachables - usuwa zbędne enchanted materials i textures
"""
import json
import os
import glob

attachables_dir = "resource_pack/attachables"

for filepath in glob.glob(f"{attachables_dir}/*.json"):
    with open(filepath, 'r') as f:
        data = json.load(f)

    # Usuń enchanted material i texture
    desc = data["minecraft:attachable"]["description"]

    if "materials" in desc and "enchanted" in desc["materials"]:
        del desc["materials"]["enchanted"]

    if "textures" in desc and "enchanted" in desc["textures"]:
        del desc["textures"]["enchanted"]

    # Zapisz z powrotem
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

    print(f"✓ {os.path.basename(filepath)}")

print(f"\n✅ Zoptymalizowano {len(glob.glob(f'{attachables_dir}/*.json'))} plików attachable")
