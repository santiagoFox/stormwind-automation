const { test, expect } = require('../../fixtures/fixtures');

test.describe('Admin - Manage Library Tests', () => {
    test.beforeEach(async ({ adminManageLibrary }) => {
        await adminManageLibrary.goto();
    });

    test('should display manage library page correctly', async ({ adminManageLibrary }) => {
        const isDisplayed = await adminManageLibrary.isManageLibraryPageDisplayed();
        expect(isDisplayed).toBeTruthy();
    });

    test('should be on the correct manage library URL', async ({ adminManageLibrary }) => {
        const isCorrectURL = await adminManageLibrary.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();
    });

    test('should display add content button', async ({ adminManageLibrary }) => {
        await expect(adminManageLibrary.addContentButton).toBeVisible();
    });

    test('should allow searching for library content', async ({ adminManageLibrary }) => {
        await adminManageLibrary.searchContent('Test Content');
        // Add assertions based on search results
    });

    test('should allow filtering by category', async ({ adminManageLibrary }) => {
        await adminManageLibrary.selectCategory('videos');
        // Add assertions based on filter results
    });

    test('should open add content modal when add button is clicked', async ({ adminManageLibrary }) => {
        await adminManageLibrary.clickAddContent();
        // Add assertions for modal display
    });

    test('should display library table', async ({ adminManageLibrary }) => {
        await expect(adminManageLibrary.libraryTable).toBeVisible();
    });
});
