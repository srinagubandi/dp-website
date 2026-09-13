export type ApiEnvelope<T> = { success: true; data: T; error: null } | { success: false; data: null; error: { code: string; message: string; fields?: Record<string, string[]> } };

export async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    credentials: "include",
    ...init,
    headers: init?.body ? { "Content-Type": "application/json", ...init.headers } : init?.headers,
  });
  const body = (await response.json()) as ApiEnvelope<T>;
  if (!response.ok || !body.success) {
    const error = new Error(body.success ? "Request failed." : body.error.message) as Error & { status?: number; fields?: Record<string, string[]> };
    error.status = response.status;
    if (!body.success) error.fields = body.error.fields;
    throw error;
  }
  return body.data;
}
