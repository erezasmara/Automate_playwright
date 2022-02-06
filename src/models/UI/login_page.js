const BasePage = require('./base_page');
const HomePage = require('./home_page');


class LoginPage extends BasePage{

    constructor(page){
        super(page)

        //selector
        this.loginButtonProcess = '#login2'
        this.userName =  '#loginusername';
        this.password =  '#loginpassword';
        this.loginButton = '#logInModal .btn.btn-primary'

    }

    /**
     * login method
     * @param {string} username
     * @param {string} password
     */
    async login(username,password){

        await this.page.fill(this.userName,username)
        await this.page.fill(this.password,password)
        await this.page.click( this.loginButton)
        await super.delay(2000)

    }

    async navigate(){
        await super.navigate('index.html')
        await this.page.click(this.loginButtonProcess)

    }
}

module.exports = LoginPage