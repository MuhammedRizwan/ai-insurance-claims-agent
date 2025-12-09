import { Request, Response } from "express";
import { extractTextFromFile } from "../services/pdf.service.js";
import { extractFieldsFromFnolText } from "../services/extraction.service.js";
import { findMissingFields } from "../services/validation.service.js";
import { routeClaim } from "../services/routing.service.js";

// Handle FNOL claim processing: extract text, structure it, validate, and route.
export async function processClaim(
  req: Request,
  res: Response
): Promise<void> {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  try {
    console.log(req.file);
    const text = await extractTextFromFile(req.file.path);
    const extractedFields = await extractFieldsFromFnolText(text);
    const missingFields = findMissingFields(extractedFields);
    const routingDecision = routeClaim(extractedFields, missingFields);

    res.json({
      extractedFields,
      missingFields,
      recommendedRoute: routingDecision.recommendedRoute,
      reasoning: routingDecision.reasoning,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to process claim" });
  }
}
