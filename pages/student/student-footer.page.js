const BasePage = require('../base.page');

/**
 * StudentFooterPage - Shared footer component for all student pages
 * Contains footer navigation links organized by section
 */
class StudentFooterPage extends BasePage {
    constructor(page) {
        super(page);

        // Footer container
        this.footer = page.locator('#footer');

        // EXPLORE section links
        this.exploreCourses = this.footer.getByRole('link', { name: 'Courses' });
        this.exploreLearningPaths = this.footer.getByRole('link', { name: 'Learning Paths' });
        this.exploreSkillAssessments = this.footer.getByRole('link', { name: 'Skill Assessments' });
        this.exploreWebinars = this.footer.getByRole('link', { name: 'Webinars' });
        this.exploreLiveCourseCalendar = this.footer.getByRole('link', { name: 'Live Course Calendar' });

        // CONTACT section links
        this.contactSupport = this.footer.getByRole('link', { name: 'Support' });
        this.contactSendIdeas = this.footer.getByRole('link', { name: 'Send Ideas' });
        this.contactNewsletter = this.footer.getByRole('link', { name: 'Newsletter' });

        // ABOUT section links
        this.aboutTermsOfUse = this.footer.getByRole('link', { name: 'Terms of Use' });
        this.aboutPrivacyPolicy = this.footer.getByRole('link', { name: 'Privacy Policy' });
    }

    async scrollToFooter() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.page.waitForTimeout(1000);
    }

    async isFooterVisible() {
        return await this.footer.isVisible();
    }

    // EXPLORE section navigation
    async clickExploreCourses() {
        await this.exploreCourses.click();
        await this.page.waitForLoadState('load');
    }

    async clickExploreLearningPaths() {
        await this.exploreLearningPaths.click();
        await this.page.waitForLoadState('load');
    }

    async clickExploreSkillAssessments() {
        await this.exploreSkillAssessments.click();
        await this.page.waitForLoadState('load');
    }

    async clickExploreWebinars() {
        await this.exploreWebinars.click();
        await this.page.waitForLoadState('load');
    }

    async clickExploreLiveCourseCalendar() {
        await this.exploreLiveCourseCalendar.click();
        await this.page.waitForLoadState('load');
    }

    // CONTACT section navigation
    async clickContactSupport() {
        await this.contactSupport.click();
        await this.page.waitForLoadState('load');
    }

    async clickContactSendIdeas() {
        await this.contactSendIdeas.click();
        await this.page.waitForLoadState('load');
    }

    async clickContactNewsletter() {
        await this.contactNewsletter.click();
        await this.page.waitForLoadState('load');
    }

    // ABOUT section navigation
    async clickAboutTermsOfUse() {
        await this.aboutTermsOfUse.click();
        await this.page.waitForLoadState('load');
    }

    async clickAboutPrivacyPolicy() {
        await this.aboutPrivacyPolicy.click();
        await this.page.waitForLoadState('load');
    }

    // Assertions - EXPLORE section
    async expectExploreLinksVisible() {
        await this.expectVisible(this.exploreCourses);
        await this.expectVisible(this.exploreLearningPaths);
        await this.expectVisible(this.exploreSkillAssessments);
        await this.expectVisible(this.exploreWebinars);
        await this.expectVisible(this.exploreLiveCourseCalendar);
    }

    // Assertions - CONTACT section
    async expectContactLinksVisible() {
        await this.expectVisible(this.contactSupport);
        await this.expectVisible(this.contactSendIdeas);
        await this.expectVisible(this.contactNewsletter);
    }

    // Assertions - ABOUT section
    async expectAboutLinksVisible() {
        await this.expectVisible(this.aboutTermsOfUse);
        await this.expectVisible(this.aboutPrivacyPolicy);
    }

    // Assert all footer sections
    async expectAllFooterLinksVisible() {
        await this.scrollToFooter();
        await this.expectExploreLinksVisible();
        await this.expectContactLinksVisible();
        await this.expectAboutLinksVisible();
    }
}

module.exports = StudentFooterPage;
