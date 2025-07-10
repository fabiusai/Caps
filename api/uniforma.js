import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const userInput = req.body.input;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: `Aggiusta le maiuscole e minuscole di questo testo senza cambiare le parole:\n\n${userInput}`
          }
        ]
      })
    });

    const data = await openaiRes.json();

    // 🔍 Logga la risposta per vedere cosa arriva da OpenAI
    console.log("OpenAI response:", data);

    res.status(200).json(data);
  } catch (err) {
    console.error("Errore chiamata OpenAI:", err);
    res.status(500).json({ error: "Errore interno" });
  }
}
