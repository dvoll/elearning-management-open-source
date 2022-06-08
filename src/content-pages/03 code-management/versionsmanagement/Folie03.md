---
type: "slide"
---
### Was ist Versionskontrolle?
- Versionskontrolle speichert Änderungen an einer oder mehrerer Dateien, um jederzeit bestimmte Versionen wiederherstellen zu können
- Mit vielen Dateitypen möglich, aber vor allem in der Softwareentwicklung überall anzutreffen

### 3 Arten von Versionskontrolle
- Lokale Versionskontrolle
    - Speichert Unterschiede zwischen Dateiänderungen und kann so einen bestimmten Zustand wiederherstellen
- Zentralisierte Versionskontrolle
    - Um die gemeinsame Arbeit an Code zu ermöglichen, wird die Nachverfolgung von Änderungen auf einem Server realisiert und Clients können die Dateien davon auschecken
    - Änderungen werden dann zum Server geschickt und dort protokolliert
    - Administration und Rechtevergabe möglich
    - Aber Verbindung zum Server notwendig und bei Datenverlust (und ohne Backup) auch Verlust des gesamten Änderungsverlaufs
    - Beispiele: CVS und Subversion
- Dezentrale Versionskontrolle
    - Hier wird das komplette Repository mit der gesamten Historie auf den lokalen Clients gespiegelt
    - Es kann auch ohne eine Verbindung zu einem Server weitergearbeitet werden, da alle Informationen lokal zur Verfügung stehen
    - Client Repositories können bei einem Ausfall eines Servers einfach wieder auf diesen geladen werden, da überall der gleiche Stand vorhanden ist
    - Auch mehrere remote Server können verwendet werden, um zum Beispiel mit anderen Teams zusammen zu arbeiten
    - Heute sehr verbreitet
    - Beispiele: Git und Mercurial
