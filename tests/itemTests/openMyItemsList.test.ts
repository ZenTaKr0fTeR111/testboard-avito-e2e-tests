import { test } from "../../fixtures/auth.fixture";
import {MyAdsPage} from "../../pages/myAdsPage/myAdsPage";
import {MainPage} from "../../pages/mainPage/mainPage";

test("Открытие страницы Мои объявления", async ({ authedPage }) => {
    //arrange
    const mainPage = new MainPage(authedPage);
    const myAdsPage = new MyAdsPage(authedPage);

    //act
    await mainPage.openMainPage();
    await mainPage.openMyAdsPage();

    //assert
    await myAdsPage.waitForOpen();
});
