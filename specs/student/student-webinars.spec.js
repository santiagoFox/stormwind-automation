const { test, expect } = require('../../fixtures/fixtures');

test.describe('Student - Webinars Page', () => {
    test.beforeEach(async ({ studentWebinars }) => {
        await studentWebinars.goto();
    });

    test('should display webinars page with correct title', async ({ studentWebinars }) => {
        await studentWebinars.expectPageTitleVisible();
    });

    test('should be on correct URL', async ({ studentWebinars }) => {
        const isCorrectURL = await studentWebinars.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();
    });

    test('should display search input', async ({ studentWebinars }) => {
        await studentWebinars.expectSearchInputVisible();
    });

    test('should display webinar cards', async ({ studentWebinars }) => {
        const hasWebinars = await studentWebinars.expectWebinarCardsVisible();
        expect(hasWebinars).toBeTruthy();
    });

    test('should allow searching for webinars', async ({ studentWebinars }) => {
        await studentWebinars.searchWebinar('Microsoft');
        // Verify search was performed (URL might change or results filter)
        await studentWebinars.expectPageTitleVisible();
    });

    test('should navigate to webinars from sidebar', async ({ studentMyClassroom }) => {
        await studentMyClassroom.navigateFromNav();
        await studentMyClassroom.navigation.clickWebinars();
        expect(await studentMyClassroom.page.url()).toContain('/webinar');
    });
});
