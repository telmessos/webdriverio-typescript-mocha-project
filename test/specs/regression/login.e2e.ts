import LoginPage from '../../../pageobjects/login.page.ts';
import { addStep } from '@wdio/allure-reporter';

describe('Verify login page elements', () => {
    it('Should login with Invalid Credentials be unsuccessful', async () => {
        addStep('Visiting login page')
        await LoginPage.open()

        addStep('Login with correct email with wrong password')
        await LoginPage.login(LoginPage.users.adminUser, LoginPage.users.wrongPassword);
        addStep('Verify login inputs are still displayed and user page is not displayed')
        await LoginPage.verifyUserPageIsNotDisplayed();

        addStep('Login with wrong email and wrong password')
        await LoginPage.login(LoginPage.users.wrongUser, LoginPage.users.wrongPassword);
        addStep('Verify login inputs are still displayed and user page is not displayed')
        await LoginPage.verifyUserPageIsNotDisplayed();

        addStep('Login with empty email and password')
        await LoginPage.login('', '');
        addStep('Verify login inputs are still displayed and user page is not displayed')
        await LoginPage.verifyUserPageIsNotDisplayed();

        addStep('Login with a users email with another user\'s password')
        await LoginPage.login(LoginPage.users.adminUser, LoginPage.users.biancunhaPassword);
        addStep('Verify login inputs are still displayed and user page is not displayed')
        await LoginPage.verifyUserPageIsNotDisplayed();

        addStep('Login with valid credentials')
        await LoginPage.login(LoginPage.users.biancunhaUser, LoginPage.users.biancunhaPassword);
        addStep('Verify home, products and contact links, user section, content text, footer text displayed')
        await LoginPage.verifyAllUserPageElementsDisplayed();

        addStep('Navigate to login page again')
        await LoginPage.open();
        addStep('Verify user is still logged in')
        await LoginPage.verifyAllUserPageElementsDisplayed();

        addStep('Refresh login page')
        await browser.refresh();
        addStep('Verify user is still logged in')
        await LoginPage.verifyAllUserPageElementsDisplayed();

        addStep('Click user section (show user) in the top right corner')
        await LoginPage.userSection.click()
        addStep('Verify sign out link displayed')
        await expect(LoginPage.signOutLink).toBeDisplayed();

        addStep('Click sign out link')
        await LoginPage.signOutLink.click()
        addStep('Verify login inputs are displayed and user page is not displayed')
        await LoginPage.verifyUserPageIsNotDisplayed();

        addStep('Refresh page')
        await browser.refresh();
        addStep('Verify login inputs are still displayed')
        await LoginPage.verifyUserPageIsNotDisplayed();
    })
})