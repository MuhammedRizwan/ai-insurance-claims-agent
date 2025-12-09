import { ExtractedFields } from "./extraction.service.js";

// Required FNOL fields we expect to be populated.
export const REQUIRED_FIELDS: (keyof ExtractedFields)[] = [
  "policyNumber",
  "policyholderName",
  "incidentDate",
  "incidentTime",
  "location",
  "description",
  "claimant",
  "claimType",
  "estimatedDamage",
  "initialEstimate",
];

// Identify any required fields that are missing or blank.
export function findMissingFields(fields: ExtractedFields): string[] {
  return REQUIRED_FIELDS.filter((key) => {
    const value = fields[key];
    return value === null || value === undefined || String(value).trim() === "";
  });
}
