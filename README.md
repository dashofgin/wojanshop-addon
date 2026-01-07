# 🛍️ Wojan Shop Addon

**Oficjalny addon pack ze sklepem Wojan Shop dla Minecraft Bedrock Edition 1.21**

![Minecraft Version](https://img.shields.io/badge/Minecraft-1.21.0+-brightgreen)
![Version](https://img.shields.io/badge/version-1.1.0-blue)
![Status](https://img.shields.io/badge/status-active-success)

## 📋 Opis

Addon dodający **28 unikalnych itemów** ze sklepu Wojan Shop do Minecraft Bedrock Edition. Zawiera jedzenie, napoje, ubrania i akcesoria z prawdziwego sklepu!

### ✨ Funkcjonalności

- **6 Food Items**: Hamburger, lody (2x), Coca Cola, napój Wojan, termos
  - Możliwość jedzenia/picia
  - Nutrition i saturation
  - Animacje eat/drink

- **6 Ubrań**: Bluzy (2x), koszulki (2x), czapka, skarpetki
  - Items kolekcjonerskie
  - 2D sprites

- **16 Akcesoriów**: Plecak, piórnik, zeszyt, długopis, kubki (2x), breloczki (9x), logo Wojan Team
  - Dekoracyjne items
  - Idealne do kolekcjonowania

## 📦 Instalacja

### Metoda 1: Automatyczna (mcaddon)

1. Pobierz `wojanshop_v1.1.0.mcaddon`
2. Dwukliknij plik
3. Minecraft automatycznie zaimportuje addon

### Metoda 2: Manualna

1. Skopiuj folder `behavior_pack` do:
   - **Windows**: `%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\behavior_packs\`
   - **Android**: `/storage/emulated/0/games/com.mojang/behavior_packs/`
   - **iOS**: `On My iPhone/Minecraft/games/com.mojang/behavior_packs/`

2. Skopiuj folder `resource_pack` do:
   - **Windows**: `%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\resource_packs\`
   - **Android**: `/storage/emulated/0/games/com.mojang/resource_packs/`
   - **iOS**: `On My iPhone/Minecraft/games/com.mojang/resource_packs/`

3. Otwórz Minecraft i aktywuj packi w ustawieniach świata

## 🎮 Użycie

### Pobieranie items w grze

```mcfunction
/give @s wojanshop:hamburgermc
/give @s wojanshop:cocacola
/give @s wojanshop:napojwojan
/give @s wojanshop:bluza1
/give @s wojanshop:bryloczek1
```

### Lista wszystkich items

<details>
<summary>Kliknij aby rozwinąć pełną listę (28 items)</summary>

**Jedzenie i napoje:**
- `wojanshop:hamburgermc` - Hamburger MC
- `wojanshop:lody1` - Lody Truskawkowe
- `wojanshop:lody2` - Lody Czekoladowe
- `wojanshop:cocacola` - Coca Cola
- `wojanshop:napojwojan` - Napój Energetyczny Wojan
- `wojanshop:termos` - Termos

**Ubrania:**
- `wojanshop:bluza1` - Bluza Czarna
- `wojanshop:bluza2` - Bluza Niebieska
- `wojanshop:koszulka1` - Koszulka Czarna
- `wojanshop:koszulka2` - Koszulka Biała
- `wojanshop:czapka` - Czapka
- `wojanshop:skarpetki` - Skarpetki

**Akcesoria:**
- `wojanshop:plecak1` - Plecak
- `wojanshop:piornik1` - Piórnik
- `wojanshop:zeszyt1` - Zeszyt
- `wojanshop:dlugopis` - Długopis
- `wojanshop:kubek1` - Kubek Czarny
- `wojanshop:kubek2` - Kubek Biały
- `wojanshop:wojanteam` - Logo Wojan Team
- `wojanshop:bryloczek1-9` - 9 różnych breloczków

</details>

## 🔧 Wymagania

- **Minecraft Bedrock Edition 1.21.0** lub nowszy
- Platformy: Windows, Android, iOS, Xbox, PlayStation, Nintendo Switch
- **Wymaga włączenia packs** w ustawieniach świata

## 📝 Changelog

Zobacz [CHANGELOG.md](CHANGELOG.md) dla pełnej historii wersji.

### Wersja 1.1.0 (06.01.2026)
- ✅ Naprawiono problem z gigantycznymi 3D modelami
- ✅ Items teraz jako proste 2D sprites
- ✅ Wszystkie 28 items działają poprawnie
- ✅ Zaktualizowano UUID

## 🐛 Known Issues

- ⚠️ Food items nie dają żadnych efektów (speed, regeneration) - wymaga custom components (w przyszłej wersji)
- ⚠️ Brak tłumaczeń wielojęzycznych - nazwy hardcoded
- ⚠️ Brak pack_icon.png

## 🚀 Roadmap

- [ ] Dodanie custom components dla efektów (JavaScript)
- [ ] Language files (pl_PL, en_US)
- [ ] Pack icon
- [ ] Crafting recipes
- [ ] Loot tables
- [ ] Trading z villagerami

## 🤝 Kontakt

- **Projekt dla**: Wojan Shop (serwer Craft)
- **GitHub**: [wojanshop-addon](https://github.com/TWOJA_NAZWA/wojanshop-addon)
- **Issues**: Zgłoś błąd przez GitHub Issues

## 📄 Licencja

© 2026 Wojan Shop. Wszystkie prawa zastrzeżone.

---

**Podoba Ci się addon? Zostaw ⭐ na GitHub!**
