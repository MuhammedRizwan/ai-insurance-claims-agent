import type { ClaimResult } from "../types/claim";

interface ResultViewProps {
  result: ClaimResult;
}

const routeStyles: Record<
  string,
  { bg: string; text: string; border: string; label: string }
> = {
  "Fast-track": {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "ring-1 ring-green-200",
    label: "Fast-track",
  },
  "Manual review": {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "ring-1 ring-yellow-200",
    label: "Manual review",
  },
  "Investigation Flag": {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "ring-1 ring-red-200",
    label: "Investigation Flag",
  },
  "Specialist Queue": {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "ring-1 ring-blue-200",
    label: "Specialist Queue",
  },
};

const ResultView = ({ result }: ResultViewProps) => {
  const hasMissing = result.missingFields.length > 0;
  const badgeStyle =
    routeStyles[result.recommendedRoute] ??
    routeStyles["Manual review"]; // safe default

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-semibold text-neutral-100">
              Routing Decision
            </p>
            <p className="text-sm leading-relaxed text-neutral-400">
              Recommended next step for this claim
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
          >
            {badgeStyle.label}
          </span>
        </div>

        <div className="rounded-lg bg-neutral-800 p-4">
          <p className="text-sm font-semibold text-neutral-100">Reasoning</p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            {result.reasoning}
          </p>
        </div>

        {hasMissing && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-neutral-100">
              Missing Fields
            </p>
            <div className="flex flex-wrap gap-2">
              {result.missingFields.map((field) => (
                <span
                  key={field}
                  className="inline-flex items-center rounded-full bg-yellow-200/20 px-3 py-1 text-xs font-semibold text-yellow-200 ring-1 ring-yellow-500/30"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-neutral-100">
            Extracted Fields
          </p>
          <div className="overflow-hidden rounded-lg border border-neutral-800">
            <div className="max-h-80 overflow-y-auto">
              <dl className="divide-y divide-neutral-800">
                {Object.entries(result.extractedFields).map(
                  ([key, value], index) => (
                    <div
                      key={key}
                      className={`grid grid-cols-3 items-start gap-4 px-4 py-3 ${
                        index % 2 === 0 ? "bg-neutral-900" : "bg-neutral-800/60"
                      }`}
                    >
                      <dt className="text-sm font-medium text-neutral-200">
                        {key}
                      </dt>
                      <dd className="col-span-2 text-sm text-neutral-300">
                        {value ?? "—"}
                      </dd>
                    </div>
                  )
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
