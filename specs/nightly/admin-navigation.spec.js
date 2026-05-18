const { test, expect } = require('../../fixtures/fixtures');

test.describe('Admin - Navigation', () => {

    test('should display main nav and admin sub-nav on dashboard', async ({ adminDashboard, adminNavigation }) => {
        // STEP 1: Navigate to dashboard
        await adminDashboard.goto();

        // STEP 2: Validate main navigation links are visible
        await adminNavigation.expectMainNavVisible();

        // STEP 3: Validate admin sub-navigation tabs are visible
        await adminNavigation.expectAdminSubNavVisible();
    });

    test('should navigate to each admin sub-nav tab', async ({ adminDashboard, adminNavigation }) => {
        // STEP 1: Start on dashboard so sub-nav is present
        await adminDashboard.goto();

        // STEP 2: Navigate to Skills Assessments Data tab
        await adminNavigation.navigateToSkillsAssessmentsData();
        expect(adminNavigation.page.url()).toContain('/skills-assessment/');

        // STEP 3: Navigate to Due Dates tab
        await adminNavigation.navigateToDueDates();
        expect(adminNavigation.page.url()).toContain('/due-date/');

        // STEP 4: Navigate to Add Users tab
        await adminNavigation.navigateToAddUsers();
        expect(adminNavigation.page.url()).toContain('/invitations');

        // STEP 5: Navigate to Manage Learning Paths tab
        await adminNavigation.navigateToManageLearningPaths();
        expect(adminNavigation.page.url()).toContain('/team/learning-path');
    });

    test('should navigate via main nav links', async ({ adminDashboard, adminNavigation }) => {
        // STEP 1: Start on dashboard
        await adminDashboard.goto();

        // STEP 2: Navigate to Courses via main nav
        await adminNavigation.navigateToCourses();
        expect(adminNavigation.page.url()).toContain('/topics');

        // STEP 3: Navigate to Learning Paths via main nav
        await adminNavigation.navigateToLearningPaths();
        expect(adminNavigation.page.url()).toContain('/learningpaths');

        // STEP 4: Navigate to Skills Assessments via main nav
        await adminNavigation.navigateToSkillsAssessments();
        expect(adminNavigation.page.url()).toContain('/skillsassessment');

        // STEP 5: Navigate to Leaderboard via main nav
        await adminNavigation.navigateToLeaderboard();
        expect(adminNavigation.page.url()).toContain('leaderboard');
    });

});
