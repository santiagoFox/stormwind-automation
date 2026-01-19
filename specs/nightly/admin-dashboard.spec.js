const { test, expect } = require('../../fixtures/fixtures');

/**
 * Admin - Dashboard Page Tests
 * Tests the Dashboard page metadata (labels, buttons, sections)
 * URL: /team/{teamId}/reporting/{userId}
 * Note: Does NOT validate numeric values (counts) as they vary
 */
test.describe('Admin - Dashboard Page', () => {

    test('should validate complete dashboard page metadata', async ({ adminDashboard }) => {
        // 1. Navigate to Dashboard page
        await adminDashboard.goto();

        // 2. Validate we're on the correct URL
        const isCorrectURL = await adminDashboard.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();

        // 3. Validate navigation is visible
        await adminDashboard.expectNavigationVisible();

        // 4. Validate admin sub-navigation is visible
        await adminDashboard.expectAdminSubNavVisible();

        // 5. Validate Dashboard title is visible
        await adminDashboard.expectDashboardTitleVisible();

        // 6. Validate Licenses section metadata
        // - Licenses heading
        // - Total Licenses label
        // - Available Licenses label
        // - Students Assigned label
        // - Receive Licenses Report button
        await adminDashboard.expectLicensesSectionVisible();

        // 7. Validate Team Activity section metadata
        // - Team Activity heading
        // - Total Hours Trained label
        // - Total Courses Completed label
        // - Resend Welcome Email button
        // - Receive Activity Report button
        await adminDashboard.expectTeamActivitySectionVisible();

        // 8. Validate Student Information section metadata
        // - Student Information heading
        // - Search input
        // - Add User button
        // - Student table
        await adminDashboard.expectStudentInfoSectionVisible();

        // 9. Validate footer links
        await adminDashboard.expectAllFooterLinksVisible();
    });

});
