import { $, expect } from '@wdio/globals'
import Page from './page';

/**
 * sub-page containing specific selectors, static texts and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define static texts below here
     */
    readonly headerText = 'Automation doesn\'t stop at testing, it\'s just a beginning!';
    readonly footerText = 'Thank you for participating!';
    readonly contentParagraphOne = 'Lorem ipsum egestas posuere vivamus neque facilisis augue cursus litora rhoncus aenean aptent eu quis, odio scelerisque curabitur rhoncus sociosqu velit curae ipsum duis porttitor rhoncus amet. consectetur nostra massa molestie sed imperdiet nulla mauris in cras mauris lobortis feugiat, quis sem sagittis tortor diam vehicula habitant primis ultricies platea et. amet aliquet nisi proin volutpat sapien eget, tincidunt nisl neque habitant tellus, mi commodo congue habitasse est. etiam imperdiet quisque sociosqu vivamus ut libero nibh fames, nullam eleifend adipiscing iaculis faucibus nulla dolor varius, curae sollicitudin habitant aliquet nam quis neque.';
    readonly contentParagraphTwo = 'Tempus ultrices euismod eros libero posuere aliquam dui dictum hac integer, orci pretium aptent pellentesque aenean conubia vulputate orci rutrum neque phasellus, netus risus tellus nullam aenean tristique tempor donec nisl. habitant purus et luctus faucibus at pretium integer feugiat, felis pulvinar ut accumsan quisque fermentum non, curabitur purus egestas eu lobortis posuere feugiat. velit enim ultricies sollicitudin scelerisque sit vivamus nisi, tortor massa neque pretium cursus curabitur nullam dapibus, sem tristique elit adipiscing curabitur consequat. elit mi sagittis elit ad sociosqu erat vitae etiam curabitur platea, tincidunt pellentesque euismod quis feugiat sagittis vehicula rutrum inceptos, sociosqu donec imperdiet aenean eleifend auctor mauris arcu vestibulum.';
    readonly contentParagraphThree = 'Mauris aptent nunc per sociosqu placerat nisi sociosqu accumsan fermentum, habitant lacus massa metus cras malesuada rhoncus ut, imperdiet et taciti malesuada mollis tincidunt etiam quis. est non laoreet dictum senectus fames velit nulla mi, nam ipsum scelerisque sodales tellus ligula enim leo proin, lectus sodales platea feugiat condimentum donec orci. nisi potenti cras curae sollicitudin fames semper at morbi magna aenean donec, sodales cursus justo phasellus consequat congue luctus leo proin. sagittis dapibus viverra maecenas porta gravida, fermentum quisque donec porttitor, sit posuere ullamcorper lacinia. ac odio et nulla nisi potenti aliquet tristique, ac netus accumsan quis tortor non arcu cubilia, ante nec varius pretium justo donec.';

    public get users() {
        return {
            adminUser: "admin@admin.com",
            adminPassword: "2020",
            biancunhaUser: "biancunha@gmail.com",
            biancunhaPassword: "123456",
            growdevUser: "growdev@growdev.com.br",
            growdevPassword: "growdev123",
            wrongUser: "wronguser@gmail.com",
            wrongPassword: "dummyPassword",
        }
    }


    /**
     * define selectors using getter methods below here
     */
    public get pageHeaderElement() {
        return $('section[id="login"]').$('h1[style="background-color:darkolivegreen;"]');
    }

    public get inputEmail() {
        return $('#email');
    }

    public get inputPassword() {
        return $('#password');
    }

    public get submitButton() {
        return $('input[id="login"]');
    }

    public get footerTextElement() {
        return $('//footer/p')
    }

    public get homeLink() {
        return $('nav[id="navigation"]').$('div*=Home');
    }

    public get productsLink() {
        return $('nav[id="navigation"]').$('div*=Products');
    }

    public get contactLink() {
        return $('nav[id="navigation"]').$('div*=Contact');
    }

    public get userSection() {
        return $('section[id="user"]');
    }

    public get sectionParagraphs() {
        return $$('section[id="content"] div')[0];
    }

    public get signOutLink() {
        return $('div[id="logout"]');
    }


    /**
     * define the page methods below here
     */


    /**
     * Login method getting email and password as string and clicks on submit button
     */
    public async login(email: string, password: string) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.submitButton.moveTo();
        await this.submitButton.click();
    }

    /**
     * Verification method that verifies email, password input fields and submit button displayed
     */
    public async verifyLoginElementsDisplayed() {
        await expect(this.inputEmail).toBeDisplayed();
        await expect(this.inputPassword).toBeDisplayed();
        await expect(this.submitButton).toBeDisplayed();
    }

    /**
     * Verification method that verifies home, products and contact links displayed
     */
    public async verifyMenuElementsDisplayed() {
        await expect(this.homeLink).toBeDisplayed();
        await expect(this.productsLink).toBeDisplayed();
        await expect(this.contactLink).toBeDisplayed();
    }

    public async verifyFooterTextDisplayed() {
        const footerText = await this.footerTextElement.getText();
        await expect(footerText).toEqual(this.footerText);
    }

    /**
     * Verification method that verifies content text displayed
     */
    public async verifyContentTextDisplayed() {
        // Assigning content area to a variable
        const parahraphText = await this.sectionParagraphs;

        // Getting the value of first paragraph and verify
        let textToCheck = await parahraphText.$$('p')[0].getText()
        await expect(textToCheck).toContain(this.contentParagraphOne);

        // Getting the value of second paragraph and verify
        textToCheck = await parahraphText.$$('p')[1].getText()
        await expect(textToCheck).toContain(this.contentParagraphTwo);

        // Getting the value of third paragraph and verify
        textToCheck = await parahraphText.$$('p')[2].getText()
        await expect(textToCheck).toContain(this.contentParagraphThree);
    }

    public async verifyUserPageIsNotDisplayed() {
        // await browser.pause(3000);
        await expect(this.inputEmail).toBeDisplayed();
        await expect(this.inputPassword).toBeDisplayed();
        await expect(this.submitButton).toBeDisplayed();
        await expect(this.homeLink).not.toBeDisplayed();
        await expect(this.productsLink).not.toBeDisplayed();
        await expect(this.contactLink).not.toBeDisplayed();
        await expect(this.userSection).not.toBeDisplayed();
    }

    public async verifyAllUserPageElementsDisplayed() {
        await this.verifyMenuElementsDisplayed();
        await expect(this.userSection).toBeDisplayed();
        await this.verifyContentTextDisplayed();
        await this.verifyFooterTextDisplayed();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('');
    }
}

export default new LoginPage();
