const { expect } = require('@playwright/test');

class TimeUpdateAndSubmit{

    constructor(page) {
        this.page = page;
        this.weekendsRows = page.locator("//tr[contains(@style, 'rgba(236, 145, 51, 0.2)')]//i[contains(@class, 'fa-circle-minus')]");
        this.updateTime = page.locator('.click-div .fa-solid');
        this.updateBtn = page.locator("//button[text()='Update']");
        this.submitButton = page.locator("//button[@type='button']");
        this.headerLocator = page.locator('.p-dialog-content h2');
    }

    async clickAllVisible(locator, delay = 300) {
        while (await locator.first().isVisible()) {
            await locator.first().click();
            await this.page.waitForTimeout(delay);
        }
    }

    async submitAttendance() {
        // Remove all weekends
        const weekendsRowsCount = await this.weekendsRows.count();
        await this.clickAllVisible(this.weekendsRows, 300);
        console.log('Weekends count:', weekendsRowsCount);

        // Update On Duty Records
        await this.updateTime.first().waitFor({ state: 'visible' });
        const finalCount = await this.updateTime.count();
        console.log('Submitted On Duty count:', finalCount);

        for (let i = 0; i < finalCount; i++) {
            await this.updateTime.nth(i).click();
            await this.updateBtn.click();
        }
        await this.page.waitForTimeout(500);
        await this.submitButton.click();

        await this.page.waitForTimeout(500);
        await expect(this.headerLocator).toHaveText('Confirmed!');

        await this.page.waitForTimeout(5000);
    }





}

module.exports = { TimeUpdateAndSubmit };