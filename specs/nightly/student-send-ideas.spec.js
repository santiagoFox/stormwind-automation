const { test, expect } = require('../../fixtures/fixtures');

test.describe('Student - Send Ideas Page', () => {
    let newPage;

    test.beforeEach(async ({ studentMyClassroom, studentSendIdeas, context }) => {
        // Navigate to My Classroom where sidebar is visible
        await studentMyClassroom.navigateFromNav();

        // Open Send Ideas in new tab
        newPage = await studentSendIdeas.openFromSidebar(context, studentMyClassroom.page);
        studentSendIdeas.setPage(newPage);
    });

    test.afterEach(async () => {
        if (newPage && !newPage.isClosed()) {
            await newPage.close();
        }
    });

    test('should open in a new tab', async ({ studentMyClassroom }) => {
        // Verify original page is still open
        expect(studentMyClassroom.page.url()).toContain('my_classroom');

        // Verify new tab opened
        expect(newPage).toBeTruthy();
        expect(newPage).not.toBe(studentMyClassroom.page);
    });

    test('should navigate to feedback.stormwindstudios.com', async ({ studentSendIdeas }) => {
        // Verify URL contains feedback.stormwindstudios.com
        expect(newPage.url()).toContain('feedback.stormwindstudios.com');
    });

    test('should display header navigation links', async ({ studentSendIdeas }) => {
        // Verify header nav: Send Ideas, Updates, Roadmap
        await studentSendIdeas.expectHeaderNavVisible();
    });

    test('should display main heading "Hi there"', async ({ studentSendIdeas }) => {
        // Verify main heading
        await studentSendIdeas.expectMainHeadingVisible();
    });

    test('should display subtitle about sharing feedback', async ({ studentSendIdeas }) => {
        // Verify subtitle text
        await studentSendIdeas.expectSubtitleVisible();
    });

    test('should display search input', async ({ studentSendIdeas }) => {
        // Verify search input is visible
        await studentSendIdeas.expectSearchInputVisible();
    });

    test('should display Create a Post button', async ({ studentSendIdeas }) => {
        // Verify Create a Post button
        await studentSendIdeas.expectCreatePostButtonVisible();
    });

    test('should display category filters', async ({ studentSendIdeas }) => {
        // Verify categories: All Categories, Feature Idea, Bug, Content Idea
        await studentSendIdeas.expectCategoriesVisible();
    });

    test('should verify all static page elements', async ({ studentSendIdeas }) => {
        // Verify all main elements are displayed
        await studentSendIdeas.verifyPageLoaded();
    });
});
