import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

// Load environment variables
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const API_BASE_URL = process.env.API_BASE_URL;

// Initialize Telegram bot
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Command handler
bot.onText(/\/(Crunchyroll|ExpressVPN|CapCut)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const command = match[1].toLowerCase();
  const replyMessage = msg.reply_to_message?.text;

  if (!replyMessage) {
    return bot.sendMessage(chatId, "Please reply to a message with this command.");
  }

  try {
    // Send POST request to update API route
    await axios.post(`${API_BASE_URL}/${command}`, { data: replyMessage });
    bot.sendMessage(chatId, `Successfully updated /${command} route.`);
  } catch (error) {
    console.error(error.message);
    bot.sendMessage(chatId, "Failed to update the route. Please try again.");
  }
});
