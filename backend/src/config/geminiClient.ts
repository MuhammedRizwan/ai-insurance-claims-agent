// Configures access to the Gemini API client for the backend.
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables.
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

// Shared Gemini client instance.
export const genAI = new GoogleGenerativeAI(apiKey);

// Helper to get the default Gemini model.
export const getGeminiModel = () =>
  genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
