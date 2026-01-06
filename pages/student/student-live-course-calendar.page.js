const BasePage = require('../base.page');
const StudentNavigationPage = require('./student-navigation.page');
const StudentFooterPage = require('./student-footer.page');

/**
 * StudentLiveCourseCalendarPage - Live Course Calendar (opens in new tab)
 * URL: /calendar/*
 */
class StudentLiveCourseCalendarPage extends BasePage {
    constructor(page) {
        super(page);

        // Compose shared components
        this.navigation = new StudentNavigationPage(page);
        this.footer = new StudentFooterPage(page);

        // Calendar controls
        this.todayButton = page.getByRole('button', { name: 'Today' });
        this.previousButton = page.locator('button').filter({ has: page.locator('svg, [class*="chevron-left"], [class*="arrow"]') }).first();
        this.nextButton = page.locator('button').filter({ has: page.locator('svg, [class*="chevron-right"], [class*="arrow"]') }).last();

        // Calendar header
        this.monthYearHeading = page.locator('text=/\\w+ \\d{4}/'); // Matches "December 2025"

        // Calendar grid - use day headers as reliable indicator
        this.calendarGrid = page.getByText('SUN').first();
        this.dayHeaders = page.locator('th, [class*="day-header"]');
        this.calendarCells = page.locator('td, [class*="calendar-cell"]');
        this.currentDayCell = page.locator('[class*="today"], [class*="current"], td.fc-day-today');

        // Added events indicator
        this.addedIndicator = page.getByText(/Added/);
    }

    /**
     * Click Live Course Calendar link and wait for new tab to open
     * @returns {Promise<Page>} The new page/tab that opens
     */
    async clickCalendarAndGetNewTab(context, navigationPage) {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            navigationPage.sidebarLiveCourseCalendar.click()
        ]);

        await newPage.waitForLoadState('domcontentloaded');
        return newPage;
    }

    /**
     * Create a new instance with the new page context
     */
    static createForNewTab(newPage) {
        return new StudentLiveCourseCalendarPage(newPage);
    }

    // Navigation
    async clickToday() {
        await this.todayButton.click();
    }

    async clickPrevious() {
        await this.previousButton.click();
    }

    async clickNext() {
        await this.nextButton.click();
    }

    // URL verification
    isOnCorrectURL() {
        return this.page.url().includes('calendar');
    }

    // Assertions
    async expectTodayButtonVisible() {
        await this.expectVisible(this.todayButton);
    }

    async expectCalendarGridVisible() {
        await this.expectVisible(this.calendarGrid);
    }

    async expectNavigationVisible() {
        await this.navigation.expectMainNavVisible();
    }

    async expectFooterVisible() {
        await this.footer.scrollToFooter();
        await this.footer.expectExploreLinksVisible();
    }

    async expectPageLoaded() {
        await this.expectTodayButtonVisible();
        await this.expectCalendarGridVisible();
    }

    /**
     * Verify all required elements on the calendar page
     */
    async verifyCalendarPageElements() {
        // Verify Today button
        await this.expectTodayButtonVisible();

        // Verify calendar is displayed
        await this.expectCalendarGridVisible();

        // Verify navigation bar
        await this.expectNavigationVisible();
    }

    /**
     * Close the calendar tab
     */
    async closeTab() {
        await this.page.close();
    }
}

module.exports = StudentLiveCourseCalendarPage;
