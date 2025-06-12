class AttendanceCalendarData {

    constructor(page) {
        this.page = page;
        this.calendar = page.locator("//tbody[@class='ng-tns-c133-99']");
        this.today = page.locator('//td[contains(@class, "p-datepicker-today")][not(contains(@class, "p-datepicker-other-month"))]//div');
        this.holidays = page.locator('//div[contains(@class, "cls-wall-calendar")][contains(@style, "rgb(200, 179, 247)")][not(ancestor::td[contains(@class, "p-datepicker-other-month")])]');
        this.absentDays = page.locator('//div[contains(@class, "cls-wall-calendar")][contains(@style, "rgb(242, 124, 124)")][not(ancestor::td[contains(@class, "p-datepicker-other-month")])]');
        this.weekends = page.locator('//div[contains(@class, "cls-wall-calendar")][contains(@style, "rgb(232, 235, 237)")][not(ancestor::td[contains(@class, "p-datepicker-other-month")])]');
        this.presentDays = page.locator('//div[contains(@class, "cls-wall-calendar")][contains(@style, "rgb(174, 223, 205)")][not(ancestor::td[contains(@class, "p-datepicker-other-month")])]');
        this.leaveDays = page.locator('//div[contains(@class, "cls-wall-calendar")][contains(@style, "rgb(232, 182, 137)")][not(ancestor::td[contains(@class, "p-datepicker-other-month")])]');
        this.month = this.page.locator('button.p-datepicker-month').textContent();
        this.year = this.page.locator('button.p-datepicker-year').textContent();
    
    }

    async getCalendarData() {
    
    return {
      today: await this.getDates(this.today),
      holidays: await this.getDates(this.holidays),
      absentDays: await this.getDates(this.absentDays),
      weekends: await this.getDates(this.weekends),
      presentDays: await this.getDates(this.presentDays),
      leaveDays: await this.getDates(this.leaveDays),
      
    };
    }

    async getDates(locator) {
        const dates = [];
        const count = await locator.count();
        for (let i = 0; i < count; i++) {
            const date = await locator.nth(i).textContent();
            dates.push(date.trim());
        }
        return dates;
 
    }


}

module.exports = { AttendanceCalendarData };
