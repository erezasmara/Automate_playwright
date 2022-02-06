// REF. playwright.dev/docs/pom
/**
 * Project: restful-booker
 * Author: erez asmara
 * website: https://restful-booker.herokuapp.com
 * type: restful api test 
 */

class BaseRequest {

    constructor(playwright){
        this.playwright = playwright
        this.apiContext;
        this.apiToken;
    }

    //Getting token
    async accessToken(){
         this.apiContext = await this.playwright.request.newContext({
            baseURL: 'https://restful-booker.herokuapp.com',
            extraHTTPHeaders:{
                'Accept': 'application/json',
            }
          });

        const response = await this.apiContext.post('/auth',{
            data:{
                "username": "admin",
                "password": "password123"
            }
        });

        this.apiToken =  JSON.parse((await response.body()).toString()).token
        console.log(`Token successful received...`)
        return await response
    }
    
    //Init Request header
    async initHeader(){
        this.apiContext = await this.playwright.request.newContext({

            baseURL:'https://restful-booker.herokuapp.com',
            extraHTTPHeaders:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${this.apiToken}`,
            }

        })
        console.log('Header defined with token...')
    }

    //Sleep 
    async delay(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    //Terminate process
    async dispose(){
        await this.apiContext.dispose();
        console.log('Process terminated...')
   } 

}

module.exports = BaseRequest