const { test, expect } = require('../../fixtures/fixtures');

/**
 * Student - Skills Assessments Page Tests
 * All validations run in a single test to avoid multiple logins
 */
test.describe('Student - Skills Assessments Page', () => {

    test('should validate Skills Assessments page elements, search, modal and footer', async ({ studentSkillsAssessments }) => {
        // Navigate to Skills Assessments page
        await studentSkillsAssessments.goto();

        // 1. Validate URL
        const isCorrectURL = await studentSkillsAssessments.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();
        expect(studentSkillsAssessments.page.url()).toContain('/skillsassessment');

        // 2. Validate page heading
        await studentSkillsAssessments.expectPageHeadingVisible();

        // 3. Validate navigation bar is visible
        await studentSkillsAssessments.expectNavigationVisible();

        // 4. Validate search input is visible
        await studentSkillsAssessments.expectSearchInputVisible();

        // 5. Validate clicking on search input field focuses it
        await studentSkillsAssessments.clickSearchInput();
        await expect(studentSkillsAssessments.searchInput).toBeFocused();

        // 6. Validate assessment cards are displayed
        await studentSkillsAssessments.expectAssessmentCardsVisible();

        // 7. Search for "Computer Hardware Support"
        await studentSkillsAssessments.searchAssessment('Computer Hardware Support');

        // Verify search input has the correct value
        await expect(studentSkillsAssessments.searchInput).toHaveValue('Computer Hardware Support');

        // Wait for search results to filter
        await studentSkillsAssessments.page.waitForTimeout(1000);

        // Verify the matching assessment card is visible
        await studentSkillsAssessments.expectAssessmentCardVisible('Computer Hardware Support');

        // 8. Click on assessment card to open modal
        await studentSkillsAssessments.openAssessmentModal('Computer Hardware Support');

        // 9. Validate modal elements
        await studentSkillsAssessments.expectModalVisible();
        await studentSkillsAssessments.expectModalTitle('Computer Hardware Support');
        await studentSkillsAssessments.expectModalLevelVisible();
        await studentSkillsAssessments.expectModalDurationVisible();
        await studentSkillsAssessments.expectModalOverviewVisible();
        await studentSkillsAssessments.expectLearnMoreLinkVisible();
        await studentSkillsAssessments.expectAddToClassroomBtnVisible();
        await studentSkillsAssessments.expectModalCloseButtonVisible();

        // 10. Close the modal by clicking the X button
        await studentSkillsAssessments.closeModal();

        // 11. Verify modal is closed
        await studentSkillsAssessments.expectModalHidden();

        // 12. Validate footer with all links (Explore, Contact, About sections)
        await studentSkillsAssessments.expectAllFooterLinksVisible();
    });

});
