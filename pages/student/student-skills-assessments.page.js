const BasePage = require('../base.page');
const StudentNavigationPage = require('./student-navigation.page');
const StudentFooterPage = require('./student-footer.page');

/**
 * StudentSkillsAssessmentsPage - Skills Assessments tab page object
 * Uses composition with shared navigation and footer components
 * URL: /skillsassessment
 */
class StudentSkillsAssessmentsPage extends BasePage {
    constructor(page) {
        super(page);

        // Compose shared components
        this.navigation = new StudentNavigationPage(page);
        this.footer = new StudentFooterPage(page);

        // Page heading
        this.pageHeading = page.getByText('Explore Stormwind Skills Assessments.');

        // Search input - using the specific ID from HTML
        this.searchInput = page.locator('input#edit-search-api-fulltext--2, input[placeholder="Search for a skills assessment"]');

        // Assessment cards - use the specific card container class
        this.assessmentCards = page.locator('.course-card--condensed');

        // Card title (for finding specific cards)
        this.cardTitle = page.locator('.course-card__title');

        // Modal elements - based on actual HTML structure
        this.modal = page.locator('.course-preview-modal.modal.show, .modal.show');
        this.modalContainer = page.locator('.course-preview');
        this.modalTitle = page.locator('h5#modalLabel');
        this.modalLevel = this.modalContainer.locator('.dif-time').getByText(/beginner|intermediate|advanced/i);
        this.modalDuration = this.modalContainer.locator('.dif-time').filter({ hasText: /hour|minute/ });
        this.modalOverviewHeading = this.modalContainer.locator('h5.overview, h5:has-text("Overview")');
        this.modalLearnMoreLink = page.locator('a.text-learn-more-preview');
        this.modalAddToClassroomBtn = page.locator('button.js-course-flag.btn-primary');
        this.modalCloseButton = page.locator('a[data-dismiss="modal"][aria-label="Close"]');
    }

    /**
     * Navigate to Skills Assessments page via navigation menu
     */
    async goto() {
        await this.navigation.navigateToSkillsAssessments();
    }

    /**
     * Check if Skills Assessments page is displayed
     * @returns {Promise<boolean>}
     */
    async isSkillsAssessmentsPageDisplayed() {
        return await this.pageHeading.isVisible();
    }

    /**
     * Check if on correct URL
     * @returns {Promise<boolean>}
     */
    async isOnCorrectURL() {
        return this.page.url().includes('/skillsassessment');
    }

    // --- Search Methods ---

    /**
     * Check if search input is visible
     * @returns {Promise<boolean>}
     */
    async isSearchInputVisible() {
        return await this.searchInput.isVisible();
    }

    /**
     * Click on the search input field
     */
    async clickSearchInput() {
        await this.searchInput.click();
    }

    /**
     * Search for an assessment by name
     * @param {string} assessmentName - The assessment name to search for
     */
    async searchAssessment(assessmentName) {
        await this.searchInput.click();
        await this.searchInput.fill(assessmentName);
        // Press Enter to trigger search
        await this.searchInput.press('Enter');
        // Wait for results to load
        await this.page.waitForLoadState('load');
    }

    /**
     * Clear the search input
     */
    async clearSearch() {
        await this.searchInput.clear();
    }

    // --- Assessment Card Methods ---

    /**
     * Get count of assessment cards displayed
     * @returns {Promise<number>}
     */
    async getAssessmentsCount() {
        return await this.assessmentCards.count();
    }

    /**
     * Get a specific assessment card by name using the card title
     * @param {string} assessmentName - The assessment name
     * @returns {Locator}
     */
    getAssessmentCard(assessmentName) {
        return this.page.locator('.course-card__title').filter({ hasText: assessmentName });
    }

    /**
     * Check if a specific assessment card is visible
     * @param {string} assessmentName - The assessment name
     * @returns {Promise<boolean>}
     */
    async isAssessmentCardVisible(assessmentName) {
        const card = this.getAssessmentCard(assessmentName);
        return await card.isVisible();
    }

    /**
     * Click on a specific assessment card to open modal
     * @param {string} assessmentName - The assessment name to click
     */
    async clickAssessment(assessmentName) {
        // Click on the modal-toggle button inside the card
        const cardButton = this.page.locator('button.modal-toggle').filter({ hasText: assessmentName });
        await cardButton.click();
        // Wait for modal to be visible
        await this.modal.waitFor({ state: 'visible' });
    }

    // --- Modal Methods ---

    /**
     * Open assessment modal by clicking on card name
     * @param {string} assessmentName - The assessment name
     */
    async openAssessmentModal(assessmentName) {
        await this.clickAssessment(assessmentName);
    }

    /**
     * Check if modal is visible
     * @returns {Promise<boolean>}
     */
    async isModalVisible() {
        return await this.modal.isVisible();
    }

    /**
     * Get modal title text
     * @returns {Promise<string>}
     */
    async getModalTitle() {
        return await this.modalTitle.textContent();
    }

    /**
     * Close the modal by clicking the X button
     */
    async closeModal() {
        await this.modalCloseButton.click();
        await this.modal.waitFor({ state: 'hidden' });
    }

    // --- Assertions ---

    /**
     * Assert page heading is visible
     */
    async expectPageHeadingVisible() {
        await this.expectVisible(this.pageHeading);
    }

    /**
     * Assert search input is visible
     */
    async expectSearchInputVisible() {
        await this.expectVisible(this.searchInput);
    }

    /**
     * Assert assessment cards are visible
     */
    async expectAssessmentCardsVisible() {
        // Wait for at least one card to appear (cards load asynchronously)
        await this.assessmentCards.first().waitFor({ state: 'visible', timeout: 10000 });
        const count = await this.getAssessmentsCount();
        if (count === 0) {
            throw new Error('No assessment cards found');
        }
    }

    /**
     * Assert specific assessment card is visible
     * @param {string} assessmentName - The assessment name
     */
    async expectAssessmentCardVisible(assessmentName) {
        const card = this.getAssessmentCard(assessmentName);
        await this.expectVisible(card);
    }

    /**
     * Assert navigation bar is visible
     */
    async expectNavigationVisible() {
        await this.navigation.expectMainNavVisible();
    }

    /**
     * Assert all footer links are visible
     */
    async expectAllFooterLinksVisible() {
        await this.footer.expectAllFooterLinksVisible();
    }

    // --- Modal Assertions ---

    /**
     * Assert modal is visible
     */
    async expectModalVisible() {
        await this.expectVisible(this.modal);
    }

    /**
     * Assert modal title matches expected text
     * @param {string} expectedTitle - Expected modal title
     */
    async expectModalTitle(expectedTitle) {
        await this.expectText(this.modalTitle, expectedTitle);
    }

    /**
     * Assert modal level is visible
     */
    async expectModalLevelVisible() {
        await this.expectVisible(this.modalLevel);
    }

    /**
     * Assert modal duration is visible
     */
    async expectModalDurationVisible() {
        await this.expectVisible(this.modalDuration);
    }

    /**
     * Assert modal overview heading is visible
     */
    async expectModalOverviewVisible() {
        await this.expectVisible(this.modalOverviewHeading);
    }

    /**
     * Assert LEARN MORE link is visible
     */
    async expectLearnMoreLinkVisible() {
        await this.expectVisible(this.modalLearnMoreLink);
    }

    /**
     * Assert Add To Classroom button is visible
     */
    async expectAddToClassroomBtnVisible() {
        await this.expectVisible(this.modalAddToClassroomBtn);
    }

    /**
     * Assert modal close button is visible
     */
    async expectModalCloseButtonVisible() {
        await this.expectVisible(this.modalCloseButton);
    }

    /**
     * Assert all modal elements are visible
     * @param {string} expectedTitle - Expected modal title
     */
    async expectAllModalElementsVisible(expectedTitle) {
        await this.expectModalVisible();
        await this.expectModalTitle(expectedTitle);
        await this.expectModalLevelVisible();
        await this.expectModalDurationVisible();
        await this.expectModalOverviewVisible();
        await this.expectLearnMoreLinkVisible();
        await this.expectAddToClassroomBtnVisible();
        await this.expectModalCloseButtonVisible();
    }

    /**
     * Assert modal is closed/hidden
     */
    async expectModalHidden() {
        await this.expectHidden(this.modal);
    }
}

module.exports = StudentSkillsAssessmentsPage;
