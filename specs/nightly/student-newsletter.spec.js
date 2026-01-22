const { test, expect } = require('../../fixtures/fixtures');

test.describe('Student - Newsletter Link', () => {
    test('should open newsletter in new tab', async ({ studentNewsletter }) => {
        // Navigate to My Classroom first (where sidebar is visible)
        await studentNewsletter.navigation.navigateToMyClassroom();

        // Click newsletter and get the new tab
        const newPage = await studentNewsletter.clickNewsletterAndGetNewTab();

        // Verify the new tab opened to correct domain
        const isCorrectDomain = await studentNewsletter.isOnCorrectDomain(newPage);
        expect(isCorrectDomain).toBeTruthy();

        // Verify URL contains newsletter
        const isNewsletterURL = await studentNewsletter.isNewsletterURL(newPage);
        expect(isNewsletterURL).toBeTruthy();

        // Close the new tab
        await studentNewsletter.closeNewTab(newPage);
    });

    test('should open newsletter from sidebar link', async ({ studentMyClassroom }) => {
        // Navigate to My Classroom
        await studentMyClassroom.navigateFromNav();

        // Click newsletter sidebar link and wait for popup (target="_blank")
        const [newPage] = await Promise.all([
            studentMyClassroom.page.waitForEvent('popup'),
            studentMyClassroom.navigation.sidebarNewsletter.click()
        ]);

        await newPage.waitForLoadState('domcontentloaded');

        // Verify opens to partners.stormwind.com
        expect(newPage.url()).toContain('partners.stormwind.com');
        expect(newPage.url()).toContain('newsletter');

        await newPage.close();
    });
});
