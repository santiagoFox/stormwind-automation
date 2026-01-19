const { test, expect } = require('../../fixtures/fixtures');

/**
 * Admin - Skills Assessments Data Page Tests
 * Tests the Skills Assessments Data page metadata (labels, buttons, sections)
 * URL: /team/{teamId}/skills-assessment/{userId}
 * Note: Does NOT validate numeric values (scores, counts) as they vary
 */
test.describe('Admin - Skills Assessments Data Page', () => {

    test('should validate complete skills assessments data page metadata', async ({ adminSkillsAssessmentsData }) => {
        // 1. Navigate to Skills Assessments Data page
        await adminSkillsAssessmentsData.goto();

        // 2. Validate we're on the correct URL
        const isCorrectURL = await adminSkillsAssessmentsData.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();

        // 3. Validate navigation is visible
        await adminSkillsAssessmentsData.expectNavigationVisible();

        // 4. Validate admin sub-navigation is visible
        await adminSkillsAssessmentsData.expectAdminSubNavVisible();

        // 5. Validate page title is visible
        await adminSkillsAssessmentsData.expectPageTitleVisible();

        // 6. Validate VIEW SKILLS ASSESSMENTS button is visible
        await adminSkillsAssessmentsData.expectViewSkillsAssessmentsBtnVisible();

        // 7. Validate Most Popular Skills Assessment section metadata
        // - Most Popular Skills Assessment label
        // - Average Score label
        // - Total Completed label
        await adminSkillsAssessmentsData.expectMostPopularSectionVisible();

        // 8. Validate Skills Assessment Details section metadata
        // - Skills Assessment Details heading
        // - Search input
        // - Assessments table
        await adminSkillsAssessmentsData.expectDetailsSectionVisible();

        // 9. Validate footer links
        await adminSkillsAssessmentsData.expectAllFooterLinksVisible();
    });

});
