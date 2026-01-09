#!/usr/bin/env python3
"""
Skrypt do usuwania białego tła z tekstur Minecraft i zamiany na przezroczyste PNG.
"""
from PIL import Image
import os
import sys

def remove_white_background(image_path, output_path=None, threshold=240):
    """
    Usuwa białe tło z obrazu i zamienia na przezroczyste.

    Args:
        image_path: Ścieżka do pliku wejściowego
        output_path: Ścieżka do pliku wyjściowego (domyślnie: nadpisuje oryginał)
        threshold: Próg jasności (0-255) powyżej którego piksel jest uznawany za biały
    """
    if output_path is None:
        output_path = image_path

    # Otwórz obraz
    img = Image.open(image_path)

    # Konwertuj na RGBA jeśli nie jest
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    # Pobierz dane pikseli
    datas = img.getdata()

    # Nowa lista pikseli
    new_data = []

    for item in datas:
        # Sprawdź czy piksel jest prawie biały (R, G, B > threshold)
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            # Zamień na przezroczysty (alpha = 0)
            new_data.append((255, 255, 255, 0))
        else:
            # Zostaw piksel bez zmian
            new_data.append(item)

    # Zastosuj nowe dane
    img.putdata(new_data)

    # Zapisz jako PNG
    img.save(output_path, 'PNG')

    return output_path

def process_directory(directory_path, threshold=240):
    """
    Przetwarza wszystkie pliki PNG w katalogu.

    Args:
        directory_path: Ścieżka do katalogu z plikami PNG
        threshold: Próg jasności dla białych pikseli
    """
    processed = 0
    errors = 0

    # Znajdź wszystkie pliki PNG
    for filename in os.listdir(directory_path):
        if filename.lower().endswith('.png'):
            file_path = os.path.join(directory_path, filename)

            try:
                print(f"Przetwarzam: {filename}...", end=' ')
                remove_white_background(file_path, threshold=threshold)
                print("✓")
                processed += 1
            except Exception as e:
                print(f"✗ Błąd: {e}")
                errors += 1

    print(f"\n✅ Przetworzono: {processed} plików")
    if errors > 0:
        print(f"❌ Błędy: {errors} plików")

    return processed, errors

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Użycie: python3 remove_white_background.py <katalog_z_png>")
        print("Przykład: python3 remove_white_background.py resource_pack/textures/items/")
        sys.exit(1)

    directory = sys.argv[1]

    # Opcjonalny threshold jako drugi argument
    threshold = int(sys.argv[2]) if len(sys.argv) > 2 else 240

    if not os.path.isdir(directory):
        print(f"❌ Błąd: {directory} nie jest katalogiem!")
        sys.exit(1)

    print(f"🔄 Usuwanie białego tła z plików PNG w: {directory}")
    print(f"   Threshold: {threshold} (piksele o R,G,B > {threshold} będą przezroczyste)\n")

    processed, errors = process_directory(directory, threshold)

    if errors == 0:
        print(f"\n🎉 Sukces! Wszystkie {processed} tekstur zostało przekonwertowanych!")
    else:
        sys.exit(1)
