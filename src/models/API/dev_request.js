const {expect} = require('@playwright/test')

const baseUrl = ''

module.exports = class Request {

    constructor(playwright){
        this.playwright = playwright;
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

        const status = (await response.status())
        const parsingData = JSON.parse((await response.body()).toString())
        this.apiToken =  parsingData.token

       //check
        expect(parsingData.hasOwnProperty('token')).toBeTruthy();
        expect(status).toEqual(200)
        console.log(`Token successful received - ${this.apiToken}`)
    
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
    }


    //Executing test steps
    async execute(){

        let parsingData,response,status,booking
          //1) Creating booking
         response = await this.apiContext.post('/booking',{
            data:{
            "firstname" : "erez",
            "lastname" : "asmara",
            "totalprice" : 333,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"

            }
            })

        status = (await response.status())
        parsingData = JSON.parse((await response.body()).toString())
        const bookId =  parsingData.bookingid

        //check result
        expect(status).toEqual(200)
        expect(parsingData.hasOwnProperty('bookingid')).toBeTruthy();


        //2) Getting booking before change
        response = await this.apiContext.get(`/booking/${bookId}`)

        status = (await response.status())
        parsingData = JSON.parse((await response.body()).toString())
        booking = parsingData
        
        //check result
        expect(status).toEqual(200)
        expect(parsingData.hasOwnProperty('lastname')).toBeTruthy();
        expect(booking.firstname).toBe('erez')

    
        
        //3) Update booking
        response = await this.apiContext.put(`/booking/${bookId}`,{
            data:{
            "firstname" : "suvesu",
            "lastname" : "asmara",
            "totalprice" : 1000,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2011-01-01",
                "checkout" : "2013-01-01"
            },
            "additionalneeds" : "dinner"

            }
            })
         status = (await response.status())

         //check result
         expect(status).toEqual(200)       


        //4) Getting booking after changed
        response = await this.apiContext.get(`/booking/${bookId}`)

        status = (await response.status())
        parsingData = JSON.parse((await response.body()).toString())
        booking = parsingData

        //check result
        expect(status).toEqual(200)
        expect(parsingData.hasOwnProperty('additionalneeds')).toBeTruthy();
        expect(booking.firstname).toBe('suvesu')
    }


    //Terminate process
    async dispose(){
         await this.apiContext.dispose();
    } 


// End.
}
