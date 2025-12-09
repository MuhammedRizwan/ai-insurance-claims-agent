import { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultView from "./components/ResultView";
import type { ClaimResult } from "./types/claim";

const App = () => {
  const [result, setResult] = useState<ClaimResult | null>(null);

  return (
    <div>
      <h1>FNOL Claims Processing Agent</h1>
      <UploadForm onResult={setResult} />
      {result && <ResultView result={result} />}
    </div>
  );
};

export default App;
