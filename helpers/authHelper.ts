import {APIRequestContext} from "@playwright/test";
import {AuthResponse} from "./types";

export async function login(request: APIRequestContext, creds: { email: string; password: string }): Promise<AuthResponse> {
    const res = await request.post("/api/v1/auth/login", { data: creds });

    if (!res.ok()) {
        throw new Error(`Login failed: ${res.status()}\n${await res.text()}`);
    }
    return (await res.json()) as AuthResponse;
}
