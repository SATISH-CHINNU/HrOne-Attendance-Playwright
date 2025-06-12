class LoginPage{

constructor(page) {
    this.page = page;
    this.usernameInput = page.locator("#hrone-username");
    this.passwordInput = page.locator("#hrone-password");
    this.loginBtn = page.locator('.ladda-label:visible');
  }


async goTO(){

    await this.page.goto("https://app.hrone.cloud/app");

}

async validLogin(Username, password) {

    await this.usernameInput.fill(Username);
    await this.loginBtn.click();
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
    
}

}

module.exports = { LoginPage };