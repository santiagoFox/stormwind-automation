const { test, expect } = require('../../fixtures/fixtures');

test.describe('Student - Footer', () => {

    test('should display all footer sections and links', async ({ studentMyClassroom, studentFooter }) => {
        // STEP 1: Navigate to My Classroom so the footer is present
        await studentMyClassroom.navigateFromNav();

        // STEP 2: Scroll to footer and verify it is visible
        await studentFooter.scrollToFooter();
        await studentFooter.expectVisible(studentFooter.footer);

        // STEP 3: Validate EXPLORE section links
        await studentFooter.expectExploreLinksVisible();

        // STEP 4: Validate CONTACT section links
        await studentFooter.expectContactLinksVisible();

        // STEP 5: Validate ABOUT section links
        await studentFooter.expectAboutLinksVisible();
    });

    test('should navigate to Courses from footer', async ({ studentMyClassroom, studentFooter }) => {
        // STEP 1: Navigate to My Classroom
        await studentMyClassroom.navigateFromNav();

        // STEP 2: Click Courses link in footer
        await studentFooter.scrollToFooter();
        await studentFooter.clickExploreCourses();
        expect(studentFooter.page.url()).toContain('/topics');
    });

    test('should navigate to Learning Paths from footer', async ({ studentMyClassroom, studentFooter }) => {
        // STEP 1: Navigate to My Classroom
        await studentMyClassroom.navigateFromNav();

        // STEP 2: Click Learning Paths link in footer
        await studentFooter.scrollToFooter();
        await studentFooter.clickExploreLearningPaths();
        expect(studentFooter.page.url()).toContain('/learningpaths');
    });

    test('should navigate to Skill Assessments from footer', async ({ studentMyClassroom, studentFooter }) => {
        // STEP 1: Navigate to My Classroom
        await studentMyClassroom.navigateFromNav();

        // STEP 2: Click Skill Assessments link in footer
        await studentFooter.scrollToFooter();
        await studentFooter.clickExploreSkillAssessments();
        expect(studentFooter.page.url()).toContain('/skillsassessment');
    });

});
