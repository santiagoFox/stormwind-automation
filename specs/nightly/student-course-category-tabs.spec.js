const { test, expect } = require('../../fixtures/fixtures');

// Tests for the category tabs row on the AI category page (/courses/170334).
// The category tabs (All, AI, Cloud, Cybersecurity, etc.) are currently broken —
// clicking them does not navigate to the respective category. These tests document
// the regression and will start passing once the feature is fixed.

test.describe('Student - Course Category Tabs', () => {

    test('should load AI category page with heading, breadcrumb and search input', async ({ studentCategoryTabs }) => {
        // STEP 1: Navigate to AI category page
        await studentCategoryTabs.gotoAICategory();

        // STEP 2: Validate page heading contains "Artificial Intelligence"
        await studentCategoryTabs.expectPageHeading('Artificial Intelligence');

        // STEP 3: Validate breadcrumb Courses link is visible
        await studentCategoryTabs.expectBreadcrumbVisible();

        // STEP 4: Validate search input is present
        await studentCategoryTabs.expectSearchInputVisible();

        // STEP 5: Validate main navigation is visible
        await studentCategoryTabs.expectNavigationVisible();
    });

    test('should display all category tabs below search box', async ({ studentCategoryTabs }) => {
        // STEP 1: Navigate to AI category page
        await studentCategoryTabs.gotoAICategory();

        // STEP 2: Validate all 9 category tabs are visible (currently broken)
        await studentCategoryTabs.expectAllCategoryTabsVisible();
    });

    test('should navigate to Cloud category when Cloud tab is clicked', async ({ studentCategoryTabs }) => {
        // STEP 1: Navigate to AI category page
        await studentCategoryTabs.gotoAICategory();

        // STEP 2: Click Cloud category tab
        await studentCategoryTabs.clickCategoryTab(studentCategoryTabs.categoryTabCloud);

        // STEP 3: Validate URL changes away from the AI category page
        expect(studentCategoryTabs.page.url()).toContain('/courses/');
        expect(studentCategoryTabs.page.url()).not.toContain('/courses/170334');
    });

    test('should navigate to Cybersecurity category when Cybersecurity tab is clicked', async ({ studentCategoryTabs }) => {
        // STEP 1: Navigate to AI category page
        await studentCategoryTabs.gotoAICategory();

        // STEP 2: Click Cybersecurity category tab
        await studentCategoryTabs.clickCategoryTab(studentCategoryTabs.categoryTabCybersecurity);

        // STEP 3: Validate URL changes away from the AI category page
        expect(studentCategoryTabs.page.url()).toContain('/courses/');
        expect(studentCategoryTabs.page.url()).not.toContain('/courses/170334');
    });

    test('should navigate to DevOps category when DevOps tab is clicked', async ({ studentCategoryTabs }) => {
        // STEP 1: Navigate to AI category page
        await studentCategoryTabs.gotoAICategory();

        // STEP 2: Click DevOps category tab
        await studentCategoryTabs.clickCategoryTab(studentCategoryTabs.categoryTabDevOps);

        // STEP 3: Validate URL changes away from the AI category page
        expect(studentCategoryTabs.page.url()).toContain('/courses/');
        expect(studentCategoryTabs.page.url()).not.toContain('/courses/170334');
    });

    test('should display all AI subcategory chips', async ({ studentCategoryTabs }) => {
        // STEP 1: Navigate to AI category page
        await studentCategoryTabs.gotoAICategory();

        // STEP 2: Validate all AI subcategory chips are visible
        await studentCategoryTabs.expectAllAIChipsVisible();
    });

    test('should filter courses when ChatGPT chip is clicked', async ({ studentCategoryTabs }) => {
        // STEP 1: Navigate to AI category page
        await studentCategoryTabs.gotoAICategory();

        // STEP 2: Click ChatGPT subcategory chip
        await studentCategoryTabs.clickChip('ChatGPT');

        // STEP 3: Validate ChatGPT chip is now active
        await studentCategoryTabs.expectChipActive('ChatGPT');

        // STEP 4: Validate course cards are visible after filtering
        await studentCategoryTabs.expectCourseCardsVisible();
    });

    test('should filter courses when Microsoft Copilot chip is clicked', async ({ studentCategoryTabs }) => {
        // STEP 1: Navigate to AI category page
        await studentCategoryTabs.gotoAICategory();

        // STEP 2: Click Microsoft Copilot subcategory chip
        await studentCategoryTabs.clickChip('Microsoft Copilot');

        // STEP 3: Validate Microsoft Copilot chip is now active
        await studentCategoryTabs.expectChipActive('Microsoft Copilot');

        // STEP 4: Validate course cards are visible after filtering
        await studentCategoryTabs.expectCourseCardsVisible();
    });

});
