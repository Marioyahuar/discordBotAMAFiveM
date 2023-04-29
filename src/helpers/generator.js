const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const contenidos = require("../helpers/content");
const generator = {};

// Set up your OpenAI API credentials
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function askMeAnything(subject, pregunta) {
  console.log("preguntando");
  const prompt = `En base exclusivamente a la información que te voy a proporcionar, responde a una comunidad de jugadores de gta 5 roleplay con no más de 120 tokens la siguiente pregunta:${pregunta}.
  Información:
  "${contenidos[subject]}"`;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 145,
  });
  console.log(response.data.choices[0].text.trim());
  return response.data.choices[0].text.trim();
}

generator.askMeAnything = askMeAnything;

module.exports = generator;
