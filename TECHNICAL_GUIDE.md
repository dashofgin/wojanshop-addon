# 🔧 Technical Guide - Wojan Shop Addon

Kompletny przewodnik techniczny dla deweloperów.

## 📁 Struktura Projektu

```
wojanshop-addon/
├── behavior_pack/           # Logika gry
│   ├── manifest.json        # BP manifest z UUID
│   └── items/               # 28 plików JSON itemów
│       ├── hamburgermc.json
│       ├── cocacola.json
│       └── ... (26 more)
│
├── resource_pack/           # Assety wizualne
│   ├── manifest.json        # RP manifest z UUID
│   └── textures/
│       ├── item_texture.json    # Mapowanie tekstur
│       └── items/               # 28 plików PNG (16x16)
│           ├── hamburgermc.png
│           ├── cocacola.png
│           └── ... (26 more)
│
├── .vscode/                 # Konfiguracja VS Code
│   └── extensions.json      # Rekomendowane rozszerzenia
│
├── .gitignore
├── README.md
├── CHANGELOG.md
└── TECHNICAL_GUIDE.md       # Ten plik
```

## 🎮 Minecraft Bedrock Addon Basics

### Format Version

- **Items**: `format_version: "1.21.0"`
- **Manifests**: `format_version: 2`
- **Min Engine**: `[1, 21, 0]`

### Namespace

Wszystkie custom items używają namespace `wojanshop:`:

```json
{
  "identifier": "wojanshop:hamburgermc"
}
```

### UUID Schema

**Behavior Pack:**
- Header: `f9e8d7c6-b5a4-4321-9876-543210fedcba`
- Module: `e8d7c6b5-a4f3-4210-9865-432109876543`

**Resource Pack:**
- Header: `d7c6b5a4-f321-4109-8754-321098765432`
- Module: `c6b5a4f3-2109-4087-6543-210987654321`

**Dependency:** Resource Pack zależy od Behavior Pack (UUID w dependencies)

## 🍔 Item Types

### Food Items (6 items)

**Przykład: Hamburger**

```json
{
  "format_version": "1.21.0",
  "minecraft:item": {
    "description": {
      "identifier": "wojanshop:hamburgermc",
      "menu_category": {"category": "items"}
    },
    "components": {
      "minecraft:max_stack_size": 64,
      "minecraft:icon": "wojanshop:hamburgermc",
      "minecraft:display_name": {"value": "Hamburger MC"},
      "minecraft:food": {
        "nutrition": 8,
        "saturation_modifier": 0.8,
        "can_always_eat": false
      },
      "minecraft:use_duration": 32,
      "minecraft:use_animation": "eat"
    }
  }
}
```

**Food Components:**
- `minecraft:food` - nutrition (2-8), saturation (0.4-0.8)
- `minecraft:use_duration` - czas jedzenia (32 ticks = 1.6s)
- `minecraft:use_animation` - "eat" lub "drink"

**Drink Items:**
- `max_stack_size: 16` (jak butelki w Minecraft)
- `can_always_eat: true` (można pić nawet gdy pełny hunger bar)
- `use_animation: "drink"`

### Regular Items (22 items)

**Przykład: Bluza**

```json
{
  "format_version": "1.21.0",
  "minecraft:item": {
    "description": {
      "identifier": "wojanshop:bluza1",
      "menu_category": {"category": "items"}
    },
    "components": {
      "minecraft:max_stack_size": 64,
      "minecraft:icon": "wojanshop:bluza1",
      "minecraft:display_name": {"value": "Bluza Wojan Shop Czarna"}
    }
  }
}
```

**Proste komponenty:**
- Tylko display name i icon
- Brak food/use components
- Dekoracyjne/kolekcjonerskie

## 🎨 Tekstury

### Format

- **Rozmiar**: 16x16 pikseli (standard Minecraft)
- **Format**: PNG z alpha channel
- **Lokalizacja**: `resource_pack/textures/items/`

### item_texture.json

Mapowanie shortnames do tekstur:

```json
{
  "resource_pack_name": "wojanshop",
  "texture_name": "atlas.items",
  "texture_data": {
    "wojanshop:hamburgermc": {
      "textures": "textures/items/hamburgermc"
    }
  }
}
```

**WAŻNE:**
- Bez rozszerzenia `.png` w ścieżce
- Shortname musi pasować do `minecraft:icon` w item JSON

## 🚫 Czego NIE robić (Common Mistakes)

### ❌ Attachables dla Food Items

**BŁĄD (v1.0.7-1.0.9):**
```json
{
  "minecraft:attachable": {
    "geometry": {"default": "geometry.hamburger"}
  }
}
```

**Problem:**
- Items wyświetlają się jako gigantyczne 3D modele
- Nieprawidłowa skala

**POPRAWNIE (v1.1.0):**
- Brak attachables
- Items jako 2D sprites
- Używaj tylko `minecraft:icon`

### ❌ Events dla Efektów

**BŁĄD:**
```json
{
  "minecraft:consumable": {
    "on_consume": {
      "event": "give_speed_effect"
    }
  }
}
```

**Problem:**
- `minecraft:consumable` usunięte w 1.21
- Events nie działają dla custom items

**POPRAWNIE:**
- Użyj custom components (JavaScript)
- Beta APIs w świecie

### ❌ Identyczne UUID między wersjami

**BŁĄD:**
- v1.0.7 i v1.0.8 miały te same UUID
- Minecraft używał starej wersji mimo update

**POPRAWNIE:**
- Każda wersja addon MUSI mieć unikalne UUID
- Lub zwiększ version number w manifest

## 🔮 Advanced Features (TODO)

### Custom Components (JavaScript)

**Dla dodania efektów przy jedzeniu:**

```javascript
// behavior_pack/scripts/main.js
import { world, system, ItemStack } from "@minecraft/server";

// Handler dla napoju Wojan
world.afterEvents.itemUse.subscribe((event) => {
  if (event.itemStack.typeId === "wojanshop:napojwojan") {
    const player = event.source;

    // Dodaj efekty
    player.addEffect("speed", 200, { amplifier: 1 });
    player.addEffect("strength", 200, { amplifier: 0 });
    player.addEffect("jump_boost", 200, { amplifier: 0 });
  }
});
```

**Wymagania:**
- `@minecraft/server` module w dependencies
- Beta APIs włączone w świecie
- `scripts/` folder w BP

### Language Files

**texts/pl_PL.lang:**
```
item.wojanshop:hamburgermc.name=Hamburger MC
item.wojanshop:cocacola.name=Coca Cola
```

**texts/en_US.lang:**
```
item.wojanshop:hamburgermc.name=MC Burger
item.wojanshop:cocacola.name=Coca Cola
```

**W item JSON:**
```json
{
  "minecraft:display_name": {
    "translate": "item.wojanshop:hamburgermc.name"
  }
}
```

### Crafting Recipes

**recipes/hamburger.json:**
```json
{
  "format_version": "1.21.0",
  "minecraft:recipe_shaped": {
    "description": {"identifier": "wojanshop:hamburgermc"},
    "pattern": [
      "B",
      "M",
      "B"
    ],
    "key": {
      "B": {"item": "minecraft:bread"},
      "M": {"item": "minecraft:cooked_beef"}
    },
    "result": {"item": "wojanshop:hamburgermc", "count": 1}
  }
}
```

### Loot Tables

**loot_tables/entities/zombie.json:**
```json
{
  "pools": [
    {
      "rolls": 1,
      "entries": [
        {
          "type": "item",
          "name": "wojanshop:bryloczek1",
          "weight": 1,
          "functions": [
            {"function": "set_count", "count": {"min": 1, "max": 3}}
          ]
        }
      ]
    }
  ]
}
```

## 🧪 Testing

### Test Checklist

- [ ] Items wyświetlają się jako 2D sprites (NIE 3D)
- [ ] Tekstury się ładują (brak purple-black checkerboard)
- [ ] Display names są widoczne
- [ ] Food items można zjeść/wypić
- [ ] Animacja eat/drink działa
- [ ] Nutrition/saturation działa poprawnie
- [ ] Items stackują się poprawnie (16 lub 64)
- [ ] Brak crashów w content log

### Komendy testowe

```mcfunction
# Pobierz wszystkie food items
/give @s wojanshop:hamburgermc
/give @s wojanshop:cocacola
/give @s wojanshop:napojwojan
/give @s wojanshop:termos
/give @s wojanshop:lody1
/give @s wojanshop:lody2

# Test stackowania
/give @s wojanshop:cocacola 64

# Clear inventory
/clear @s
```

### Content Log

**Lokalizacja (Windows):**
```
%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\logs\
```

**Typowe błędy:**
- `[Scripting][error]-Unknown item: wojanshop:itemname` - brak itemu w BP
- `[Scripting][error]-Unknown texture: wojanshop:itemname` - brak tekstury w item_texture.json
- `[Scripting][error]-Invalid UUID` - UUID conflict

## 📚 Dokumentacja źródłowa

### Oficjalne źródła

1. **Microsoft Learn - Add Custom Items:**
   https://learn.microsoft.com/en-us/minecraft/creator/documents/addcustomitems
   - Przykład "Goo" item (2D sprite)
   - Best practices

2. **Bedrock Wiki - Custom Items:**
   https://wiki.bedrock.dev/guide/custom-item
   - Components reference
   - item_texture.json format

3. **Microsoft Learn - Custom Components:**
   https://learn.microsoft.com/en-us/minecraft/creator/documents/scripting/components-tutorial
   - JavaScript custom components
   - Beta APIs

4. **Bedrock Schemas (JSON validation):**
   https://github.com/bedrock-oss/bedrock-schemas
   - JSON schemas dla VS Code
   - Autocomplete w edytorze

## 🛠️ Development Tools

### Rekomendowane VS Code Extensions

```json
{
  "recommendations": [
    "blockception.minecraft-bedrock-development",
    "esbenp.prettier-vscode",
    "github.copilot"
  ]
}
```

### Build Script (opcjonalny)

**build.sh:**
```bash
#!/bin/bash
# Pakowanie do .mcaddon

VERSION="1.1.0"
OUTPUT="wojanshop_v${VERSION}.mcaddon"

# Usuń stary build
rm -f "$OUTPUT"

# Spakuj BP i RP do ZIP
zip -r "$OUTPUT" behavior_pack/ resource_pack/

echo "✅ Build complete: $OUTPUT"
```

## 🔄 Version Control

### Git Best Practices

**Commituj:**
- ✅ Pliki JSON (manifests, items)
- ✅ Dokumentację (MD files)
- ✅ Konfigurację (.gitignore, .vscode)

**NIE commituj:**
- ❌ Plików .mcaddon, .mcpack (build artifacts)
- ❌ Plików .DS_Store, Thumbs.db
- ❌ Logów, temp files

### Semantic Versioning

Format: `MAJOR.MINOR.PATCH` (np. 1.1.0)

- **MAJOR**: Breaking changes (zmiana UUID, usunięcie items)
- **MINOR**: Nowe features (nowe items, efekty)
- **PATCH**: Bug fixes, dokumentacja

## 🚀 Deployment

### Tworzenie .mcaddon

1. Zapakuj `behavior_pack/` i `resource_pack/` do ZIP
2. Zmień rozszerzenie z `.zip` na `.mcaddon`
3. Test: dwuklik → Minecraft import

### GitHub Release

```bash
git tag v1.1.0
git push origin v1.1.0

# Załącz .mcaddon do release
gh release create v1.1.0 wojanshop_v1.1.0.mcaddon
```

---

**Pytania? Otwórz Issue na GitHub!**
