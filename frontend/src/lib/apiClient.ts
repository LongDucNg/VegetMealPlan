import { tokenStorage } from "./tokenStorage";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class ApiError extends Error {
  code: string;
  status: number;
  details?: string[];

  constructor(message: string, code = "UNKNOWN_ERROR", status = 500, details?: string[]) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...customConfig } = options;

  let url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        searchParams.append(key, String(val));
      }
    });
    const qs = searchParams.toString();
    if (qs) {
      url += (url.includes("?") ? "&" : "?") + qs;
    }
  }

  const token = tokenStorage.getToken();
  const reqHeaders: Record<string, string> = {
    Accept: "application/json",
    ...(customConfig.body && !(customConfig.body instanceof FormData)
      ? { "Content-Type": "application/json" }
      : {}),
    ...(headers as Record<string, string>),
  };

  if (token && !reqHeaders.Authorization) {
    reqHeaders.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...customConfig,
      headers: reqHeaders,
    });

    // 204 No Content
    if (response.status === 204) {
      return null as T;
    }

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      const errPayload = json?.error || json || {};
      const code = errPayload.code || `HTTP_${response.status}`;
      const message =
        errPayload.message || response.statusText || "Đã có lỗi xảy ra, vui lòng thử lại";
      const details = Array.isArray(errPayload.details) ? errPayload.details : undefined;

      if (response.status === 401) {
        // If unauthorized and we had a token, remove it so app can fallback to Guest
        if (typeof window !== "undefined") {
          tokenStorage.removeToken();
        }
      }

      throw new ApiError(message, code, response.status, details);
    }

    // Backend wraps response in { success: true, data: ..., pagination?: ... }
    if (json && typeof json === "object" && "success" in json) {
      if (json.pagination && json.data !== undefined && Array.isArray(json.data)) {
        (json.data as any).pagination = json.pagination;
      }
      return (json.data !== undefined ? json.data : json) as T;
    }

    return json as T;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }
    const errObj = error as { message?: string } | null;
    throw new ApiError(
      errObj?.message || "Không thể kết nối đến máy chủ",
      "NETWORK_ERROR",
      0
    );
  }
}

export const apiClient = {
  get<T>(endpoint: string, optionsOrParams?: RequestOptions | Record<string, any>): Promise<T> {
    const options: RequestOptions =
      optionsOrParams && typeof optionsOrParams === "object" && ("params" in optionsOrParams || "headers" in optionsOrParams)
        ? (optionsOrParams as RequestOptions)
        : { params: optionsOrParams as any };
    return request<T>(endpoint, { ...options, method: "GET" });
  },

  post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  },

  put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  },

  patch<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  },

  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, { ...options, method: "DELETE" });
  },

  upload<T>(endpoint: string, file: File, fieldName: string = "file", options?: RequestOptions): Promise<T> {
    const formData = new FormData();
    formData.append(fieldName, file);
    return this.post<T>(endpoint, formData, options);
  },
};
