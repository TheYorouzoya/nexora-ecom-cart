const API_BASE_URL = import.meta.env.VITE_API_URL;

export const PRODUCTS_ENDPOINT = "/products";

async function request<T>(
    endpoint: string,
    options: RequestInit = {}
):  Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        }
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error (${res.status}): ${text}`);
    }

    return res.json() as Promise<T>;
}

export const api = {
    get: <T>(endpoint: string) => request<T>(endpoint),
    post: <T>(endpoint: string, body?: any, headers?: any) =>
        request<T>(endpoint, {
            method: "POST",
            headers: { ...headers },
            body: body ? JSON.stringify(body) : undefined,
        }),
    put: <T>(endpoint:string, body?: any, headers?: any) =>
        request<T>(endpoint, {
            method: "PUT",
            headers: { ...headers },
            body: body ? JSON.stringify(body) : undefined,
        }),
    del: <T>(endpoint: string) =>
        request<T>(endpoint, { method: "DELETE" }),
};