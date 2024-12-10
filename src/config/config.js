import dotenv from "dotenv";

dotenv.config();

export default {
  telegramToken: process.env.TELEGRAM_TOKEN,
  apiBaseUrl: process.env.API_BASE_URL,
};
