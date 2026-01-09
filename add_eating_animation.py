#!/usr/bin/env python3
"""
Adds eating animation to food item attachables
"""
import json
import os

food_items = ['cocacola', 'napojwojan', 'termos', 'lody1', 'lody2']
attachables_dir = "resource_pack/attachables"

for item in food_items:
    filepath = f"{attachables_dir}/{item}.json"

    with open(filepath, 'r') as f:
        data = json.load(f)

    desc = data["minecraft:attachable"]["description"]

    # Add eating animation
    desc["animations"]["eating"] = "animation.wojanshop_item.eating"

    # Add pre_animation and conditional animate
    desc["scripts"] = {
        "pre_animation": [
            "variable.is_using_item = query.is_using_item;"
        ],
        "animate": [
            {
                "eating": "variable.is_using_item"
            },
            {
                "hold": "!variable.is_using_item"
            }
        ]
    }

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

    print(f"✓ {item}.json")

print(f"\n✅ Updated {len(food_items)} food attachables with eating animation")
