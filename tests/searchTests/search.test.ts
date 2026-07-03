import { test } from "../../fixtures/auth.fixture";
import {MainPage} from "../../pages/mainPage/mainPage";
import {createAd, deleteAd} from "../../helpers/adApiHelper";

// список созданных в процессе тестирования объявлений, очищается по окончанию тестирования
let adsToRemove: string[] = [];

test.describe("Проверки поиска", () => {
    test("Успешный поиск с фильтрами", async ({ authedPage, auth }) => {
        const title = `TestLaptop_${Date.now()}`;
        const cheapAdId = await createAd(authedPage.request, auth.token, { title, price: "1000" });
        const middleAdId = await createAd(authedPage.request, auth.token, { title, price: "1500" });
        const expensiveAdId = await createAd(authedPage.request, auth.token, { title, price: "2000" });

        adsToRemove.push(cheapAdId, middleAdId, expensiveAdId);
        
        const mainPage = new MainPage(authedPage);
        await mainPage.fillSearchBar(title);
        await mainPage.applySortByCheapest();
        
        await mainPage.assertResultsSortedByPriceAsc();
    });

    test("Поиск несуществующего товара", async ({ page }) => {
        const mainPage = new MainPage(page);
        const garbageInput = `jewfkmvlf,vle,rlgm${Date.now()}ojopa,pgr,gp,;x,xp,fld;,v;,mrmgmwopl,vmsh2nv6843*${Date.now()}f`;

        await mainPage.openMainPage();
        mainPage.fillSearchBar(garbageInput);

        await mainPage.expectEmptyStateVisible();
    });

    test.afterEach(async ({ request, auth }) => {
        for (const adId of adsToRemove) {
            try {
                await deleteAd(request, auth.token, adId);
            } catch (err) {
                console.warn(`Не удалось удалить объявление ${adId}:`, err);
            }
        }
        adsToRemove = [];
    });
});
