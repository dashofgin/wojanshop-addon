# 🛍️ Wojan Shop Addon - Project Info

## 📦 Quick Info
- **Nazwa:** Wojan Shop Addon
- **Wersja:** v1.1.0
- **Minecraft:** Bedrock Edition 1.21.0+
- **Items:** 28 custom items
- **Status:** ✅ Działający (bez efektów)

## 🚀 Quick Start

### Otwórz w VS Code:
```bash
code .
```

### Zainstaluj rekomendowane rozszerzenia:
1. Cmd+Shift+X
2. Kliknij "Install Workspace Recommended Extensions"

### Build .mcaddon:
```bash
# Automatycznie:
Cmd+Shift+B (Build task)

# Ręcznie:
zip -r wojanshop_v1.1.0.mcaddon behavior_pack resource_pack
```

### Testuj w grze:
1. Dwukliknij `wojanshop_v1.1.0.mcaddon`
2. Otwórz Minecraft
3. Utwórz świat z packs aktywowanymi
4. `/give @s wojanshop:hamburgermc`

## 📁 Struktura

```
wojanshop_complete/
├── .vscode/              # VS Code config
├── behavior_pack/        # Logika items
│   ├── manifest.json
│   └── items/           # 28 JSON files
├── resource_pack/        # Tekstury
│   ├── manifest.json
│   └── textures/
│       ├── item_texture.json
│       └── items/       # 28 PNG files
├── README.md
├── CHANGELOG.md
├── TECHNICAL_GUIDE.md
└── .gitignore
```

## ✅ Co działa:
- [x] 28 items (jedzenie, napoje, ubrania, akcesoria)
- [x] 2D sprites (płaskie tekstury)
- [x] Food items (nutrition, saturation)
- [x] Drink animation
- [x] Proper stacking

## ⚠️ TODO:
- [ ] Custom components (effects: speed, regeneration, etc.)
- [ ] Language files (en_US, pl_PL)
- [ ] Pack icon
- [ ] Crafting recipes (opcjonalnie)

## 🔗 Links:
- **Docs:** https://learn.microsoft.com/en-us/minecraft/creator/
- **Wiki:** https://wiki.bedrock.dev/
- **GitHub:** [dodaj link]

## 💬 Claude Code Commands:

Przykładowe prompty do Claude:
```
"Dodaj nowy food item: lody waniliowe"
"Napraw błąd w hamburgermc.json"
"Stwórz crafting recipe dla hamburgera"
"Dodaj custom component z efektem speed"
```

---
**Last updated:** 2026-01-06
**Version:** v1.1.0
