const BasePage = require('../base.page');
const StudentNavigationPage = require('./student-navigation.page');
const StudentFooterPage = require('./student-footer.page');

/**
 * StudentCourseDetailsPage - Individual course details page
 * Uses composition with shared navigation and footer components
 * URL: /stormwind-developer/{category}/{course-slug}
 */
class StudentCourseDetailsPage extends BasePage {
    constructor(page) {
        super(page);

        // Compose shared components
        this.navigation = new StudentNavigationPage(page);
        this.footer = new StudentFooterPage(page);

        // Hero Banner
        this.heroBanner = page.locator('.course-hero, [class*="hero"], .banner').first();
        this.heroCategory = page.getByText('AI AND CHATGPT');
        this.heroTitle = page.getByRole('heading', { name: 'Coding with AI (Copilot)' });
        this.heroLevel = page.getByText('Beginner');
        this.heroDuration = page.getByText('1 hour');
        this.heroInstructor = page.getByText('By: Shaun Pelling');

        // ADD TO CLASSROOM button (before adding)
        this.addToClassroomBtn = page.getByRole('button', { name: /ADD TO CLASSROOM/i });

        // After adding to classroom
        this.progressComplete = page.getByText(/\d+% complete/);
        this.startBtn = page.getByRole('link', { name: /START/i });
        this.checkmarkBtn = page.locator('button.btn-circle.js-course-flag, button.btn-circle:has(i.fa-check)');

        // Overview section
        this.overviewHeading = page.getByRole('heading', { name: 'Overview' });
        this.overviewText = page.locator('p').filter({ hasText: /Coding with AI \(Copilot\) introduces learners/ });

        // Modules section
        this.modulesHeading = page.getByRole('heading', { name: 'Modules' });

        // Module 1: Getting Started with Copilot
        this.module1Heading = page.getByRole('heading', { name: 'Getting Started with Copilot' });
        this.lesson1_1 = page.getByText('Tools, Models & Copilot Setup');
        this.lesson1_2 = page.getByText('Vibe Coding with Bolt');
        this.lesson1_3 = page.getByText('Copilot Basics');
        this.lesson1_4 = page.getByText('Copilot Edit & Agent Modes');

        // Module 2: Context and Project Application
        this.module2Heading = page.getByRole('heading', { name: 'Context and Project Application' });
        this.lesson2_1 = page.getByText('Context').first();
        this.lesson2_2 = page.getByText('Making a Next.js Site with Copilot');
        this.lesson2_3 = page.getByText('Instruction Files');
        this.lesson2_4 = page.getByText('The Importance of Git');

        // Module 3: Server Setup, Features, and Wrap-Up
        this.module3Heading = page.getByRole('heading', { name: 'Server Setup, Features, and Wrap-Up' });
        this.lesson3_1 = page.getByText('MCP Servers');
        this.lesson3_2 = page.getByText('Adding a Feature List');
        this.lesson3_3 = page.getByText('Final Thoughts');

        // Supplements section
        this.supplementsHeading = page.getByRole('heading', { name: /Supplements/ });
        this.supplementDownloadVSCode = page.getByText('Download VS Code');
        this.supplementCopilotPlans = page.getByText('Copilot Plans');
        this.supplementVSCodeDocs = page.getByText('VS Code Copilot Documentation');
        this.supplementVSCodeModels = page.getByText('VS Code Copilot Models');
    }

    /**
     * Navigate directly to the course details page
     * @param {string} url - Full URL or path to navigate to
     */
    async goto(url = 'https://test-spectre.pantheonsite.io/stormwind-developer/ai-and-chatgpt/coding-ai-copilot') {
        await this.page.goto(url);
        await this.page.waitForLoadState('load');
    }

    /**
     * Click ADD TO CLASSROOM button
     */
    async clickAddToClassroom() {
        await this.addToClassroomBtn.click();
    }

    /**
     * Wait for START button to appear after adding to classroom
     */
    async waitForStartButton() {
        await this.startBtn.waitFor({ state: 'visible', timeout: 15000 });
    }

    /**
     * Click START button
     */
    async clickStartButton() {
        await this.startBtn.click();
        await this.page.waitForLoadState('load');
    }

    /**
     * Click checkmark button to remove course from classroom
     */
    async clickCheckmarkButton() {
        await this.checkmarkBtn.click();
    }

    /**
     * Wait for ADD TO CLASSROOM button to appear after removing
     */
    async waitForAddToClassroomButton() {
        await this.addToClassroomBtn.waitFor({ state: 'visible', timeout: 15000 });
    }

    // --- Assertions ---

    /**
     * Assert navigation bar is visible
     */
    async expectNavigationVisible() {
        await this.navigation.expectMainNavVisible();
    }

    /**
     * Assert hero banner category is visible
     */
    async expectHeroCategoryVisible() {
        await this.expectVisible(this.heroCategory);
    }

    /**
     * Assert hero banner title is visible
     */
    async expectHeroTitleVisible() {
        await this.expectVisible(this.heroTitle);
    }

    /**
     * Assert hero banner level is visible
     */
    async expectHeroLevelVisible() {
        await this.expectVisible(this.heroLevel);
    }

    /**
     * Assert hero banner duration is visible
     */
    async expectHeroDurationVisible() {
        await this.expectVisible(this.heroDuration);
    }

    /**
     * Assert hero banner instructor is visible
     */
    async expectHeroInstructorVisible() {
        await this.expectVisible(this.heroInstructor);
    }

    /**
     * Assert ADD TO CLASSROOM button is visible
     */
    async expectAddToClassroomBtnVisible() {
        await this.expectVisible(this.addToClassroomBtn);
    }

    /**
     * Assert all hero banner elements are visible
     */
    async expectHeroBannerComplete() {
        await this.expectHeroCategoryVisible();
        await this.expectHeroTitleVisible();
        await this.expectHeroLevelVisible();
        await this.expectHeroDurationVisible();
        await this.expectHeroInstructorVisible();
        await this.expectAddToClassroomBtnVisible();
    }

    /**
     * Assert Overview section is visible
     */
    async expectOverviewSectionVisible() {
        await this.expectVisible(this.overviewHeading);
        await this.expectVisible(this.overviewText);
    }

    /**
     * Assert Modules heading is visible
     */
    async expectModulesHeadingVisible() {
        await this.expectVisible(this.modulesHeading);
    }

    /**
     * Assert Module 1 with lessons is visible
     */
    async expectModule1Visible() {
        await this.expectVisible(this.module1Heading);
        await this.expectVisible(this.lesson1_1);
        await this.expectVisible(this.lesson1_2);
        await this.expectVisible(this.lesson1_3);
        await this.expectVisible(this.lesson1_4);
    }

    /**
     * Assert Module 2 with lessons is visible
     */
    async expectModule2Visible() {
        await this.expectVisible(this.module2Heading);
        await this.expectVisible(this.lesson2_1);
        await this.expectVisible(this.lesson2_2);
        await this.expectVisible(this.lesson2_3);
        await this.expectVisible(this.lesson2_4);
    }

    /**
     * Assert Module 3 with lessons is visible
     */
    async expectModule3Visible() {
        await this.expectVisible(this.module3Heading);
        await this.expectVisible(this.lesson3_1);
        await this.expectVisible(this.lesson3_2);
        await this.expectVisible(this.lesson3_3);
    }

    /**
     * Assert all modules are visible
     */
    async expectAllModulesVisible() {
        await this.expectModulesHeadingVisible();
        await this.expectModule1Visible();
        await this.expectModule2Visible();
        await this.expectModule3Visible();
    }

    /**
     * Assert Supplements section is visible with all links
     */
    async expectSupplementsSectionVisible() {
        await this.expectVisible(this.supplementsHeading);
        await this.expectVisible(this.supplementDownloadVSCode);
        await this.expectVisible(this.supplementCopilotPlans);
        await this.expectVisible(this.supplementVSCodeDocs);
        await this.expectVisible(this.supplementVSCodeModels);
    }

    /**
     * Assert all footer links are visible
     */
    async expectAllFooterLinksVisible() {
        await this.footer.expectAllFooterLinksVisible();
    }

    /**
     * Assert progress indicator is visible (after adding to classroom)
     */
    async expectProgressVisible() {
        await this.expectVisible(this.progressComplete);
    }

    /**
     * Assert START button is visible (after adding to classroom)
     */
    async expectStartBtnVisible() {
        await this.expectVisible(this.startBtn);
    }

    /**
     * Assert checkmark button is visible (after adding to classroom)
     */
    async expectCheckmarkBtnVisible() {
        await this.expectVisible(this.checkmarkBtn);
    }

    /**
     * Assert course is added to classroom (START button and checkmark visible)
     */
    async expectCourseAddedToClassroom() {
        await this.expectProgressVisible();
        await this.expectStartBtnVisible();
        await this.expectCheckmarkBtnVisible();
    }
}

module.exports = StudentCourseDetailsPage;
