const { test, expect } = require('../../fixtures/fixtures');

test.describe('Admin - Assessments Tests', () => {
    test.beforeEach(async ({ adminAssessments }) => {
        await adminAssessments.goto();
    });

    test('should display assessments page correctly', async ({ adminAssessments }) => {
        const isDisplayed = await adminAssessments.isAssessmentsPageDisplayed();
        expect(isDisplayed).toBeTruthy();
    });

    test('should be on the correct assessments URL', async ({ adminAssessments }) => {
        const isCorrectURL = await adminAssessments.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();
    });

    test('should display create assessment button', async ({ adminAssessments }) => {
        await expect(adminAssessments.createAssessmentButton).toBeVisible();
    });

    test('should allow searching for assessments', async ({ adminAssessments }) => {
        await adminAssessments.searchAssessment('Test Assessment');
        // Add assertions based on search results
    });

    test('should open create assessment modal when create button is clicked', async ({ adminAssessments }) => {
        await adminAssessments.clickCreateAssessment();
        // Add assertions for modal display
    });

    test('should display assessments table', async ({ adminAssessments }) => {
        await expect(adminAssessments.assessmentsTable).toBeVisible();
    });

    test('should allow viewing assessment details', async ({ adminAssessments }) => {
        // This assumes there's an assessment available
        // await adminAssessments.viewAssessment('Sample Assessment');
        // Add assertions for assessment details view
    });
});
