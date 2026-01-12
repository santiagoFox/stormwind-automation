const { test, expect } = require('../../fixtures/fixtures');

/**
 * Student - Course Details with Supplements Tests
 * Tests the Python Foundations course page with supplements section
 * URL: /stormwind-developer/python/python-foundations
 */
test.describe('Student - Course Details with Supplements', () => {

    test('should validate course banner, buttons, supplements section, and Storm AI Tutor', async ({ studentCourseDetailsSupplements }) => {
        // Navigate to Python Foundations course page
        await studentCourseDetailsSupplements.goto();

        // 1. Validate URL
        const isCorrectURL = await studentCourseDetailsSupplements.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();

        // 2. Validate navigation is visible
        await studentCourseDetailsSupplements.expectNavigationVisible();

        // ========== COURSE BANNER ==========

        // 3. Validate course category "PYTHON"
        await studentCourseDetailsSupplements.expectHeroCategoryVisible();

        // 4. Validate course title "Python Foundations"
        await studentCourseDetailsSupplements.expectHeroTitleVisible();

        // 5. Validate level "Beginner"
        await studentCourseDetailsSupplements.expectHeroLevelVisible();

        // 6. Validate duration "10 hours"
        await studentCourseDetailsSupplements.expectHeroDurationVisible();

        // 7. Validate instructor "By: Edem Francois"
        await studentCourseDetailsSupplements.expectHeroInstructorVisible();

        // ========== BANNER BUTTONS ==========

        // 8. Validate ADD TO CLASSROOM button
        await studentCourseDetailsSupplements.expectAddToClassroomBtnVisible();

        // 9. Validate VIEW PREVIEW button
        await studentCourseDetailsSupplements.expectViewPreviewBtnVisible();

        // ========== STORM AI TUTOR ==========

        // 10. Validate Storm AI Tutor button is visible
        await studentCourseDetailsSupplements.expectStormAITutorBtnVisible();

        // 11. Validate Storm AI Tutor text is visible
        await studentCourseDetailsSupplements.expectStormAITutorTextVisible();

        // ========== SUPPLEMENTS SECTION ==========

        // 12. Validate Supplements section is visible
        await studentCourseDetailsSupplements.expectSupplementsSectionVisible();

        // 13. Validate Supplements counter is visible
        await studentCourseDetailsSupplements.expectSupplementsCounterVisible();

        // 14. Validate supplements count is 2
        const supplementsCount = await studentCourseDetailsSupplements.getSupplementsCount();
        expect(supplementsCount).toBe(2);

        // 15. Validate Class Slides link is visible
        await studentCourseDetailsSupplements.expectClassSlidesLinkVisible();

        // 16. Validate Python Foundations Code Samples link is visible
        await studentCourseDetailsSupplements.expectCodeSamplesLinkVisible();

        // ========== OTHER SECTIONS ==========

        // 17. Validate Overview section is visible
        await studentCourseDetailsSupplements.expectOverviewSectionVisible();

        // 18. Validate Modules section is visible
        await studentCourseDetailsSupplements.expectModulesSectionVisible();

        // 19. Validate footer links
        await studentCourseDetailsSupplements.expectAllFooterLinksVisible();
    });

});
