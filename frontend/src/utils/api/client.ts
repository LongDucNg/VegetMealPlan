/**
 * Re-exporting from unified apiClient in @/lib/apiClient and tokenStorage in @/lib/tokenStorage
 */
export {
  apiClient,
  ApiError,
  type ApiResponse,
} from "@/lib/apiClient";

export { tokenStorage } from "@/lib/tokenStorage";

export const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("vh_access_token") || localStorage.getItem("vh_token");
};

export const setAuthToken = (token: string | null) => {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("vh_access_token", token);
  } else {
    localStorage.removeItem("vh_access_token");
    localStorage.removeItem("vh_token");
  }
};
