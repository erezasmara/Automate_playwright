
const BasePage = require('./base_page')

//Home page 
class HomePage extends BasePage{

    constructor(page){
        //Parent inheritance
        super(page);
        //Selector
        this.userNameId = '#nameofuser'
        this.logoutButtonId = '#logout2'
        this.loginButtonId = '#login2'
    }

    async userIsLogin(){
        return await this.page.locator(this.userNameId).innerText()
    }

    async userIsLogout(){
        return await this.page.locator(this.loginButtonId)
    }

    async logout(){
         await this.page.locator(this.logoutButtonId).click()
    }

    //Navigate to home page
    async navigate(){
        await super.navigate('index.html')
    }

}

module.exports = HomePage