import { expect } from '@wdio/globals'
import LoginPage from '../../../pageobjects/login.page.ts'

describe('Verify login page elements', () => {
    it('Should login page elements be displayed', async () => {
        // Visiting login page
        await LoginPage.open();

        // Verify header text is displayed
        const headerText = await LoginPage.pageHeaderElement.getText();
        await expect(headerText).toEqual(LoginPage.headerText);

        // Verify email, password fields and login button is displayed
        await LoginPage.verifyLoginElementsDisplayed();

        // Verify footer text is displayed
        await LoginPage.verifyFooterTextDisplayed();
    })

    it('Should user page elements displayed after login', async () => {

        // Login with admin@admin.com user
        await LoginPage.login(LoginPage.users.adminUser, LoginPage.users.adminPassword);

        // Verify home, products and contact links displayed
        await LoginPage.verifyMenuElementsDisplayed();

        // Verify user section displayed
        await expect(LoginPage.userSection).toBeDisplayed();

        // Verify content text displayed
        await LoginPage.verifyContentTextDisplayed();

        // Verify footer text is still displayed
        await LoginPage.verifyFooterTextDisplayed();
    })
})

