const { test, expect } = require('@playwright/test');
const ApiRequest = require('../src/models/API/api_request')
const dataTest_ = require('../src/test-data/data.json')

//################### POM API tests ###################
//Support: Serial, Grouping 
let dataTest = dataTest_.api_data_test[0]

test.describe.serial('auth, create, update booking test @api_test',() =>{
  //Single request
  let request,parsingData,status
  //Before all
  test.beforeAll(async ({playwright}) =>{
    request = new ApiRequest(playwright);
    const response = await request.accessToken();
    const status = await response.status()
    const parsingData = JSON.parse((await response.body()).toString())

    //check
    expect(parsingData.hasOwnProperty('token')).toBeTruthy();
    expect(status).toEqual(200)

    //Init Header with token 
    await request.initHeader()
  })

  //Start execute tests.
  //1)
  test('Create booking', async ()=>{
 
    const response = await request.apiContext.post('/booking',{
      data:dataTest.create_data
      })

      status = (await response.status())
      parsingData = JSON.parse((await response.body()).toString())
      request.bookingId = parsingData.bookingid

      //check result
      expect(status).toEqual(200)
      expect(parsingData.hasOwnProperty('bookingid')).toBeTruthy();
      console.log('booking has been created ..')
  })

  //2)
  test('Get created booking', async ()=>{
    const response = await request.apiContext.get(`/booking/${request.bookingId}`)
   
    status = (await response.status())
    parsingData = JSON.parse((await response.body()).toString())
    
    //check result
    expect(status).toEqual(200)
    expect(parsingData.hasOwnProperty('lastname')).toBeTruthy();
    expect(parsingData.firstname).toBe('erez')
    console.log('created booking has arrived')
  })

  //3)
  test('Update booking', async ()=>{
    const response = await request.apiContext.put(`/booking/${request.bookingId}`,{
      data:dataTest.update_data
      })

      status = (await response.status())
      parsingData = JSON.parse((await response.body()).toString())

      //check result
      expect(status).toEqual(200)
      expect(parsingData.firstname).toBe('suvesu')
      console.log('booking has been updated')

  })

  //4)
  test('Get updated booking', async ()=>{
    const response = await request.apiContext.get(`/booking/${request.bookingId}`)
   
    status = (await response.status())
    parsingData = JSON.parse((await response.body()).toString())
    
    //check result
    expect(status).toEqual(200)
    expect(parsingData.firstname).toBe('suvesu')

    console.log('updated booking has arrived')

  })


  //Terminate api process
  test.afterAll(async() =>{
    await request.dispose()
  })

})
