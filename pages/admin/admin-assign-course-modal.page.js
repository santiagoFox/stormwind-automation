const BasePage = require('../base.page');

/**
 * AdminAssignCourseModalPage - Assign Course modal for managers
 * Allows assigning courses to students with optional due dates
 */
class AdminAssignCourseModalPage extends BasePage {
    constructor(page) {
        super(page);

        // Modal container
        this.modal = page.locator('.modal.show, .modal[style*="display: block"]');
        this.modalTitle = page.getByRole('heading', { name: 'Assign Course' });
        this.closeButton = page.locator('.modal.show button.close, .modal.show [aria-label="Close"]');

        // Search input
        this.searchInput = this.modal.locator('input[type="search"], input[type="text"]').first();

        // Warning message (existing due date)
        // <div id="discover-assign-already-exist" class="alert assign-existing-due-date-alert">
        this.warningMessage = page.locator('#discover-assign-already-exist, .assign-existing-due-date-alert');
        this.warningMessageText = page.locator('.existing-due-date-message');

        // Error message (red - license issue)
        // <div id="discover-add-course-message-invalid" class="alert discover-add-course-message-invalid">
        this.errorMessage = page.locator('#discover-add-course-message-invalid, .discover-add-course-message-invalid');
        this.errorMessageText = page.locator('#manager-modal-success-message-text');

        // Select All row
        this.selectAllCheckbox = this.modal.locator('text=Select All').locator('..').locator('input[type="checkbox"]');
        this.selectAllDateInput = this.modal.locator('text=For all students').locator('..').locator('input[type="date"]');

        // Student rows container
        this.studentRows = page.locator('.student-assign-container');

        // Assign Course button in modal
        // <button class="btn add-assign-course btn-primary">
        this.assignCourseBtn = page.locator('button.add-assign-course');
    }

    /**
     * Wait for modal to be visible
     */
    async waitForModal() {
        await this.modal.waitFor({ state: 'visible', timeout: 10000 });
    }

    /**
     * Search for students in the modal
     * @param {string} searchText - Text to search for
     */
    async searchStudents(searchText) {
        await this.searchInput.fill(searchText);
        // Wait for search results to load
        await this.page.waitForTimeout(500);
    }

    /**
     * Get a student row by name
     * @param {string} studentName - Name of the student
     * @returns {Locator} Student row locator
     */
    getStudentRow(studentName) {
        return this.studentRows.filter({ hasText: studentName });
    }

    /**
     * Get checkbox for a specific student
     * @param {string} studentName - Name of the student
     * @returns {Locator} Checkbox locator
     */
    getStudentCheckbox(studentName) {
        return this.getStudentRow(studentName).locator('input[type="checkbox"]');
    }

    /**
     * Get date input for a specific student
     * @param {string} studentName - Name of the student
     * @returns {Locator} Date input locator
     */
    getStudentDateInput(studentName) {
        return this.getStudentRow(studentName).locator('input[type="date"], input.modal-student-due-date-field');
    }

    /**
     * Select a student by checking their checkbox
     * @param {string} studentName - Name of the student
     */
    async selectStudent(studentName) {
        const checkbox = this.getStudentCheckbox(studentName);
        await checkbox.check();
    }

    /**
     * Deselect a student by unchecking their checkbox
     * @param {string} studentName - Name of the student
     */
    async deselectStudent(studentName) {
        const checkbox = this.getStudentCheckbox(studentName);
        await checkbox.uncheck();
    }

    /**
     * Set due date for a specific student
     * @param {string} studentName - Name of the student
     * @param {string} date - Date in format YYYY-MM-DD
     */
    async setStudentDueDate(studentName, date) {
        const dateInput = this.getStudentDateInput(studentName);
        await dateInput.fill(date);
    }

    /**
     * Set due date to today for a specific student
     * @param {string} studentName - Name of the student
     */
    async setStudentDueDateToToday(studentName) {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        await this.setStudentDueDate(studentName, today);
    }

    /**
     * Clear due date for a specific student
     * @param {string} studentName - Name of the student
     */
    async clearStudentDueDate(studentName) {
        const dateInput = this.getStudentDateInput(studentName);
        await dateInput.clear();
    }

    /**
     * Click the Assign Course button in modal
     */
    async clickAssignCourse() {
        await this.assignCourseBtn.click();
        await this.page.waitForTimeout(500);
    }

    /**
     * Close the modal
     */
    async closeModal() {
        await this.closeButton.click();
        await this.modal.waitFor({ state: 'hidden' });
    }

    /**
     * Check if warning message is visible
     * @returns {Promise<boolean>}
     */
    async isWarningMessageVisible() {
        return await this.warningMessage.isVisible();
    }

    /**
     * Check if error message is visible
     * @returns {Promise<boolean>}
     */
    async isErrorMessageVisible() {
        return await this.errorMessage.isVisible();
    }

    /**
     * Get warning message text
     * @returns {Promise<string>}
     */
    async getWarningMessageText() {
        return await this.warningMessage.textContent();
    }

    /**
     * Get error message text
     * @returns {Promise<string>}
     */
    async getErrorMessageText() {
        return await this.errorMessage.textContent();
    }

    // --- Assertions ---

    /**
     * Assert modal is visible
     */
    async expectModalVisible() {
        await this.expectVisible(this.modal);
        await this.expectVisible(this.modalTitle);
    }

    /**
     * Assert warning message is visible with expected text
     * @param {string} expectedStudentName - Student name expected in warning
     */
    async expectWarningMessageVisible(expectedStudentName = null) {
        await this.expectVisible(this.warningMessage);
        if (expectedStudentName) {
            const text = await this.getWarningMessageText();
            if (!text.includes(expectedStudentName)) {
                throw new Error(`Warning message does not contain "${expectedStudentName}". Actual: ${text}`);
            }
        }
    }

    /**
     * Assert warning message is NOT visible
     */
    async expectWarningMessageHidden() {
        await this.expectHidden(this.warningMessage);
    }

    /**
     * Assert error message is visible with expected text
     * @param {string} expectedUserName - User name expected in error
     */
    async expectErrorMessageVisible(expectedUserName = null) {
        await this.expectVisible(this.errorMessage);
        if (expectedUserName) {
            const text = await this.getErrorMessageText();
            if (!text.includes(expectedUserName)) {
                throw new Error(`Error message does not contain "${expectedUserName}". Actual: ${text}`);
            }
        }
    }

    /**
     * Assert error message is NOT visible
     */
    async expectErrorMessageHidden() {
        await this.expectHidden(this.errorMessage);
    }

    /**
     * Assert student is visible in the list
     * @param {string} studentName - Name of the student
     */
    async expectStudentVisible(studentName) {
        const row = this.getStudentRow(studentName);
        await this.expectVisible(row);
    }

    /**
     * Assert Assign Course button is visible
     */
    async expectAssignCourseBtnVisible() {
        await this.expectVisible(this.assignCourseBtn);
    }
}

module.exports = AdminAssignCourseModalPage;
