import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) as number,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY as string,
  API_BASE_URL: process.env.API_BASE_URL as string,
};

export default env;

