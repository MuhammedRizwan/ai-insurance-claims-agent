import { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultView from "./components/ResultView";
import type { ClaimResult } from "./types/claim";

const App = () => {
  const [result, setResult] = useState<ClaimResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="dark min-h-screen bg-black text-neutral-100">
      <header className="border-b border-neutral-900 bg-neutral-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8">
          <div>
            <h1 className="text-3xl font-semibold leading-tight text-neutral-100">
              FNOL Claims Processing Agent
            </h1>
            <p className="text-base text-neutral-400">
              Autonomous insurance claim analysis powered by AI
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <UploadForm
            onResult={(value) => {
              setResult(value);
              setError(null);
            }}
            onError={(message) => {
              setError(message);
              setResult(null);
            }}
          />

          {result ? (
            <div className="motion-safe:animate-fade-in">
              <ResultView result={result} />
            </div>
          ) : (
            <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-dashed border-neutral-800 bg-neutral-900 p-6 text-center shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md">
              <div className="space-y-2">
                <p className="text-base font-semibold text-neutral-100">
                  Results will appear here
                </p>
                <p className="text-sm text-neutral-400">
                  Process a document to see routing decisions and extracted
                  fields.
                </p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-900 bg-neutral-900 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-900 text-red-200">
                !
              </div>
              <div>
                <p className="text-sm font-medium text-red-200">
                  Unable to process the claim
                </p>
                <p className="text-sm text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
