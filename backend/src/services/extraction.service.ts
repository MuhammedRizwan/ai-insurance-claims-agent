import { getGeminiModel } from "../config/geminiClient.js";

// Shape of the structured data we want from the FNOL text.
export interface ExtractedFields {
  policyNumber: string | null;
  policyholderName: string | null;
  effectiveDates: string | null;
  incidentDate: string | null;
  incidentTime: string | null;
  location: string | null;
  description: string | null;
  claimant: string | null;
  thirdParties: string | null;
  contactDetails: string | null;
  assetType: string | null;
  assetId: string | null;
  estimatedDamage: string | null;
  claimType: string | null;
  attachments: string | null;
  initialEstimate: string | null;
}

// Use Gemini to extract structured fields from raw FNOL text.
export async function extractFieldsFromFnolText(
  fnolText: string
): Promise<ExtractedFields> {
  // Get the configured Gemini model.
  const model = getGeminiModel();

  // Prompt instructs Gemini to return only JSON matching ExtractedFields.
  const prompt = `
You are extracting structured data from a FNOL (First Notice of Loss) document.
Return ONLY valid JSON (no markdown, no extra text) with the following exact structure:
{
  "policyNumber": string | null,
  "policyholderName": string | null,
  "effectiveDates": string | null,
  "incidentDate": string | null,
  "incidentTime": string | null,
  "location": string | null,
  "description": string | null,
  "claimant": string | null,
  "thirdParties": string | null,
  "contactDetails": string | null,
  "assetType": string | null,
  "assetId": string | null,
  "estimatedDamage": string | null,
  "claimType": string | null,
  "attachments": string | null,
  "initialEstimate": string | null
}

Use null for any field you cannot find.

FNOL text:
${fnolText}
`.trim();

  // Ask Gemini for JSON output.
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json" },
  });

  // Parse the JSON response into our typed shape.
  const rawText = result.response.text();
  try {
    return JSON.parse(rawText) as ExtractedFields;
  } catch (err) {
    throw new Error(
      `Failed to parse Gemini response as JSON. Raw response: ${rawText}`
    );
  }
}
