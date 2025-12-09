import { useState } from "react";
import type { ClaimResult } from "../types/claim";
import { uploadFnol } from "../services/api";

interface UploadFormProps {
  onResult: (result: ClaimResult) => void;
  onError: (message: string) => void;
}

const UploadForm = ({ onResult, onError }: UploadFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [textPreview, setTextPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setError(null);
    setTextPreview(null);
    if (file && file.type === "text/plain") {
      // Read text files to show a quick preview (first ~10 lines).
      const reader = new FileReader();
      reader.onload = () => {
        const content = (reader.result as string) ?? "";
        const lines = content.split("\n").slice(0, 10).join("\n");
        setTextPreview(lines);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setTextPreview(null);
      if (file.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = () => {
          const content = (reader.result as string) ?? "";
          const lines = content.split("\n").slice(0, 10).join("\n");
          setTextPreview(lines);
        };
        reader.readAsText(file);
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      const message = "Please select a PDF or TXT file to upload.";
      setError(message);
      onError(message);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await uploadFnol(selectedFile);
      onResult(result);
    } catch (err) {
      const message = "Failed to process claim. Please try again.";
      setError(message);
      onError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-base font-semibold text-neutral-100">
            Upload FNOL Document
          </p>
          <p className="text-sm leading-relaxed text-neutral-400">
            Upload a PDF or TXT file to analyze and route the claim
            automatically.
          </p>
        </div>

        {/* Drag-and-drop keeps UI calm while supporting click upload */}
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6 transition ${
            isDragging
              ? "border-blue-500 bg-neutral-800/80"
              : "border-neutral-800 bg-neutral-900 hover:border-blue-400/70 hover:bg-neutral-800"
          } ${loading ? "opacity-70" : ""}`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 shadow-sm ring-1 ring-neutral-700">
            <span className="text-lg text-blue-400" aria-hidden>
              📄
            </span>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-neutral-100">
              Drag & drop your file here
            </p>
            <p className="text-xs text-neutral-400">
              PDF or TXT, up to 10 MB
            </p>
          </div>
          <input
            type="file"
            accept=".pdf,.txt"
            onChange={handleFileChange}
            disabled={loading}
            className="hidden"
          />
          {selectedFile && (
            <p className="text-xs font-medium text-blue-300">
              Selected: {selectedFile.name}
            </p>
          )}
        </label>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !selectedFile}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-neutral-700"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {loading ? "Analyzing document…" : "Process Claim"}
          </button>
          {error && (
            <p className="text-xs font-medium text-red-300">{error}</p>
          )}
        </div>

        {selectedFile && (
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-neutral-100">
                  File preview
                </p>
                <p className="text-xs text-neutral-400">
                  Review the selected file before processing.
                </p>
              </div>
              <span className="rounded-full bg-neutral-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-300 ring-1 ring-neutral-700">
                {selectedFile.type === "application/pdf" ? "PDF" : "TXT"}
              </span>
            </div>

            <div className="mt-3 grid gap-2 text-sm text-neutral-300 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-md border border-neutral-800 bg-neutral-800/60 px-3 py-2">
                <span className="text-neutral-400">Name</span>
                <span className="font-medium text-neutral-100">
                  {selectedFile.name}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md border border-neutral-800 bg-neutral-800/60 px-3 py-2">
                <span className="text-neutral-400">Size</span>
                <span className="font-medium text-neutral-100">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
            </div>

            {/* Text preview shows first ~10 lines; PDF shows a server-side note */}
            <div className="mt-3 rounded-md border border-neutral-800 bg-neutral-800/60 p-3">
              {selectedFile.type === "application/pdf" ? (
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-neutral-800 px-2 py-1 text-xs font-semibold text-blue-300 ring-1 ring-neutral-700">
                    PDF
                  </div>
                  <p className="text-sm text-neutral-300">
                    PDF preview will be extracted server-side.
                  </p>
                </div>
              ) : textPreview ? (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    First lines
                  </p>
                  <pre className="max-h-44 overflow-auto rounded-md bg-neutral-900 p-3 text-xs text-neutral-200">
{textPreview}
                  </pre>
                </div>
              ) : (
                <p className="text-sm text-neutral-400">
                  Preview unavailable.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
