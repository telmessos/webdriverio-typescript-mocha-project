import LoginPage from '../../../pageobjects/login.page.ts';

describe('Verify login page elements', () => {
    it('Should login with Invalid Credentials be unsuccessful', async () => {
        // Visiting login page
        await LoginPage.open()

        // Login with correct email with wrong password
        await LoginPage.login(LoginPage.users.adminUser, LoginPage.users.wrongPassword);
        // Verify login inputs are still displayed and user page is not displayed
        await LoginPage.verifyUserPageIsNotDisplayed();

        // Login with wrong email and wrong password
        await LoginPage.login(LoginPage.users.wrongUser, LoginPage.users.wrongPassword);
        // Verify login inputs are still displayed and user page is not displayed
        await LoginPage.verifyUserPageIsNotDisplayed();

        // Login with empty email and password
        await LoginPage.login('', '');
        // Verify login inputs are still displayed and user page is not displayed
        await LoginPage.verifyUserPageIsNotDisplayed();

        // Login with a users email with another user's password
        await LoginPage.login(LoginPage.users.adminUser, LoginPage.users.biancunhaPassword);
        // Verify login inputs are still displayed and user page is not displayed
        await LoginPage.verifyUserPageIsNotDisplayed();

        // Login with valid credentials
        await LoginPage.login(LoginPage.users.biancunhaUser, LoginPage.users.biancunhaPassword);
        // Verify home, products and contact links, user section, content text, footer text displayed
        await LoginPage.verifyAllUserPageElementsDisplayed();

        // Navigate to login page again
        await LoginPage.open();
        // Verify user is still logged in
        await LoginPage.verifyAllUserPageElementsDisplayed();

        // Refresh login page
        await browser.refresh();
        // Verify user is still logged in
        await LoginPage.verifyAllUserPageElementsDisplayed();

        // Click user section (show user) in the top right corner
        await LoginPage.userSection.click()
        // Verify sign out link displayed
        await expect(LoginPage.signOutLink).toBeDisplayed();

        // Click sign out link
        await LoginPage.signOutLink.click()
        // Verify login inputs are displayed and user page is not displayed
        await LoginPage.verifyUserPageIsNotDisplayed();

        // Refresh page
        await browser.refresh();
        // Verify login inputs are still displayed
        await LoginPage.verifyUserPageIsNotDisplayed();
    })
})