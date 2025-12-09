import { useState } from "react";
import type { ClaimResult } from "../types/claim";
import { uploadFnol } from "../services/api";

interface UploadFormProps {
  onResult: (result: ClaimResult) => void;
}

const UploadForm = ({ onResult }: UploadFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Please select a PDF or TXT file to upload.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await uploadFnol(selectedFile);
      onResult(result);
    } catch (err) {
      setError("Failed to process claim. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf,.txt"
        onChange={handleFileChange}
        disabled={loading}
      />
      <button type="button" onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Process Claim"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UploadForm;
