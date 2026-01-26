import {Locator, Page} from "@playwright/test";
import {BasePage} from "../basePage";

export class AdPage extends BasePage {
    protected pageName = "Объявление";

    readonly deleteAdButton: Locator;
    readonly deleteAdConfirmButton: Locator;
    readonly adTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.adTitle = page.locator("[data-marker=\"ad-title\"]");
        this.deleteAdButton = page.locator("[data-marker=\"ad-actions-delete-button\"]");
        this.deleteAdConfirmButton = page.locator("[data-marker=\"delete-modal-confirm\"]");
    }

    protected root(): Locator {
        return this.adTitle;
    }

    async deleteAd() {
        await this.deleteAdButton.click();
        await this.deleteAdConfirmButton.click();
    }
}
