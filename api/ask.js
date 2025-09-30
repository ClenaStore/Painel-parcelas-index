// /api/ask.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { question, f360Data } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // ou gpt-4.1/gpt-5
      messages: [
        {
          role: "system",
          content: "Você é um analista financeiro. Use os dados fornecidos do F360 para responder perguntas e gerar comparativos. Responda sempre em português claro e estruturado."
        },
        {
          role: "user",
          content: `Dados F360:\n${JSON.stringify(f360Data, null, 2)}\n\nPergunta: ${question}`
        }
      ],
      temperature: 0.2
    });

    res.status(200).json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao processar a requisição" });
  }
}
