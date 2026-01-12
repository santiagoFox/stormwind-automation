const { test, expect } = require('../../fixtures/fixtures');

/**
 * Student - Courses Page Tests
 * Single comprehensive test covering:
 * - Stage 1: Topic Categories (11 cards at /topics)
 * - Stage 2: Cybersecurity topic page with subcategory chips and filters
 * - Stage 3: Individual course details (to be added)
 */
test.describe('Student - Courses Page', () => {

    test('should validate topic categories, navigate to Cybersecurity, validate layout, filters, chips, and filter by Palo Alto', async ({ studentCourses, studentCoursesList }) => {
        // ========== STAGE 1: Topic Categories ==========

        // Navigate to Courses page
        await studentCourses.goto();

        // 1. Validate URL contains /topics
        const isCorrectURL = await studentCourses.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();
        expect(studentCourses.page.url()).toContain('/topics');

        // 2. Validate page heading "Courses"
        await studentCourses.expectPageHeadingVisible();

        // 3. Validate navigation bar is visible
        await studentCourses.expectNavigationVisible();

        // 4. Validate topics container is visible
        await studentCourses.expectTopicsContainerVisible();

        // 5. Validate topic cards are displayed
        await studentCourses.expectTopicCardsVisible();

        // 6. Validate all 11 topic category cards are visible
        await studentCourses.expectAllTopicCategoriesVisible();

        // 7. Validate footer with all links
        await studentCourses.expectAllFooterLinksVisible();

        // ========== STAGE 2: Cybersecurity Topic Page ==========

        // 8. Click on Cybersecurity topic card
        await studentCourses.clickTopicCard('Cybersecurity');

        // 9. Validate URL contains /courses/ (topic landing page)
        expect(studentCoursesList.page.url()).toContain('/courses/');

        // 10. Validate page heading "Cybersecurity"
        await studentCoursesList.expectPageHeading('Cybersecurity');

        // 11. Validate breadcrumb is visible (Courses > Cybersecurity)
        await studentCoursesList.expectBreadcrumbVisible();

        // 12. Validate search input is visible
        await studentCoursesList.expectSearchInputVisible();

        // 13. Validate subcategory chips are visible
        await studentCoursesList.expectChipsVisible();

        // 14. Validate all Cybersecurity subcategory chips are displayed
        // Expected chips: All, CompTIA, Cyber Range, EC-Council, ISC2, Microsoft, PM, Palo Alto, SonicWall, Webinars
        await studentCoursesList.expectAllCybersecurityChipsVisible();

        // 15. Validate Filters sidebar is visible
        await studentCoursesList.expectFiltersHeadingVisible();

        // 16. Validate all filter options are visible
        // Expected filters: Difficulty, Job Role, Instructor, Course Type, Certification-Based
        await studentCoursesList.expectAllFiltersVisible();

        // 17. Validate course cards are displayed
        await studentCoursesList.expectCourseCardsVisible();

        // 18. Click on "Palo Alto" chip to filter courses
        await studentCoursesList.clickPaloAltoChip();

        // 19. Validate "Palo Alto" chip is now active
        await studentCoursesList.expectChipActive('Palo Alto');

        // 20. Validate course cards are still displayed (filtered results)
        await studentCoursesList.expectCourseCardsVisible();

        // ========== STAGE 3: Course Preview Modal ==========

        // 21. Validate course cards are displayed after Palo Alto filter
        await studentCoursesList.expectCourseCardsVisible();

        // 22. Click on the course card title link "Palo Alto Firewall Administration"
        await studentCoursesList.clickCourseCardTitleLink('Palo Alto Firewall Administration');

        // 23. Validate course modal is visible
        await studentCoursesList.expectCourseModalVisible();

        // 24. Validate modal title matches "Palo Alto Firewall Administration"
        await studentCoursesList.expectCourseModalTitle('Palo Alto Firewall Administration');

        // 25. Validate level is visible (Intermediate)
        await studentCoursesList.expectCourseModalLevelVisible();

        // 26. Validate duration is visible (less than 1 hour)
        await studentCoursesList.expectCourseModalDurationVisible();

        // 27. Validate Overview heading is visible
        await studentCoursesList.expectCourseModalOverviewHeadingVisible();

        // 28. Validate "LEARN MORE" link is visible
        await studentCoursesList.expectCourseModalLearnMoreLinkVisible();

        // 29. Validate "+ ADD TO CLASSROOM" button is visible
        await studentCoursesList.expectCourseModalAddToClassroomBtnVisible();

        // 30. Validate close button (X) is visible
        await studentCoursesList.expectCourseModalCloseButtonVisible();

        // 31. Close the modal
        await studentCoursesList.closeCourseModal();

        // 32. Validate navigation bar is visible
        await studentCoursesList.expectNavigationVisible();

        // 33. Validate footer links
        await studentCoursesList.expectAllFooterLinksVisible();
    });

});
