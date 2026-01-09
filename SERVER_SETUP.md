# 🖥️ Instrukcja instalacji na serwerze (Crafty Controller)

## 📁 Pliki do wklejenia w Crafty Controller

### 1. world_behavior_packs.json

**Lokalizacja na serwerze:**
```
worlds/[NAZWA_ŚWIATA]/world_behavior_packs.json
```

**Zawartość do wklejenia:**
```json
[
  {
    "pack_id": "f9e8d7c6-b5a4-4321-9876-543210fedcba",
    "version": [1, 1, 1]
  }
]
```

---

### 2. world_resource_packs.json

**Lokalizacja na serwerze:**
```
worlds/[NAZWA_ŚWIATA]/world_resource_packs.json
```

**Zawartość do wklejenia:**
```json
[
  {
    "pack_id": "d7c6b5a4-f321-4109-8754-321098765432",
    "version": [1, 1, 1]
  }
]
```

---

## 🔧 Krok po kroku - Instalacja przez Crafty Controller

### Krok 1: Upload packów
1. Zaloguj się do Crafty Controller
2. Przejdź do Files → `development_behavior_packs/`
3. Wypakuj tam folder `behavior_pack/` z `behavior_pack.zip`
4. Przejdź do Files → `development_resource_packs/`
5. Wypakuj tam folder `resource_pack/` z `resource_pack.zip`

### Krok 2: Aktywacja w świecie
1. Przejdź do `worlds/[TWOJ_SWIAT]/`
2. Edytuj plik `world_behavior_packs.json`
3. **JEŚLI PLIK JEST PUSTY `[]`:**
   - Wklej zawartość z sekcji 1 powyżej
4. **JEŚLI PLIK MA JUŻ INNE PACKI:**
   - Dodaj nowy obiekt do tablicy:
   ```json
   [
     {
       "pack_id": "f9e8d7c6-b5a4-4321-9876-543210fedcba",
       "version": [1, 1, 1]
     },
     ...inne packi...
   ]
   ```

5. Zrób to samo dla `world_resource_packs.json` (patrz sekcja 2)

### Krok 3: Włącz Beta APIs (WAŻNE!)
1. Przejdź do `worlds/[TWOJ_SWIAT]/`
2. Edytuj plik `level.dat` LUB użyj komendy w grze:
3. W grze: Settings → Experiments → **Beta APIs: ON**
4. Alternatywnie: edytuj `world_behavior_packs.json` i dodaj:
   ```json
   {
     "experiments": {
       "data_driven_items": true,
       "upcoming_creator_features": true
     }
   }
   ```

### Krok 4: Restart serwera
1. Zapisz wszystkie zmiany
2. Zatrzymaj serwer
3. Uruchom serwer ponownie
4. Gracze przy logowaniu muszą zaakceptować resource pack

---

## 🧪 Testowanie w grze

Po zalogowaniu sprawdź czy działa:

```mcfunction
/give @s wojanshop:hamburgermc
/give @s wojanshop:cocacola
/give @s wojanshop:napojwojan
```

**Zjedz/wypij i sprawdź efekty:**
- Hamburger → Regeneration II (30s) ❤️
- Cola → Speed II (45s) ⚡
- Wojan Malinowy → Speed II + Strength I + Jump Boost I (60s) 💪

---

## ⚠️ Troubleshooting

### Problem: Items nie mają efektów
**Rozwiązanie:** Beta APIs nie jest włączone
- Sprawdź experiments w settings świata
- Sprawdź `level.dat` lub `world_behavior_packs.json`

### Problem: Items są gigantyczne
**Rozwiązanie:** Brakuje resource pack
- Sprawdź czy resource pack jest aktywny
- Gracze muszą zaakceptować resource pack przy logowaniu

### Problem: Items nie pojawiają się w /give
**Rozwiązanie:** Behavior pack nie jest załadowany
- Sprawdź `world_behavior_packs.json`
- Sprawdź logi serwera czy są błędy

### Problem: "Pack not found"
**Rozwiązanie:** Złe UUID lub struktura folderów
- Upewnij się że foldery nazywają się `behavior_pack/` i `resource_pack/`
- Sprawdź czy UUID w world_*_packs.json zgadza się z manifest.json

---

## 📋 Checklist

- [ ] Upload `behavior_pack/` do `development_behavior_packs/`
- [ ] Upload `resource_pack/` do `development_resource_packs/`
- [ ] Edytuj `world_behavior_packs.json` (UUID: f9e8d7c6-b5a4-4321-9876-543210fedcba)
- [ ] Edytuj `world_resource_packs.json` (UUID: d7c6b5a4-f321-4109-8754-321098765432)
- [ ] Włącz Beta APIs w świecie
- [ ] Restart serwera
- [ ] Test w grze: `/give @s wojanshop:hamburgermc`
- [ ] Test efektów: zjedz hamburger, sprawdź czy masz Regeneration II

---

## 🆔 Ważne UUID (do szybkiego odniesienia)

```
Behavior Pack UUID: f9e8d7c6-b5a4-4321-9876-543210fedcba
Resource Pack UUID: d7c6b5a4-f321-4109-8754-321098765432
Wersja: [1, 1, 1]
```

---

## 📞 Wsparcie

Jeśli coś nie działa:
1. Sprawdź logi serwera w Crafty Controller
2. Sprawdź content log: `worlds/[SWIAT]/contentlog.txt`
3. Zgłoś issue na GitHub: https://github.com/dashofgin/wojanshop-addon/issues
