const { test, expect } = require('../../fixtures/fixtures');

// Admin/manager users see more category tabs than students:
// Tabs: All, AI, Business Skills, Cloud, Cybersecurity, Data Science,
//       Desktop Applications, DevOps, Development, IT, Project Management,
//       Ranges, Security Awareness, Skills Assessments, StormWind Internal (15 total)
// AI chips: All, AWS, Azure, ChatGPT, Development, Gemini, General AI,
//           Microsoft Copilot, OpenAI, Project Management, Webinars (11 total)

test.describe('Admin - Course Category Tabs', () => {

    test('should load AI category page with heading, breadcrumb and Admin nav', async ({ adminCategoryTabs }) => {
        // STEP 1: Navigate to AI category page as admin
        await adminCategoryTabs.gotoAICategory();

        // STEP 2: Validate page heading contains "Artificial Intelligence"
        await adminCategoryTabs.expectPageHeading('Artificial Intelligence');

        // STEP 3: Validate breadcrumb Courses link is visible
        await adminCategoryTabs.expectBreadcrumbVisible();

        // STEP 4: Validate search input is present
        await adminCategoryTabs.expectSearchInputVisible();

        // STEP 5: Validate admin navigation bar is visible
        await adminCategoryTabs.expectNavigationVisible();
    });

    test('should display admin-only tabs (Business Skills, Data Science) in initial view', async ({ adminCategoryTabs }) => {
        // STEP 1: Navigate to AI category page
        await adminCategoryTabs.gotoAICategory();

        // STEP 2: Validate scroll chevron is visible (tabs overflow the row)
        await adminCategoryTabs.expectScrollRightVisible();

        // STEP 3: Validate initial visible tabs include admin-only Business Skills and Data Science
        await adminCategoryTabs.expectInitialTabsVisible();
    });

    test('should display all 15 category tabs including admin-only ones', async ({ adminCategoryTabs }) => {
        // STEP 1: Navigate to AI category page
        await adminCategoryTabs.gotoAICategory();

        // STEP 2: Validate all 15 category tabs exist in the DOM
        await adminCategoryTabs.expectAllCategoryTabsVisible();
    });

    test('should reveal StormWind Internal tab and disable right chevron at end of scroll', async ({ adminCategoryTabs }) => {
        // STEP 1: Navigate to AI category page
        await adminCategoryTabs.gotoAICategory();

        // STEP 2: Scroll right to the end of the tab list
        await adminCategoryTabs.scrollToEnd();

        // STEP 3: StormWind Internal tab (admin-only, last tab) is now visible
        await adminCategoryTabs.expectVisible(adminCategoryTabs.categoryTabStormWindInternal);

        // STEP 4: Right chevron is now inactive
        await adminCategoryTabs.expectScrollRightInactive();
    });

    test('should navigate to Cloud category when Cloud tab is clicked', async ({ adminCategoryTabs }) => {
        // STEP 1: Navigate to AI category page
        await adminCategoryTabs.gotoAICategory();

        // STEP 2: Click Cloud category tab
        await adminCategoryTabs.clickCategoryTab(adminCategoryTabs.categoryTabCloud);

        // STEP 3: Validate URL changes away from the AI category page
        expect(adminCategoryTabs.page.url()).toContain('/courses/');
        expect(adminCategoryTabs.page.url()).not.toContain('/courses/170334');
    });

    test('should navigate to Cybersecurity category when Cybersecurity tab is clicked', async ({ adminCategoryTabs }) => {
        // STEP 1: Navigate to AI category page
        await adminCategoryTabs.gotoAICategory();

        // STEP 2: Click Cybersecurity category tab
        await adminCategoryTabs.clickCategoryTab(adminCategoryTabs.categoryTabCybersecurity);

        // STEP 3: Validate URL changes away from the AI category page
        expect(adminCategoryTabs.page.url()).toContain('/courses/');
        expect(adminCategoryTabs.page.url()).not.toContain('/courses/170334');
    });

    test('should display all AI subcategory chips including admin-only ones', async ({ adminCategoryTabs }) => {
        // STEP 1: Navigate to AI category page
        await adminCategoryTabs.gotoAICategory();

        // STEP 2: Validate all 11 AI subcategory chips are visible (admin sees AWS, Azure, Gemini, General AI, OpenAI in addition to student chips)
        await adminCategoryTabs.expectAllAIChipsVisible();
    });

    test('should filter courses when ChatGPT chip is clicked', async ({ adminCategoryTabs }) => {
        // STEP 1: Navigate to AI category page
        await adminCategoryTabs.gotoAICategory();

        // STEP 2: Click ChatGPT subcategory chip
        await adminCategoryTabs.clickChip('ChatGPT');

        // STEP 3: Validate ChatGPT chip is now active
        await adminCategoryTabs.expectChipActive('ChatGPT');

        // STEP 4: Validate course cards are visible after filtering
        await adminCategoryTabs.expectCourseCardsVisible();
    });

    test('should filter courses when General AI chip is clicked', async ({ adminCategoryTabs }) => {
        // STEP 1: Navigate to AI category page
        await adminCategoryTabs.gotoAICategory();

        // STEP 2: Click General AI chip (admin-only chip not visible to students)
        await adminCategoryTabs.clickChip('General AI');

        // STEP 3: Validate General AI chip is now active
        await adminCategoryTabs.expectChipActive('General AI');

        // STEP 4: Validate course cards are visible after filtering
        await adminCategoryTabs.expectCourseCardsVisible();
    });

});
