# 🛍️ Wojan Shop Addon

**Nieoficjalny fan-made addon pack ze sklepem Wojan Shop dla Minecraft Bedrock Edition 1.21**

![Minecraft Version](https://img.shields.io/badge/Minecraft-1.21.0+-brightgreen)
![Version](https://img.shields.io/badge/version-1.3.0-blue)
![Status](https://img.shields.io/badge/status-active-success)

## 📋 Opis

Nieoficjalny addon stworzony na własny użytek, dodający **37 unikalnych itemów** inspirowanych sklepem Wojan Shop do Minecraft Bedrock Edition. Zawiera jedzenie, napoje, ubrania i akcesoria!

### ✨ Funkcjonalności

- **10 Food/Drink Items z efektami**:
  - Hamburger, lody (2x), Coca Cola, termos
  - **Wojanki** (4 smaki): Malinowy, Pomarańczowy, Guma Balonowa, Multiwitamina
  - Możliwość jedzenia/picia z animacją
  - Nutrition i saturation
  - **Wielokrotne efekty potion** (Speed, Regeneration, Strength, Jump Boost, Resistance, Haste, Night Vision, Slow Falling, Health Boost)
  - Wymaga Beta APIs

- **6 Ubrań**: Bluzy (2x), koszulki (2x), czapka zwykła, czapka Palion
  - Items kolekcjonerskie
  - Wysokiej jakości tekstury

- **21 Akcesoriów i maskotek**:
  - Plecak, piórnik, zeszyt, długopis, kubki (2x), breloczki (9x)
  - Logo Wojan Team, Logo Palion
  - **Maskotki**: Wojan, Kati, Noobek, Ptyś
  - Dekoracyjne items idealne do kolekcjonowania i ekspozycji

## 📦 Instalacja

### Metoda 1: Automatyczna (mcaddon)

1. Pobierz `wojanshop_v1.1.1.mcaddon`
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
/give @s wojanshop:breloczek1
```

### Lista wszystkich items

<details>
<summary>Kliknij aby rozwinąć pełną listę (28 items)</summary>

**Jedzenie i napoje:**
- `wojanshop:hamburgermc` - Hamburger MC
- `wojanshop:lody1` - Lody Truskawkowe
- `wojanshop:lody2` - Lody Czekoladowe
- `wojanshop:cocacola` - Coca Cola
- `wojanshop:napojwojan` - Wojan Malinowy
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
- `wojanshop:breloczek1-9` - 9 różnych breloczków

</details>

## 🔧 Wymagania

- **Minecraft Bedrock Edition 1.21.0** lub nowszy
- Platformy: Windows, Android, iOS, Xbox, PlayStation, Nintendo Switch
- **Wymaga włączenia packs** w ustawieniach świata

## 📝 Changelog

Zobacz [CHANGELOG.md](CHANGELOG.md) dla pełnej historii wersji.

### Wersja 1.1.1 (08.01.2026)
- ✅ Naprawiono rozmiar itemów w grze - dodano attachables system
- ✅ Items prawidłowo skalowane w ręce gracza (first/third person)
- ✅ Zachowana wysoka rozdzielczość tekstur fotorealistycznych
- ✅ Poprawiono ortografię: bryloczek → breloczek
- ✅ Zmieniono nazwę: "Napój Energetyczny Wojan" → "Wojan Malinowy"
- ✅ Dodano pack_icon.png dla obu packów
- ✅ Zaimplementowano custom food effects z JavaScript (Speed, Regen, Strength, Jump, Resistance)

## 🐛 Known Issues

- ⚠️ Brak tłumaczeń wielojęzycznych - nazwy hardcoded w JSON
- ⚠️ Food effects wymagają włączenia Beta APIs na serwerze/świecie
- ℹ️ Tekstury wysokiej rozdzielczości - używają attachables system

## 🚀 Roadmap

- [ ] Language files (pl_PL, en_US)
- [ ] Crafting recipes
- [ ] Loot tables
- [ ] Trading z villagerami
- [ ] 3D models dla wybranych items (plecak, czapka)

## 🤝 O projekcie

- **Autor**: dashofgin
- **Projekt na własny użytek**: Nieoficjalny fan-made addon
- **GitHub**: [wojanshop-addon](https://github.com/dashofgin/wojanshop-addon)
- **Issues**: Zgłoś błąd przez GitHub Issues

## 📄 Licencja

© 2026 dashofgin. Wszystkie prawa zastrzeżone.

**Uwaga**: Ten addon nie jest oficjalnie powiązany ze sklepem Wojan Shop. Stworzony na własny użytek bez komercyjnych celów. Wszystkie znaki towarowe i loga należą do ich prawnych właścicieli.

---

**Podoba Ci się addon? Zostaw ⭐ na GitHub!**
