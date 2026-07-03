import { test } from "../../fixtures/auth.fixture";
import {MyAdsPage} from "../../pages/myAdsPage/myAdsPage";
import {MainPage} from "../../pages/mainPage/mainPage";
import {createAd} from "../../helpers/adApiHelper";

test.describe("Проверки моих объявлений", () => {
    test("Открытие страницы Мои объявления", async ({ authedPage}) => {
        //arrange
        const mainPage = new MainPage(authedPage);
        const myAdsPage = new MyAdsPage(authedPage);

        //act
        await mainPage.openMainPage();
        await mainPage.openMyAdsPage();

        //assert
        await myAdsPage.waitForOpen();
    });

    test("Удаление личного объявления", async ({ authedPage, auth}) => {
        //arrange
        const mainPage = new MainPage(authedPage);
        const myAdsPage = new MyAdsPage(authedPage);

        const aid = await createAd(authedPage.request, auth.token);

        //act
        await mainPage.openMainPage();
        await mainPage.openMyAdsPage();

        const adPage = await myAdsPage.openAdById(aid);
        await adPage.deleteAd();

        //assert
        await myAdsPage.assertAdNotVisibleById(aid);
        await mainPage.assertAdNotVisibleById(aid);
    });
});
