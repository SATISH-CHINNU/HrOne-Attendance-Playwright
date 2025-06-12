class DashboardPopupIframes {


constructor(page) {

    this.iframe1 = page.frameLocator('iframe#_blitz-frame');
    this.closeBtn = this.iframe1.locator(".close-btn");
    this.dialogIcon = page.locator("div[role='dialog'] .material-icons");

}

async closeDialogs() {
        try {
            await this.closeBtn.waitFor({ state: 'visible', timeout: 500 });
            await this.closeBtn.click();
        } catch (e) {
            // If not visible after 500ms, skip to dialog icon
        }
        await this.dialogIcon.click();
    }
}

module.exports = { DashboardPopupIframes };
