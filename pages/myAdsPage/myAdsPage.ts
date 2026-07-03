import { Locator, Page, expect } from "@playwright/test";
import {BasePage} from "../basePage";
import {AdPage} from "../../pages/myAdsPage/adPage";

export class MyAdsPage extends BasePage {
    protected pageName = "Мои объявления";

    readonly emptyStateTitle: Locator;
    readonly myAdsTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.myAdsTitle = page.locator("[data-marker=\"my-ads-title\"]");
        this.emptyStateTitle = page.locator("[data-marker=\"empty-state-title\"]");
    }

    protected root(): Locator {
        return this.myAdsTitle;
    }

    async openAdById(adId: string): Promise<AdPage> {
        const adLink = this.page.locator(`a[href$="${adId}"]`);
        await expect(adLink).toBeVisible({ timeout: 5000 });
        await adLink.click();
        return new AdPage(this.page);
    }

    async assertEmptyStateTitleIsVisible() {
        await expect(
            this.emptyStateTitle,
            "Заголовок заглушки отсутствия объявлений не отображается")
            .toBeVisible();
    }

    async assertAdNotVisibleById(adId: string) {
        expect(this.page.locator(`a[href$="${adId}"]`)).toHaveCount(0);
    }
}
