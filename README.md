# Autonomous Insurance Claims Processing Agent (FNOL)

A FNOL (First Notice of Loss) assistant that ingests PDF/TXT claim documents, uses Gemini to extract structured data, validates mandatory fields, applies routing rules, and returns clear JSON for the frontend to display.

## Tech Stack
- Node.js, Express, TypeScript
- Google Gemini (Generative AI)
- React, Vite

## Architecture
PDF/TXT upload → backend → AI extraction → validation → routing → JSON → frontend display.

## Setup

### Backend
1) `cd backend`
2) `npm install`
3) Set `GEMINI_API_KEY` in `.env`
4) `npm run dev`

### Frontend
1) `cd frontend`
2) `npm install`
3) `npm run dev`

## API
`POST /api/claims/process`

- Form field: `file` (PDF or TXT)
- Response: JSON with extracted fields, missing fields, and routing decision.

Example response:
```json
{
  "extractedFields": {
    "policyNumber": "ABC123",
    "policyholderName": "Jane Doe",
    "effectiveDates": "2024-01-01 to 2024-12-31",
    "incidentDate": "2024-05-10",
    "incidentTime": "14:30",
    "location": "123 Main St",
    "description": "Rear-end collision",
    "claimant": "Jane Doe",
    "thirdParties": "John Smith",
    "contactDetails": "555-1234",
    "assetType": "Vehicle",
    "assetId": "VIN123456789",
    "estimatedDamage": "$8,000",
    "claimType": "Auto",
    "attachments": null,
    "initialEstimate": "$7,500"
  },
  "missingFields": [],
  "recommendedRoute": "Fast-track",
  "reasoning": "Estimated damage is below 25,000"
}
```

## Routing Rules
1) Missing mandatory fields → Manual review  
2) Description mentions fraud/inconsistent/staged → Investigation Flag  
3) Claim type is injury → Specialist Queue  
4) Estimated damage below 25,000 → Fast-track  
(otherwise Standard Processing)

## Future Improvements
- Add authentication and role-based access.
- Persist claim submissions and history.
- Add retries / better error handling for AI calls.
- Support more document types and richer extraction schemas.
- Include frontend styling and accessibility enhancements.
