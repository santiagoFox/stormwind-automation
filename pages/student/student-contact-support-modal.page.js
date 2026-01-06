const BasePage = require('../base.page');

/**
 * StudentContactSupportModalPage - Contact Support Modal (opens on same page)
 * Triggered by clicking "Contact Support" in sidebar
 */
class StudentContactSupportModalPage extends BasePage {
    constructor(page) {
        super(page);

        // Modal elements
        this.modal = page.locator('[role="dialog"], .modal, [class*="modal"]');
        this.modalTitle = page.getByRole('heading', { name: 'Contact Support' });
        this.modalSubtitle = page.getByText('Hi, how can we help you?');
        this.closeButton = page.locator('[role="dialog"] button').filter({ has: page.locator('svg, [class*="close"]') }).first();

        // Form elements
        this.messageTextbox = page.getByRole('textbox', { name: 'Hi, how can we help you?' });
        this.requestButton = page.locator('div').filter({ hasText: /^Request$/ }).first();

        // Sidebar link to open modal
        this.contactSupportLink = page.getByRole('link', { name: ' Contact Support' }).first();
    }

    async openModal() {
        await this.contactSupportLink.click();
        await this.modal.waitFor({ state: 'visible' });
    }

    async closeModal() {
        const closeBtn = this.page.locator('[role="dialog"] button').first();
        if (await closeBtn.isVisible()) {
            await closeBtn.click();
        }
        await this.modal.waitFor({ state: 'hidden' });
    }

    async fillMessage(text) {
        await this.messageTextbox.fill(text);
    }

    async clickRequest() {
        await this.requestButton.click();
    }

    async submitSupportRequest(message) {
        await this.fillMessage(message);
        await this.clickRequest();
    }

    async isModalOpen() {
        return await this.modal.isVisible();
    }

    async isModalClosed() {
        return await this.modal.isHidden();
    }

    // Assertions
    async expectModalVisible() {
        await this.expectVisible(this.modal);
    }

    async expectModalTitleVisible() {
        await this.expectVisible(this.modalTitle);
    }

    async expectModalSubtitleVisible() {
        await this.expectVisible(this.modalSubtitle);
    }

    async expectTextboxVisible() {
        await this.expectVisible(this.messageTextbox);
    }

    async expectRequestButtonVisible() {
        await this.expectVisible(this.requestButton);
    }

    async expectModalClosed() {
        await this.expectHidden(this.modal);
    }

    /**
     * Verify modal opened correctly with all elements
     */
    async verifyModalOpened() {
        await this.expectModalVisible();
        await this.expectModalTitleVisible();
        await this.expectModalSubtitleVisible();
        await this.expectTextboxVisible();
        await this.expectRequestButtonVisible();
    }
}

module.exports = StudentContactSupportModalPage;
