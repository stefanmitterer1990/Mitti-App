# Mitti: vom Code zur App (mit OpenAI-Schlüssel)

## Teil 1: OpenAI-Schlüssel
1. Gehe auf platform.openai.com und erstelle ein Konto.
2. Lade unter "Billing" etwas Guthaben auf (z. B. 5 €) und stelle ein monatliches Limit ein.
3. Unter "API keys" einen neuen Schlüssel erstellen und kopieren. Niemandem zeigen.

## Teil 2: Server online stellen (damit Mitti antwortet)
1. Konto auf github.com anlegen. Neues Repository erstellen.
2. Alle Dateien aus diesem Ordner hochladen (index.html, mitti.webp, icon.png, manifest.json, package.json und den Ordner api).
3. Konto auf vercel.com anlegen (mit GitHub anmelden). "Add New, Project", dein Repository wählen.
4. Unter "Environment Variables" eintragen: Name OPENAI_API_KEY, Wert dein Schlüssel.
5. "Deploy" klicken. Du bekommst einen Link wie https://mitti.vercel.app. Öffne ihn zum Testen.
6. Öffne die Datei index.html und schreibe direkt vor die Zeile mit <script> (das letzte Script) diese Zeile, mit DEINEM Link:
   <script>window.MITTI_API='https://mitti.vercel.app/api/chat'</script>
   Lade die geänderte Datei bei GitHub neu hoch.

## Teil 3: Android-App bauen (Windows oder Mac)
1. Installiere Node.js (nodejs.org) und Android Studio (developer.android.com/studio).
2. Lege einen Ordner "mitti-app" an. Darin einen Unterordner "www". Kopiere index.html, mitti.webp, icon.png und manifest.json in "www".
3. Öffne im Ordner "mitti-app" ein Terminal und gib nacheinander ein:
   npm init -y
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init Mitti de.deinname.mitti --web-dir=www
   npx cap add android
   npx cap sync
   npx cap open android
4. In Android Studio: Teste mit dem grünen Pfeil auf dem Emulator oder deinem Handy.
5. Menü Build, "Generate Signed App Bundle", "Android App Bundle". Erstelle einen neuen Schlüssel (Keystore). SICHERE die Datei und das Passwort. Ohne sie kannst du die App nie aktualisieren.
6. Du bekommst eine Datei mit der Endung .aab. Die lädst du im Play Store hoch.

## Teil 4: Google Play Store
1. play.google.com/console: Konto anlegen, 25 USD einmalig, Ausweis-Verifizierung.
2. "App erstellen". Name, Sprache, "App", "Kostenlos".
3. Eintrag ausfüllen: Beschreibung, Icon 512x512, Titelgrafik 1024x500, Screenshots, Datenschutzerklärung (Webadresse).
4. Formulare ausfüllen: Datensicherheit, Inhaltseinstufung, Zielgruppe.
5. Bei neuen privaten Konten: Geschlossener Test mit mindestens 12 Testern, die 14 Tage lang durchgehend dabei sind. Danach "Zugang für Produktion beantragen". Firmenkonten brauchen das nicht.
6. Lade die .aab hoch, prüfe alles, "Veröffentlichen". Google prüft die App, oft ein bis drei Tage.

## Wichtig
- Kosten: Jede Nachricht kostet etwas. Behalte das Limit bei OpenAI im Blick. Der Modellname steht in api/chat.js. Prüfe auf platform.openai.com/docs/models, ob er noch aktuell ist.
- Jugendliche: Datenschutzerklärung, Hinweis "Hier antwortet eine KI" und Zustimmung der Eltern sind nötig. Lies die Nutzungsregeln von OpenAI und Google für Minderjährige.
- Level und XP bleiben nur auf dem jeweiligen Handy gespeichert.
- Die Quizfragen stehen in index.html in der Liste Q. Lass sie fachlich prüfen.
