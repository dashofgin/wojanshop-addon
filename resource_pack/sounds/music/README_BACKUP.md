# Backup - Oryginalny Plik Video

## palion_mamban_video_backup.ogg

To oryginalny plik, który był błędnie zakodowany jako **Theora video** zamiast **Vorbis audio**.

### Problem:
Minecraft Bedrock może odtwarzać tylko pliki OGG Vorbis audio, nie obsługuje Theora video.

### Rozwiązanie:
Plik został przekonwertowany za pomocą ffmpeg do formatu Vorbis audio:
```bash
ffmpeg -i palion_mamban_video_backup.ogg -vn -c:a libvorbis -q:a 6 palion_mamban.ogg
```

### Wynik:
- **palion_mamban_video_backup.ogg** (4.0 MB) - backup oryginalnego pliku video
- **palion_mamban.ogg** (3.6 MB) - poprawnie zakodowany plik audio używany w grze

**UWAGA:** Plik backup NIE jest pakowany do ZIPów dla serwera - jest tylko w repozytorium GitHub.
