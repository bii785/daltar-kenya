const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface ApiErrorBody {
  detail?: string;
}

export default async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body: ApiErrorBody = await response.json();
      if (body.detail) message = body.detail;
    } catch {
      // response body wasn't JSON — keep the generic message
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
