# 🎨 Tekstury Items

Ten folder powinien zawierać **28 plików PNG** w formacie 16x16 pikseli.

## ⚠️ WAŻNE: Tekstury do dodania

Aktualnie ten folder jest **PUSTY**. Musisz dodać następujące pliki PNG:

### Jedzenie i Napoje (6 plików)
- [ ] `hamburgermc.png` - Hamburger MC
- [ ] `lody1.png` - Lody truskawkowe
- [ ] `lody2.png` - Lody czekoladowe
- [ ] `cocacola.png` - Butelka Coca Cola
- [ ] `napojwojan.png` - Napój energetyczny Wojan
- [ ] `termos.png` - Termos

### Ubrania (6 plików)
- [ ] `bluza1.png` - Bluza czarna
- [ ] `bluza2.png` - Bluza niebieska
- [ ] `koszulka1.png` - Koszulka czarna
- [ ] `koszulka2.png` - Koszulka biała
- [ ] `czapka.png` - Czapka
- [ ] `skarpetki.png` - Skarpetki

### Akcesoria (16 plików)
- [ ] `plecak1.png` - Plecak
- [ ] `piornik1.png` - Piórnik
- [ ] `zeszyt1.png` - Zeszyt
- [ ] `dlugopis.png` - Długopis
- [ ] `kubek1.png` - Kubek czarny
- [ ] `kubek2.png` - Kubek biały
- [ ] `wojanteam.png` - Logo Wojan Team
- [ ] `bryloczek1.png` - Breloczek #1
- [ ] `bryloczek2.png` - Breloczek #2
- [ ] `bryloczek3.png` - Breloczek #3
- [ ] `bryloczek4.png` - Breloczek #4
- [ ] `bryloczek5.png` - Breloczek #5
- [ ] `bryloczek6.png` - Breloczek #6
- [ ] `bryloczek7.png` - Breloczek #7
- [ ] `bryloczek8.png` - Breloczek #8
- [ ] `bryloczek9.png` - Breloczek #9

## 📏 Wymagania techniczne

- **Format**: PNG z alpha channel (przezroczystość)
- **Rozmiar**: 16x16 pikseli (standard Minecraft)
- **Nazwy plików**: dokładnie jak powyżej (lowercase, bez spacji)
- **Lokalizacja**: `resource_pack/textures/items/`

## 🎨 Jak stworzyć tekstury

### Opcja 1: Pixel Art (ręcznie)

Użyj edytora pixel art:
- [Piskel](https://www.piskelapp.com/) (online, darmowy)
- [Aseprite](https://www.aseprite.org/) (płatny, profesjonalny)
- [GIMP](https://www.gimp.org/) (darmowy)

### Opcja 2: AI Generator

- [Stable Diffusion](https://stablediffusionweb.com/) z promptem: "16x16 pixel art minecraft item hamburger"
- [DALL-E](https://openai.com/dall-e-2) - podobny prompt
- Następnie resize do 16x16

### Opcja 3: Bazowe tekstury Minecraft

Możesz zmodyfikować istniejące tekstury z Minecraft:
- Hamburger bazowany na `cooked_beef.png`
- Napoje bazowane na `potion.png`
- Ubrania bazowane na `leather_chestplate.png`

## 🔍 Co się stanie bez tekstur?

Jeśli tekstury nie zostaną dodane:
- Items będą wyświetlać się jako **fioletowo-czarny checkerboard** (brakująca tekstura)
- Wszystkie inne funkcje (jedzenie, nazwy) będą działać poprawnie
- Content log pokaże błąd: `[error] Unknown texture: wojanshop:itemname`

## ✅ Weryfikacja

Po dodaniu tekstur sprawdź czy:
1. Wszystkie 28 plików PNG są w tym folderze
2. Nazwy plików są DOKŁADNIE takie jak w `item_texture.json`
3. Rozmiar to 16x16 pikseli
4. Format to PNG (nie JPG, nie GIF)

---

**Pytania? Zobacz [TECHNICAL_GUIDE.md](../../../TECHNICAL_GUIDE.md) sekcja "Tekstury"**
