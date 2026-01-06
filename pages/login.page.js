const BasePage = require('./base.page');
const URLS = require('../data/urls');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        // Modern locators using Playwright's recommended strategies
        this.emailInput = page.locator('#email-only');
        this.enterButton = page.getByRole('button', { name: 'Enter' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.errorMessage = page.locator('.error-message');
    }

    async goto() {
        await this.navigate(URLS.LOGIN);
    }

    async login(email, password) {
        // Step 1: Enter email and click Enter button
        await this.emailInput.fill(email);
        await this.enterButton.click();

        // Step 2: Wait for password field and enter password
        await this.passwordInput.waitFor({ state: 'visible' });
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async enterEmail(email) {
        await this.emailInput.fill(email);
        await this.enterButton.click();
    }

    async enterPassword(password) {
        await this.passwordInput.waitFor({ state: 'visible' });
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async isErrorMessageDisplayed() {
        return await this.errorMessage.isVisible();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async expectErrorMessage(expectedText) {
        await this.expectVisible(this.errorMessage);
        await this.expectText(this.errorMessage, expectedText);
    }
}

module.exports = LoginPage;
