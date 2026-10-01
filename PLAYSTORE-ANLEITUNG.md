# Mitti im Google Play Store veröffentlichen
Menünamen in der Play Console können sich ändern. Wenn etwas anders heißt, such nach dem ähnlichen Begriff.

## Vorher erledigt?
- Server läuft auf Vercel, `OPENAI_API_KEY` ist eingetragen (siehe ANLEITUNG.md).
- In index.html steht die Zeile `window.MITTI_API='https://DEINE-SEITE.vercel.app/api/chat'`.
- Du hast die Datei **app-release.aab** gebaut (ANLEITUNG.md, Teil 3).
- Die Datenschutzerklärung ist ausgefüllt und unter `https://DEINE-SEITE.vercel.app/datenschutz.html` erreichbar.

## Schritt 1: Entwicklerkonto
1. Öffne play.google.com/console und melde dich mit einem Google-Konto an.
2. Wähle "Privatperson" oder "Organisation".
3. Zahle die einmalige Gebühr von 25 USD und verifiziere deine Identität mit einem Ausweis. Das kann einige Tage dauern.

## Schritt 2: App anlegen
1. "App erstellen". Name: Mitti – Lernen für die Ausbildung. Sprache: Deutsch.
2. Wähle "App", "Kostenlos" und bestätige die Erklärungen.

## Schritt 3: App-Einrichtung
Im Menü "Dashboard" findest du die Aufgaben. Arbeite sie von oben nach unten ab:
1. Datenschutzerklärung: Webadresse einfügen.
2. App-Zugriff: "Alle Funktionen sind ohne Anmeldung verfügbar".
3. Werbung: "Nein, keine Werbung".
4. Inhaltseinstufung: Fragebogen ehrlich ausfüllen. Gib an, dass Nutzer mit einer KI chatten.
5. Zielgruppe: Altersgruppen wählen, die zu deiner Datenschutzerklärung passen.
6. Datensicherheit: Chat-Nachrichten werden an einen Server und KI-Dienst gesendet. Gib das an.
7. KI-Funktion: Wenn die Console danach fragt, gib an, dass die App KI-generierte Inhalte enthält.

## Schritt 4: Store-Eintrag
Unter "Store-Eintrag": Texte aus store-texte.md einfügen. Lade hoch:
- App-Icon 512×512 Pixel (PNG)
- Titelgrafik 1024×500 Pixel
- mindestens 2 Handy-Screenshots (am besten 4 bis 8)

## Schritt 5: Geschlossener Test (bei neuen Privatkonten Pflicht)
1. "Test und Veröffentlichung", "Geschlossene Tests", "Track erstellen".
2. Lege eine Tester-Liste mit mindestens 12 E-Mail-Adressen von Google-Konten an.
3. "Neuen Release erstellen", `app-release.aab` hochladen, Namen und Hinweise eintragen, speichern und zur Prüfung senden.
4. Schicke den Test-Link an deine Tester. Sie müssen die App installieren und 14 Tage lang dabeibleiben.
5. Erinnere sie nach einer Woche, dass sie die App behalten sollen.

Firmenkonten brauchen diesen Test nicht.

## Schritt 6: Produktion
1. Nach 14 Tagen: Im Dashboard "Zugriff auf Produktion beantragen" und die Fragen beantworten.
2. Wenn Google zustimmt: "Produktion", "Neuen Release erstellen", dieselbe .aab (oder neue Version) hochladen.
3. "Zur Prüfung senden". Die Prüfung dauert oft ein bis drei Tage.

## Wichtige Hinweise
- **Schlüssel:** Die Keystore-Datei und das Passwort gut sichern.
- **Updates:** Bei jeder neuen Version die "versionCode"-Nummer in `android/app/build.gradle` erhöhen.
- **Ablehnung:** Lies die Begründung von Google in der Console, ändere und sende erneut.
- **Jugendliche:** Datenschutz, Elternzustimmung und die Regeln von Google und OpenAI für Minderjährige beachten.
