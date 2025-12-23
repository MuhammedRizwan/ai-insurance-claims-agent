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

export interface ClaimResult {
  extractedFields: ExtractedFields;
  missingFields: string[];
  recommendedRoute: string;
  reasoning: string;
}
