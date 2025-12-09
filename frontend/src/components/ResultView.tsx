import type { ClaimResult } from "../types/claim";

interface ResultViewProps {
  result: ClaimResult;
}

const ResultView = ({ result }: ResultViewProps) => {
  const hasMissing = result.missingFields.length > 0;

  return (
    <div>
      <h2>Recommended Route</h2>
      <h3>{result.recommendedRoute}</h3>
      <p>{result.reasoning}</p>

      {hasMissing && (
        <div>
          <h4>Missing Fields</h4>
          <dl>
            {result.missingFields.map((field) => (
              <div key={field}>
                <dt>{field}</dt>
                <dd>Missing</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <h4>Extracted Fields</h4>
      <pre>{JSON.stringify(result.extractedFields, null, 2)}</pre>
    </div>
  );
};

export default ResultView;
