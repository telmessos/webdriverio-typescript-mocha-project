import { expect } from '@wdio/globals'
import LoginPage from '../../../pageobjects/login.page.ts'
import { addStep } from '@wdio/allure-reporter';

describe('Verify login page elements', () => {
    it('Should login page elements be displayed', async () => {
        addStep('Visiting login page')
        await LoginPage.open();

        addStep('Verify header text is displayed')
        const headerText = await LoginPage.pageHeaderElement.getText();
        await expect(headerText).toEqual(LoginPage.headerText);

        addStep('Verify email, password fields and login button is displayed')
        await LoginPage.verifyLoginElementsDisplayed();

        addStep('Verify footer text is displayed')
        await LoginPage.verifyFooterTextDisplayed();
    })

    it('Should user page elements displayed after login', async () => {

        addStep('Login with admin@admin.com user')
        await LoginPage.login(LoginPage.users.adminUser, LoginPage.users.adminPassword);

        addStep('Verify home, products and contact links displayed')
        await LoginPage.verifyMenuElementsDisplayed();

        addStep('Verify user section displayed')
        await expect(LoginPage.userSection).toBeDisplayed();

        addStep('Verify content text displayed')
        await LoginPage.verifyContentTextDisplayed();

        addStep('Verify footer text is still displayed')
        await LoginPage.verifyFooterTextDisplayed();
    })
})

