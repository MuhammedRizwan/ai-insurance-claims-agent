import fs from "fs";
import path from "path";
import pdf from "pdf-parse";

// Extract text content from a PDF file using pdf-parse.
export const extractTextFromPdf = async (filePath: string): Promise<string> => {
  const buffer = fs.readFileSync(filePath);
  const result = await pdf(buffer);
  return result.text;
};

// Extract text from a file based on its extension (PDF or plain text).
export const extractTextFromFile = async (filePath: string): Promise<string> => {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".pdf") {
    return extractTextFromPdf(filePath);
  }

  if (ext === ".txt") {
    return fs.readFileSync(filePath, "utf8");
  }

  throw new Error(`Unsupported file type: ${ext}`);
};
