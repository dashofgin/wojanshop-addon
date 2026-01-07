# 🚀 GETTING STARTED - Wojan Shop w VS Code

## 📦 CO MASZ W ZIP:

```
wojanshop_complete.zip
└── wojanshop_complete/
    ├── .vscode/              ← Konfiguracja VS Code
    ├── behavior_pack/        ← 28 items JSON
    ├── resource_pack/        ← 28 tekstur PNG
    ├── README.md             ← Instrukcja dla użytkowników
    ├── CHANGELOG.md          ← Historia wersji
    ├── TECHNICAL_GUIDE.md    ← Dokumentacja techniczna
    ├── PROJECT_INFO.md       ← Szybki overview
    └── .gitignore            ← Git config
```

---

## 🍎 KROK 1: ROZPAKUJ I OTWÓRZ W VS CODE (MAC)

### A) Przez Finder:
1. Dwukliknij `wojanshop_complete.zip` → folder się wypakuje
2. Przeciągnij folder `wojanshop_complete` na ikonę **VS Code** w Docku

### B) Przez Terminal:
```bash
cd ~/Downloads  # lub gdzie masz ZIP
unzip wojanshop_complete.zip
cd wojanshop_complete
code .
```

---

## 🔌 KROK 2: ZAINSTALUJ ROZSZERZENIA

Po otwarciu projektu VS Code zapyta:

> **"This workspace recommends extensions. Would you like to install them?"**

✅ Kliknij **"Install All"**

**LUB ręcznie:**
1. `Cmd+Shift+X` (otwórz Extensions)
2. Szukaj i zainstaluj:
   - ✅ **Blockception's Minecraft Bedrock Development**
   - ✅ **Continue** (Claude AI assistant)
   - ✅ **Prettier** (formatowanie)
   - ✅ **GitLens** (Git visualization)

---

## 🤖 KROK 3: SKONFIGURUJ CLAUDE (Continue)

### Instalacja Continue:
1. `Cmd+Shift+X` → szukaj "**Continue**"
2. Install
3. Restart VS Code

### Konfiguracja:
1. `Cmd+L` → otwiera Continue sidebar
2. Click ⚙️ (settings icon)
3. "Add Model" → wybierz **Anthropic**
4. Model: `claude-sonnet-4-20250514`
5. Paste API Key: `sk-ant-api03-...`

**Gdzie wziąć API key:**
- https://console.anthropic.com/settings/keys
- Create Key → skopiuj

### Test:
```
Cmd+L → napisz: "Pokaż strukturę projektu"
```

---

## 🎮 KROK 4: ZBUDUJ .mcaddon

### Automatycznie (Build Task):
1. `Cmd+Shift+B` (Run Build Task)
2. Wybierz "Build .mcaddon"
3. Plik `wojanshop_v1.1.0.mcaddon` pojawi się w folderze głównym

### Ręcznie (Terminal):
1. `Cmd+J` (otwórz Terminal w VS Code)
2. Wpisz:
   ```bash
   zip -r wojanshop_v1.1.0.mcaddon behavior_pack resource_pack
   ```

---

## 🧪 KROK 5: TESTUJ W MINECRAFT

1. **Znajdź plik:** `wojanshop_v1.1.0.mcaddon` w Finder
2. **Dwukliknij** → automatycznie zaimportuje się do Minecraft
3. **Otwórz Minecraft Bedrock**
4. **Utwórz nowy świat:**
   - Settings → Behavior Packs → Aktywuj "Wojan Shop Behavior Pack"
   - Settings → Resource Packs → Aktywuj "Wojan Shop Resource Pack"
   - Włącz **Cheats**
5. **Wejdź do świata i testuj:**
   ```
   /give @s wojanshop:hamburgermc
   /give @s wojanshop:cocacola
   /give @s wojanshop:napojwojan
   ```

---

## 💬 KROK 6: PRACUJ Z CLAUDE

### Przykładowe komendy dla Continue (Cmd+L):

```
"Dodaj nowy food item: lody waniliowe z efektem speed"
```

```
"Napraw błąd w hamburgermc.json - nie daje regeneracji"
```

```
"Stwórz crafting recipe dla hamburgera"
```

```
"Dodaj language file z polskimi nazwami"
```

```
"Wyjaśnij dlaczego items nie mają efektów"
```

---

## 📂 STRUKTURA PLIKÓW - CO GDZIE:

### **Behavior Pack** (logika items):
```
behavior_pack/
├── manifest.json          ← UUID, wersja, dependencies
└── items/
    ├── hamburgermc.json   ← Food item z nutrition
    ├── cocacola.json      ← Drink item
    └── ...                ← 28 plików total
```

### **Resource Pack** (tekstury):
```
resource_pack/
├── manifest.json
└── textures/
    ├── item_texture.json  ← Mapowanie: shortname → PNG
    └── items/
        ├── hamburgermc.png
        └── ...            ← 28 PNG files (16x16)
```

---

## 🔧 PRZYDATNE SKRÓTY (MAC):

| Skrót | Akcja |
|-------|-------|
| `Cmd+Shift+P` | Command Palette (wszystkie komendy) |
| `Cmd+P` | Quick Open (znajdź plik) |
| `Cmd+Shift+F` | Search w całym projekcie |
| `Cmd+B` | Toggle Sidebar |
| `Cmd+J` | Toggle Terminal |
| `Cmd+Shift+B` | Run Build Task |
| `Cmd+L` | Continue chat (Claude) |
| `Cmd+Shift+G` | Git Source Control |

---

## 🐛 ROZWIĄZYWANIE PROBLEMÓW

### ❓ VS Code nie otwiera projektu?
```bash
# Sprawdź czy VS Code jest w PATH:
code --version

# Jeśli nie działa, zainstaluj:
# VS Code → Cmd+Shift+P → "Shell Command: Install 'code' command in PATH"
```

### ❓ Continue nie widzi Claude?
- Sprawdź API key w Continue settings (Cmd+L → ⚙️)
- Sprawdź czy masz credits: https://console.anthropic.com/settings/billing

### ❓ Build .mcaddon nie działa?
```bash
# Sprawdź czy masz zip:
zip --version

# Jeśli nie, zainstaluj (powinno być domyślnie na Mac):
brew install zip
```

### ❓ Items nie działają w grze?
- Sprawdź czy oba packs są aktywowane
- Sprawdź czy cheats są włączone
- Sprawdź Content Log w Minecraft (Settings → Storage → Cached Data)

---

## 🎯 NASTĘPNE KROKI (TODO):

1. **Dodaj efekty przez custom components:**
   - Hamburger → regeneration
   - Coca Cola → speed
   - Napój Wojan → speed + strength + jump_boost

2. **Dodaj language files:**
   - `texts/en_US.lang`
   - `texts/pl_PL.lang`

3. **Opcjonalnie:**
   - Crafting recipes
   - Loot tables
   - Pack icon (128x128 PNG)

---

## 📞 POMOC

**Dokumentacja:**
- Microsoft Learn: https://learn.microsoft.com/en-us/minecraft/creator/
- Bedrock Wiki: https://wiki.bedrock.dev/

**W razie problemów:**
- Otwórz `PROJECT_INFO.md` dla quick reference
- Zapytaj Claude w Continue: `Cmd+L`
- Sprawdź `TECHNICAL_GUIDE.md` dla szczegółów

---

**GOTOWE! Możesz zaczynać pracę!** 🚀

Powodzenia z projektem Wojan Shop! 🛍️
