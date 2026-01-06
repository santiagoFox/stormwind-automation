const BasePage = require('../base.page');

/**
 * StudentLiveScheduleModalPage - Live Schedule Modal (opens on same page)
 * Triggered by clicking "My Live Schedule" in sidebar
 */
class StudentLiveScheduleModalPage extends BasePage {
    constructor(page) {
        super(page);

        // Modal elements
        this.modal = page.locator('[role="dialog"], .modal, [class*="modal"]');
        this.modalTitle = page.getByRole('heading', { name: 'Live Schedule' });
        this.closeButton = page.locator('[role="dialog"] button, .modal button').filter({ has: page.locator('svg, [class*="close"]') }).first();
        this.closeButtonX = page.getByRole('button', { name: /close/i }).or(page.locator('.modal-close, [class*="close"]'));

        // Modal content
        this.noSessionsMessage = page.getByText('You have no upcoming live sessions scheduled.');
        this.sessionsList = page.locator('.sessions-list, [class*="session"]');

        // Sidebar link to open modal
        this.myLiveScheduleLink = page.getByRole('link', { name: 'My Live Schedule' }).or(
            page.getByLabel('Live Schedule')
        );
    }

    async openModal() {
        await this.myLiveScheduleLink.click();
        await this.modal.waitFor({ state: 'visible' });
    }

    async closeModal() {
        // Try clicking X button or any close mechanism
        const closeBtn = this.page.locator('[role="dialog"] button').first();
        if (await closeBtn.isVisible()) {
            await closeBtn.click();
        }
        await this.modal.waitFor({ state: 'hidden' });
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
