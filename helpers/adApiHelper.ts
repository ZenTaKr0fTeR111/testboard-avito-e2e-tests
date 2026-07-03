import { APIRequestContext, expect } from "@playwright/test";
import { TEST_IMAGE_B64 } from "./testImage";

const API_BASE = "https://testboard.avito.com/api/v1";

export async function createAd(
    request: APIRequestContext,
    token: string,
    {
        title = `Test Ad_${Date.now()}`,
        description = "Описание по умолчанию",
        price = "1",
        quantity = "1",
    }: {
    title?: string;
    description?: string;
    price?: string;
    quantity?: string;
  } = {}
): Promise<string> {
    const formData = await request.fetch(`${API_BASE}/advertisement`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        multipart: {
            title: title,
            description: description,
            price: price,
            quantity: quantity,
            photos: {
                name: "photo.jpg",
                mimeType: "image/jpeg",
                buffer: Buffer.from(TEST_IMAGE_B64.split(",")[1], "base64"),
            },
        },
    });

    expect(formData.ok()).toBeTruthy();
    return (await formData.json()).id;
}

export async function deleteAd(
    request: APIRequestContext,
    token: string,
    adId: string
): Promise<void> {
    const response = await request.delete(
        `${API_BASE}/advertisement?id=${adId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok()) {
        throw new Error(`Не удалось удалить объявление ${adId}: ${response.status()} ${response.statusText()}`);
    }
}

