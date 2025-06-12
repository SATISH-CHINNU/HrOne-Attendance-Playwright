class UserInfo {

    constructor(page) {
        this.page = page;
        this.user = page.locator(".link-on-hover").first();
        this.userName = page.locator("//div[contains(@class, 'message-container')]//h2//strong");
        this.userEmpID = page.locator("//div//span[contains(@class, 'overlay-panel-tag')][1]").first();
        this.userEmail = page.locator("//div//span[contains(@class, 'overlay-panel-tag')][1]").nth(1);
        
    }

    async getUserInfo() {
        await this.user.hover();
        await this.userName.waitFor({ state: 'visible' });
        const name = await this.userName.textContent();
        const empId = await this.userEmpID.textContent();
        const email = await this.userEmail.textContent();
        await this.page.mouse.move(0, 0);
        return { name, empId, email };
    }
}

module.exports = { UserInfo };
