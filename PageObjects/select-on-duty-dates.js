class SelectOnDutyDates {
    constructor(page) {
        this.page = page;
        this.clsDrop = page.locator("div .cls-drop");
        this.onDutyBtn = page.locator("//button[.//span[text()=' On duty ']]");
        this.addOnDutyDatesBtn = page.locator("//div/button[text()='add on duty dates']");
        this.rangeRadio = page.locator("input[type='radio'][value='range']");
        this.reasonSelect = page.locator('mat-select[formcontrolname="reason"]');
        
        this.commentsInput = page.locator("//label[.//text()[normalize-space()='Comments']]");
        this.addBtn = page.locator("//div//button[contains(@class, 'btn-success') and normalize-space(text())='add']");
        this.today = page.locator('//td[contains(@class, "p-datepicker-today")][not(contains(@class, "p-datepicker-other-month"))]//div');
    }

    async applyOnDuty(absentDay, onDutyReason, comments) {
        await this.clsDrop.click();
        await this.onDutyBtn.click();
        await this.addOnDutyDatesBtn.click();
        await this.rangeRadio.click();

        if (absentDay) {
            const firstAbsentLocator = this.page.locator(
                `//td[not(contains(@class, 'p-datepicker-other-month'))]//div[contains(@class, 'cls-full-absent') and normalize-space(.)='${absentDay}']`
            );
            await firstAbsentLocator.waitFor({ state: 'visible' });
            await firstAbsentLocator.click();
            await this.page.waitForTimeout(500);
        }

        await this.today.click();
        await this.reasonSelect.click();
        await this.page.waitForTimeout(500);
        await this.page.locator(`//mat-option[.//span[normalize-space(.)='${onDutyReason}']]`).click();
        await this.commentsInput.fill(comments);
        await this.page.waitForTimeout(500);
        await this.addBtn.click();
    }

}
                                                                                    
module.exports = { SelectOnDutyDates };