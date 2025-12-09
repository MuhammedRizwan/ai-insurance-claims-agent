import axios from "axios";
import type { ClaimResult } from "../types/claim";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL;

export async function uploadFnol(file: File): Promise<ClaimResult> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post<ClaimResult>(
      `${apiBaseUrl}/api/claims/process`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to upload FNOL");
  }
}
