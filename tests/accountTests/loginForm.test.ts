import { test, expect } from "@playwright/test";
import {LoginPopupPage} from "../../pages/loginPopupPage/loginPopupPage";
import {MainPage} from "../../pages/mainPage/mainPage";

test.describe("Проверки попапа с авторизацией", () => {
    test("Успешная авторизация", async ({ page }) => {
        //arrange
        const email = process.env.E2E_USER_EMAIL;
        const password = process.env.E2E_USER_PASSWORD;

        if (!email || !password) {
            throw new Error("email or password is not defined in .env");
        }
        
        const loginPopupPage = new LoginPopupPage(page);
        const mainPage = new MainPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.openLoginDesktop();
        await loginPopupPage.fillLogin(email);
        await loginPopupPage.fillPassword(password);
        await loginPopupPage.clickLoginBtn();

        //assert
        await mainPage.assertUserIsLoggedIn();
    });

    test("Переход на регистрацию по кнопке", async ({ page }) => {
        //arrange
        const loginPopup = new LoginPopupPage(page);
        const mainPage = new MainPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.openLoginDesktop();
        await loginPopup.clickRegisterBtn();

        //assert
        await expect(page).toHaveURL("/auth/register");
    });

    test("Логин с пустыми полями не должен увести на главную", async ({ page }) => {
        //arrange
        const loginPopup = new LoginPopupPage(page);
        const mainPage = new MainPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.openLoginDesktop();
        await loginPopup.clickLoginBtn();

        //assert
        await loginPopup.assertEmailErrorIsVisible();
        await loginPopup.assertPasswordErrorIsVisible();
    });
});
