# 🛍️ Wojan Shop Addon

**Nieoficjalny fan-made addon pack ze sklepem Wojan Shop dla Minecraft Bedrock Edition 1.21**

![Minecraft Version](https://img.shields.io/badge/Minecraft-1.21.0+-brightgreen)
![Version](https://img.shields.io/badge/version-1.4.0-blue)
![Status](https://img.shields.io/badge/status-active-success)

## 📋 Opis

Nieoficjalny addon stworzony na własny użytek, dodający **50 unikalnych itemów** inspirowanych sklepem Wojan Shop do Minecraft Bedrock Edition. Zawiera jedzenie, napoje, ubrania, akcesoria i **custom music discs**!

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

- **3 Custom Music Discs** 🎵:
  - **Wojan - Baza** (2m 46s)
  - **Luczek - Kurier** (1m 52s)
  - **Palion - Mam Bana** (3m 21s)
  - Działają z vanilla jukeboxami
  - Zasięg 65 bloków (jak vanilla)
  - Streaming audio OGG Vorbis
  - Custom chat messages podczas odtwarzania

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
/give @s wojanshop:wojanekmalina
/give @s wojanshop:bluza1
/give @s wojanshop:breloczek1
/give @s wojanshop:musicdiscbaza
```

### Lista wszystkich items

<details>
<summary>Kliknij aby rozwinąć pełną listę (50 items)</summary>

**Jedzenie i napoje:**
- `wojanshop:hamburgermc` - Hamburger MC
- `wojanshop:lody1` - Lody Truskawkowe
- `wojanshop:lody2` - Lody Czekoladowe
- `wojanshop:cocacola` - Coca Cola
- `wojanshop:termos` - Termos
- `wojanshop:wojanekmalina` - Wojanek Malinowy ⚡
- `wojanshop:wojanekpomarancza` - Wojanek Pomarańczowy ⚡
- `wojanshop:wojanekgumabalonowa` - Wojanek Guma Balonowa ⚡
- `wojanshop:wojanekmultiwitamina` - Wojanek Multiwitamina ⚡

**Ubrania:**
- `wojanshop:bluza1` - Bluza Czarna
- `wojanshop:bluza2` - Bluza Niebieska
- `wojanshop:koszulka1` - Koszulka Czarna
- `wojanshop:koszulka2` - Koszulka Biała
- `wojanshop:czapka` - Czapka
- `wojanshop:czapkapalion` - Czapka Zimowa Palion
- `wojanshop:skarpetki` - Skarpetki

**Akcesoria:**
- `wojanshop:plecak1` - Plecak
- `wojanshop:piornik1` - Piórnik
- `wojanshop:zeszyt1` - Zeszyt
- `wojanshop:dlugopis` - Długopis
- `wojanshop:kubek1` - Kubek Czarny
- `wojanshop:kubek2` - Kubek Biały
- `wojanshop:wojanteam` - Logo Wojan Team
- `wojanshop:logopalion` - Logo Palion
- `wojanshop:breloczek1-9` - 9 różnych breloczków

**Maskotki:**
- `wojanshop:maskotkawojan` - Maskotka Wojan
- `wojanshop:maskotkakati` - Maskotka Kati
- `wojanshop:maskotkanoobek` - Maskotka Noobek
- `wojanshop:maskotkaptys` - Maskotka Ptyś

**Music Discs:** 🎵
- `wojanshop:musicdiscbaza` - Music Disc "Wojan - Baza"
- `wojanshop:musicdisckurier` - Music Disc "Luczek - Kurier"
- `wojanshop:musicdiscmamban` - Music Disc "Palion - Mam Bana"

</details>

## 🔧 Wymagania

- **Minecraft Bedrock Edition 1.21.0** lub nowszy
- Platformy: Windows, Android, iOS, Xbox, PlayStation, Nintendo Switch
- **Wymaga włączenia packs** w ustawieniach świata

## 📝 Changelog

Zobacz [CHANGELOG.md](CHANGELOG.md) dla pełnej historii wersji.

### Wersja 1.4.0 (11.01.2026)
- 🎵 **NOWOŚĆ**: Dodano 3 custom music discs (Wojan - Baza, Luczek - Kurier, Palion - Mam Bana)
- ✨ Dodano 10 nowych itemów (4 Wojanki, 4 maskotki, 2 logo)
- ⚡ Wielokrotne efekty potion dla Wojanków (Speed, Strength, Jump, Haste, Night Vision, Slow Falling, Health Boost, Regeneration, Resistance)
- 🔧 Naprawiono format audio dla "Palion - Mam Bana" (konwersja Theora video → Vorbis audio)
- 📦 Optymalizacja tekstur 256x256 (oszczędność 10.26 MB / 86% redukcja)
- 🎮 Duration tracking system dla music discs - zapobiega nakładaniu się piosenek

### Poprzednie wersje
- **v1.1.1** (08.01.2026) - Naprawiono rozmiar itemów, attachables system, food effects
- **v1.1.0** (06.01.2026) - Fix gigantycznych 3D modeli, uproszczono strukturę
- Zobacz [CHANGELOG.md](CHANGELOG.md) dla pełnej historii

## 🐛 Known Issues

- ⚠️ Brak tłumaczeń wielojęzycznych - nazwy hardcoded w JSON
- ⚠️ Food effects wymagają włączenia Beta APIs na serwerze/świecie
- ℹ️ Tekstury wysokiej rozdzielczości - używają attachables system

### ⚠️ Music Discs - Ograniczenia Bedrock Edition

**WAŻNE**: Custom music discs w Bedrock Edition mają znane ograniczenia:

- ❌ **Muzyka NIE zatrzymuje się** po wyciągnięciu płyty lub zniszczeniu jukeboxu
  - Gra do końca utworu (1m 52s - 3m 21s)
  - To jest **ograniczenie Bedrock Edition**, nie bug w addonie
  - `/stopsound` nie działa dla custom sounds z resource packów ([MCPE bug #2710](https://bugs.mojang.com/browse/MCPE-2710))

- ✅ **Workaround zaimplementowany**:
  - Duration tracking system - blokuje nakładanie się piosenek w tym samym jukeboxie
  - Gracze dostają powiadomienie: "Muzyka już gra! Poczekaj Xs..."
  - Po wyciągnięciu płyty: "Płyta wyjęta. Muzyka skończy się za Xs."
  - Różne jukeboy mogą grać różne utwory jednocześnie

- 💡 **Alternatywa**: Podmiana vanilla music discs (pigstep, cat, etc.)
  - `/stopsound` działa dla vanilla płyt
  - Ale tracisz oryginalne płyty Minecrafta
  - Max 16 utworów (limit vanilla discs)

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
