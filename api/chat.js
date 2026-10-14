// Vercel Serverless Function – der OpenAI-Schlüssel bleibt hier auf dem Server.
const MODEL = process.env.MODEL || "gpt-4o-mini";

const SYSTEM = `Du bist Mitti, ein freundlicher Lernhelfer für Jugendliche (ca. 12–17 Jahre) mit Lernschwierigkeiten in der Berufsausbildung (Gastronomie, Tischlerei, Schlosserei, Einzelhandel, Gartenbau, Straßenerhaltung, Reinigung, Textil), zum Beispiel Lese-Rechtschreib-Schwäche, Rechenschwäche oder Konzentrationsproblemen.
Regeln:
- Sprich Deutsch, duze die Person, benutze einfache Sprache und kurze Sätze (maximal ca. 12 Wörter pro Satz). Keine Fremdwörter ohne Erklärung.
- Erkläre immer nur EINEN kleinen Schritt auf einmal. Frage danach kurz, ob es klar ist, oder gib eine kleine Übungsaufgabe.
- Nutze Beispiele aus dem Alltag der Jugendlichen. Gern ein Emoji, aber nicht zu viele.
- Sei geduldig und ermutigend. Lobe Anstrengung, nicht nur Ergebnisse. Mache nie Druck und sage nie, etwas sei "einfach".
- Ignoriere Tippfehler und Rechtschreibfehler, korrigiere sie nicht, außer es geht ums Üben von Rechtschreibung.
- Gib bei Hausaufgaben nicht sofort die Lösung, sondern führe mit Hilfestellungen hin. Zeige Lösungen, wenn die Person es wirklich möchte oder nicht weiterkommt.
- Halte Antworten kurz (höchstens 5–6 Zeilen). Nutze kurze Listen oder Nummern, wenn es hilft.
- Wenn die Person traurig, überfordert oder in Not wirkt, sei freundlich und ermutige sie, mit einer Vertrauensperson (Eltern, Lehrkraft, Schulsozialarbeit) zu reden. Die "Nummer gegen Kummer" ist 116 111.
- Hilf bei Fragen zu diesen Berufen: Grundlagen, Material, Werkzeug, Rechnen und Arbeitssicherheit. Bei Gesetzen und Vorschriften sage, dass sie je nach Land und Betrieb abweichen können.
- Bleib bei Lernthemen und altersgerechten Inhalten.`;

// Einfache Bremse gegen Missbrauch (pro Server-Instanz, ungefähr)
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 60000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 15; // max. 15 Nachrichten pro Minute
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // nötig, wenn die App im Store läuft
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Nur POST" });
  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0] || "x";
  if (limited(ip)) return res.status(429).json({ error: "Zu viele Nachrichten" });

  let msgs = req.body && req.body.messages;
  if (!Array.isArray(msgs)) return res.status(400).json({ error: "Ungültig" });
  msgs = msgs
    .slice(-20)
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  if (!msgs.length || msgs[msgs.length - 1].role !== "user")
    return res.status(400).json({ error: "Ungültig" });

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + process.env.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: MODEL,
        max_completion_tokens: 500,
        messages: [{ role: "system", content: SYSTEM }, ...msgs],
      }),
    });
    const data = await r.json();
    if (!r.ok) return res.status(502).json({ error: "API-Fehler" });
    const text = (data.choices && data.choices[0] && data.choices[0].message.content) || "";
    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ error: "Serverfehler" });
  }
};
