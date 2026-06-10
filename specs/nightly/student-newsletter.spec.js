const { test, expect } = require('../../fixtures/fixtures');

test.describe('Student - Newsletter Link', () => {
    test('should open newsletter in new tab', async ({ studentNewsletter, context }) => {
        // Navigate to My Classroom first (where sidebar is visible)
        await studentNewsletter.navigation.navigateToMyClassroom();

        // Click newsletter and get the new tab
        const newPage = await studentNewsletter.clickNewsletterAndGetNewTab(context);

        // Verify the new tab opened to correct domain
        const isCorrectDomain = await studentNewsletter.isOnCorrectDomain(newPage);
        expect(isCorrectDomain).toBeTruthy();

        // Verify URL contains newsletter
        const isNewsletterURL = await studentNewsletter.isNewsletterURL(newPage);
        expect(isNewsletterURL).toBeTruthy();

        // Close the new tab
        await studentNewsletter.closeNewTab(newPage);
    });

    test('should open newsletter from sidebar link', async ({ studentMyClassroom, context }) => {
        // Navigate to My Classroom
        await studentMyClassroom.navigateFromNav();

        // Click newsletter sidebar link and wait for new page
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            studentMyClassroom.navigation.sidebarNewsletter.click()
        ]);

        await newPage.waitForLoadState('domcontentloaded');

        // Verify opens to partners.stormwind.com
        expect(newPage.url()).toContain('partners.stormwind.com');
        expect(newPage.url()).toContain('newsletter');

        await newPage.close();
    });
});
