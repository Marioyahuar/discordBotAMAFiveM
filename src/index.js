require("dotenv").config();
const { Client, Events, GatewayIntentBits } = require("discord.js"); //v14.6.0
const token = process.env.DISCORD_TOKEN;
const generator = require("./helpers/generator");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("The AI bot is online"); //message when bot is online
});

client.on(Events.MessageCreate, async (message) => {
  if (message.content.substring(0, 1) === "!") {
    const prompt = message.content.substring(1); //remove the exclamation mark from the message
    const answer = await generator.askMeAnything("midnightCity", prompt); //prompt GPT-3
    client.channels
      .fetch(message.channelId)
      .then((channel) => channel.send(answer));
  }
});

client.login(token);
