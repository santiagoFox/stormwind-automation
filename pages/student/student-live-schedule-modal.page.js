const BasePage = require('../base.page');

/**
 * StudentLiveScheduleModalPage - Live Schedule Modal (opens on same page)
 * Triggered by clicking "My Live Schedule" in sidebar
 */
class StudentLiveScheduleModalPage extends BasePage {
    constructor(page) {
        super(page);

        // Modal elements - specific to Live Schedule modal
        this.modal = page.locator('#liveScheduleModal');
        this.modalTitle = this.modal.locator('.modal-title');
        this.closeButton = this.modal.locator('a[data-dismiss="modal"]');

        // Modal content
        this.noSessionsMessage = this.modal.getByText(/no upcoming live sessions/i);
        this.sessionsList = this.modal.locator('.modal-body');

        // Sidebar link to open modal
        this.myLiveScheduleLink = page.getByRole('link', { name: ' My Live Schedule' }).first();
    }

    async openModal() {
        await this.myLiveScheduleLink.click();
        await this.modal.waitFor({ state: 'visible' });
    }

    async closeModal() {
        // Try close button first, then Escape key as fallback
        if (await this.closeButton.isVisible()) {
            await this.closeButton.click();
        } else {
            await this.page.keyboard.press('Escape');
        }
        await this.modal.waitFor({ state: 'hidden', timeout: 5000 });
    }

    async isModalOpen() {
        return await this.modal.isVisible();
    }

    async isModalClosed() {
        return await this.modal.isHidden();
    }

    // URL verification - should stay on same page
    isOnMyClassroomURL() {
        return this.page.url().includes('my_classroom');
    }

    // Assertions
    async expectModalVisible() {
        await this.expectVisible(this.modal);
    }

    async expectModalTitleVisible() {
        await this.expectVisible(this.modalTitle);
    }

    async expectNoSessionsMessageVisible() {
        await this.expectVisible(this.noSessionsMessage);
    }

    async expectModalClosed() {
        await this.expectHidden(this.modal);
    }

    /**
     * Verify modal opened correctly
     */
    async verifyModalOpened() {
        await this.expectModalVisible();
        await this.expectModalTitleVisible();
    }
}

module.exports = StudentLiveScheduleModalPage;
