# Changelog

Wszystkie znaczące zmiany w projekcie Wojan Shop Addon będą dokumentowane w tym pliku.

Format bazuje na [Keep a Changelog](https://keepachangelog.com/pl/1.0.0/),
a projekt stosuje [Semantic Versioning](https://semver.org/lang/pl/).

## [1.1.1] - 2026-01-08

### 🔧 Fixed
- **Naprawiono rozmiar itemów w grze**: Dodano attachables system ze skalowaniem dla wszystkich 28 itemów
  - Items teraz prawidłowo wyświetlają się w ręce gracza (zarówno first-person jak i third-person)
  - Zachowana wysoka rozdzielczość tekstur fotorealistycznych (252x252, 196x196 px)
  - Dodano geometry, animations i render controllers dla prawidłowego skalowania

- **Poprawiono ortografię**:
  - Zmieniono `bryloczek` → `breloczek` we wszystkich plikach (28 plików)
  - Zaktualizowano identyfikatory: `wojanshop:breloczek1-9`
  - Zachowano poprawną nazwę wyświetlaną: "Breloczek Wojan #1-9"

- **Zaktualizowano nazwy wyświetlane**:
  - "Napój Energetyczny Wojan" → "Wojan Malinowy"

### ✨ Added
- Dodano kompletny attachables system dla high-resolution items:
  - `resource_pack/models/entity/wojanshop_item.geo.json` - geometria z texture mesh
  - `resource_pack/animations/wojanshop_item.animation.json` - animacja skalowania i pozycjonowania
  - `resource_pack/render_controllers/wojanshop_item.render_controllers.json` - kontroler renderowania
  - 28 attachable plików dla każdego itemu z enchantment support

### 📝 Technical
- Format zgodny z oficjalną dokumentacją Microsoft Learn dla Bedrock 1.21
- Użyto texture_meshes zamiast ręcznego modelowania
- Animacje wykorzystują Molang expressions dla różnych perspektyw kamery

---

## [1.1.0] - 2026-01-06

### 🔧 Fixed
- **KRYTYCZNE**: Naprawiono problem z items wyświetlającymi się jako gigantyczne 3D modele
  - Usunięto wszystkie niepotrzebne attachables
  - Items teraz jako proste 2D sprites zgodnie z dokumentacją Microsoft Learn
  - Poprawiono skalę i proporcje wszystkich items

- Naprawiono ścieżki tekstur w `item_texture.json`
- Naprawiono stackowanie items (food: 16/64, akcesoria: 64)
- Naprawiono UUID conflicts między wersjami

### ✨ Changed
- Zaktualizowano wszystkie UUID dla behavior i resource packs
- Uproszczono strukturę items (bez attachables, bez geometrii)
- Zaktualizowano dokumentację z nowymi przykładami

### 📝 Documentation
- Dodano TECHNICAL_GUIDE.md z wyjaśnieniem architektury
- Rozszerzono README.md o sekcję Known Issues
- Dodano przykłady użycia custom components (dla przyszłych wersji)

---

## [1.0.9] - 2026-01-05

### ❌ Deprecated
- **WERSJA DEPRECATED** - items jako 3D modele, nie używać!

### 🐛 Known Issues
- Items wyświetlają się jako gigantyczne 3D modele
- Nieprawidłowa skala hamburgerów, napojów
- ROZWIĄZANO w v1.1.0

---

## [1.0.8] - 2026-01-04

### ❌ Deprecated
- **WERSJA DEPRECATED** - problemy z attachables

### 🐛 Known Issues
- Items nadal za duże
- Problemy z geometrią 3D
- ROZWIĄZANO w v1.1.0

---

## [1.0.7] - 2026-01-03

### ❌ Deprecated
- **WERSJA DEPRECATED** - pierwsza próba z attachables

### Added
- Dodano 28 custom items
- Dodano behavior i resource packs
- Dodano tekstury 16x16

### 🐛 Known Issues
- Items jako 3D modele zamiast sprites
- Gigantyczny rozmiar items
- ROZWIĄZANO w v1.1.0

---

## [Unreleased] - Planowane funkcje

### 🚀 To Do (Priorytet wysoki)
- [ ] Custom components dla food effects (JavaScript)
  - Hamburger → regeneration
  - Coca Cola → speed
  - Napój Wojan → speed + strength + jump_boost
  - Termos → regeneration + resistance
  - Lody1 → speed
  - Lody2 → jump_boost

- [ ] Testowanie w grze na serwerze
  - Instalacja na serwerze Craft
  - Test wszystkich 28 items
  - Feedback od graczy

- [ ] Language files
  - `texts/en_US.lang`
  - `texts/pl_PL.lang`

### 🎯 To Do (Priorytet średni)
- [ ] Crafting recipes
- [ ] Loot tables (items z mobów/skrzynek)
- [ ] Trading z villagerami
- [ ] Tags (minecraft:is_food, custom tags)

### 💡 To Do (Priorytet niski)
- [ ] Pack icon (128x128 lub 256x256 PNG)
- [ ] Custom sounds dla items
- [ ] 3D models dla wybranych items (plecak, czapka)
- [ ] Particles przy jedzeniu
- [ ] Wiki/guide dla graczy

---

## Version History

- **v1.1.1** (2026-01-08) - ✅ Obecna wersja (stabilna) - Naprawiono rozmiar itemów + attachables
- **v1.1.0** (2026-01-06) - ✅ Stabilna
- **v1.0.9** (2026-01-05) - ❌ Deprecated
- **v1.0.8** (2026-01-04) - ❌ Deprecated
- **v1.0.7** (2026-01-03) - ❌ Deprecated

---

[1.1.1]: https://github.com/dashofgin/wojanshop-addon/releases/tag/v1.1.1
[1.1.0]: https://github.com/dashofgin/wojanshop-addon/releases/tag/v1.1.0
[1.0.9]: https://github.com/dashofgin/wojanshop-addon/releases/tag/v1.0.9
[1.0.8]: https://github.com/dashofgin/wojanshop-addon/releases/tag/v1.0.8
[1.0.7]: https://github.com/dashofgin/wojanshop-addon/releases/tag/v1.0.7
