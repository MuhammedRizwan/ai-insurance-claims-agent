import { ExtractedFields } from "./extraction.service.js";

export interface RoutingDecision {
  recommendedRoute: string;
  reasoning: string;
}

// Convert a nullable string amount to a number, stripping non-digits/decimal.
const parseAmount = (value: string | null): number | null => {
  if (!value) return null;
  const cleaned = value.replace(/[^0-9.-]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
};

// Decide which routing path a claim should take based on extracted fields.
export function routeClaim(
  fields: ExtractedFields,
  missingFields: string[]
): RoutingDecision {
  // 1) Missing mandatory fields → manual review.
  if (missingFields.length > 0) {
    return {
      recommendedRoute: "Manual review",
      reasoning: `Mandatory fields missing: ${missingFields.join(", ")}`,
    };
  }

  const description = fields.description?.toLowerCase() || "";
  // 2) Suspicious wording in description → investigation flag.
  if (
    description.includes("fraud") ||
    description.includes("inconsistent") ||
    description.includes("staged")
  ) {
    return {
      recommendedRoute: "Investigation Flag",
      reasoning: "Suspicious wording detected in description",
    };
  }

  // 3) Injury claims → specialist queue.
  if (fields.claimType?.toLowerCase() === "injury") {
    return {
      recommendedRoute: "Specialist Queue",
      reasoning: "Claim type is injury",
    };
  }

  // 4) Low estimated damage → fast-track.
  const estimatedDamage = parseAmount(fields.estimatedDamage);
  if (estimatedDamage !== null && estimatedDamage < 25000) {
    return {
      recommendedRoute: "Fast-track",
      reasoning: "Estimated damage is below 25,000",
    };
  }

  // 5) Default path.
  return {
    recommendedRoute: "Standard Processing",
    reasoning: "No special routing rules matched",
  };
}
