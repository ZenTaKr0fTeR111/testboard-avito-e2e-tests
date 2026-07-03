import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class MainPage extends BasePage {
    protected pageName = "Главная страница";

    readonly header: Locator;
    readonly mobileMenuButton: Locator;

    readonly loginButtonDesktop: Locator;
    readonly loginButtonMobile: Locator;
    readonly loginModal: Locator;

    readonly myAdsBtn: Locator;
    readonly userMenuBtn: Locator;

    readonly searchBar: Locator;
    readonly emptySearch: Locator;
    readonly adCardPrice: Locator;

    readonly sortButton: Locator;
    readonly sortOptionCheapest: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.locator("header");
        this.mobileMenuButton = page.locator("[data-marker=\"mobile-menu-button\"]");

        this.loginButtonDesktop = page.locator("[data-marker=\"login-button-desktop\"]");
        this.loginButtonMobile = page.locator("[data-marker=\"login-button-mobile\"]");
        this.loginModal = page.locator("[data-marker=\"login-modal-content\"]");

        this.myAdsBtn = page.locator("[data-marker=\"my-ads-link\"]");
        this.userMenuBtn = page.locator("[data-marker=\"user-menu-button\"]");

        this.searchBar = page.locator("[data-marker=\"search-input\"]");
        this.emptySearch = page.getByText(/ничего не найдено/i);
        this.adCardPrice = page.locator("[data-marker=\"ad-card-price\"]");

        this.sortButton = page.locator("[data-marker=\"sort-button\"]");
        this.sortOptionCheapest = page.locator("[data-marker=\"sort-option-cheapest\"]");
    }

    protected root(): Locator {
        return this.header;
    }

    async openMainPage() {
        await this.page.goto("/");
        await this.waitForOpen();
    }

    async openMyAdsPage() {
        await this.myAdsBtn.click();
    }

    async openLoginDesktop() {
        await this.loginButtonDesktop.click();
    }
    async openLoginMobile() {
        await this.loginButtonMobile.click();
    }

    async fillSearchBar(str: string) {
        await this.searchBar.fill(str);
    }

    async applySortByCheapest() {
        await this.sortButton.click();
        await this.sortOptionCheapest.click();
    }

    async getAllPrices(): Promise<number[]> {
        const prices = await this.adCardPrice.allTextContents();
        return prices
            .map(p => parseInt(p.replace(/\D/g, "") || "0", 10))
            .filter(p => !isNaN(p));
    }

    async expectEmptyStateVisible() {
        await expect(this.emptySearch).toBeVisible();
    }

    async assertUserIsLoggedIn() {
        await expect(
            this.userMenuBtn,
            "Пользователь не авторизован")
            .toBeVisible();
    }

    async assertAdNotVisibleById(adId: string) {
        expect(this.page.locator(`a[href$="${adId}"]`)).toHaveCount(0);
    }

    async assertResultsSortedByPriceAsc() {
        const numericPrices = await this.getAllPrices();
        for (let i = 1; i < numericPrices.length; i++) {
            expect(
                numericPrices[i],
                "Объявления не отсортированы по возрастанию")
                .toBeGreaterThanOrEqual(numericPrices[i - 1]);
        }
    }
}
