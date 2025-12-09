import dotenv from "dotenv";
dotenv.config();

export const env = {
    PORT: process.env.PORT as string,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY as string,
};