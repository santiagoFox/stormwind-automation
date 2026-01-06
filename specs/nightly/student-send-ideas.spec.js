const { test, expect } = require('../../fixtures/fixtures');

test.describe('Student - Send Ideas Page', () => {

    test('should open Send Ideas in a new tab with correct URL', async ({ studentMyClassroom, context }) => {
        // 1. Navigate to My Classroom (login happens via fixture)
        await studentMyClassroom.navigateFromNav();

        // Verify we're on My Classroom
        expect(studentMyClassroom.page.url()).toContain('my_classroom');

        // 2. Click Send Ideas link and wait for new tab
        const sendIdeasLink = studentMyClassroom.page.getByRole('link', { name: ' Send Ideas' }).first();

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            sendIdeasLink.click()
        ]);

        // 3. Wait for the new page to load
        await newPage.waitForLoadState('domcontentloaded');

        // 4. Verify new tab opened with correct URL
        expect(newPage.url()).toContain('feedback.stormwindstudios.com');

        // 5. Verify original page is still open
        expect(studentMyClassroom.page.url()).toContain('my_classroom');

        // 6. Verify it's a different page
        expect(newPage).not.toBe(studentMyClassroom.page);

        // Close the new tab
        await newPage.close();
    });

    test('should display main elements on Send Ideas page', async ({ studentMyClassroom, context }) => {
        // Navigate to My Classroom
        await studentMyClassroom.navigateFromNav();

        // Click Send Ideas link and wait for new tab
        const sendIdeasLink = studentMyClassroom.page.getByRole('link', { name: ' Send Ideas' }).first();

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            sendIdeasLink.click()
        ]);

        await newPage.waitForLoadState('load');

        // Verify key elements on the feedback page (using newPage directly)
        await expect(newPage.getByRole('heading', { name: /Hi there/i })).toBeVisible();
        await expect(newPage.getByRole('textbox', { name: 'Search...' })).toBeVisible();
        await expect(newPage.getByRole('link', { name: 'Send Ideas' })).toBeVisible();

        // Close the new tab
        await newPage.close();
    });

});
