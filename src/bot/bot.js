import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
import { TELEGRAM_TOKEN, API_BASE_URL } from "../config/config.js";

// Initialize Telegram bot
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Log that the bot is connected
console.log("Bot is up and running!");

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `
Welcome to the Bot! 🤖

Here's how you can use me:
- Reply to a message with /Crunchyroll, /ExpressVPN, or /CapCut to update the corresponding API route.
- For example:
  1. Reply to a message and type /Crunchyroll.
  2. I'll update the Crunchyroll route with the message content.

Feel free to explore and use the commands! 🚀
`;
  bot.sendMessage(chatId, welcomeMessage);
});

// Command handler for /Crunchyroll, /ExpressVPN, and /CapCut
bot.onText(/\/(Crunchyroll|ExpressVPN|CapCut)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const command = match[1].toLowerCase();
  const replyMessage = msg.reply_to_message?.text;

  if (!replyMessage) {
    return bot.sendMessage(chatId, "Please reply to a message with this command.");
  }

  try {
    // Send POST request to update API route
    const response = await axios.post(`${API_BASE_URL}/api/${command}`, { data: replyMessage });
    console.log(`API Response:`, response.data);
    bot.sendMessage(chatId, `Successfully updated /${command} route.`);
  } catch (error) {
    console.error("API Error:", error.message);

    // Enhanced error handling
    if (error.response) {
      bot.sendMessage(chatId, `Error ${error.response.status}: ${error.response.data.message || "Failed to update the route."}`);
    } else {
      bot.sendMessage(chatId, "An unexpected error occurred. Please try again.");
    }
  }
});

// Generic message handler for debugging
bot.on("message", (msg) => {
  console.log("Message received:", msg.text || "Non-text message received");
});

export default bot;