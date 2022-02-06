const BasePage = require("./base_page");
const HomePage = require("./home_page");

//Sign up
class SignUp extends BasePage{

    constructor(page){
        super(page)
        //Selectors
        this.registerButtonProcess = '#signin2'
        this.userName =  '#sign-username';
        this.password =  '#sign-password';
        this.signupButton = '#signInModal .btn.btn-primary'

    }

    /**
     * signup method
     * @param {string} username
     * @param {string} password
     */
    async signUp(username,password){

        await this.page.fill(this.userName,username)
        await this.page.fill(this.password,password)
        await this.page.click( this.signupButton)
        await super.delay(1000)

    }

    //Navigate to login page
    async navigate(){
        await super.navigate('index.html')
        await this.page.click(this.registerButtonProcess)
    }

}

module.exports = SignUp