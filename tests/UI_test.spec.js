const { test, expect } = require('@playwright/test');
const HomePage = require('../src/models/UI/home_page')
const SignupPage = require('../src/models/UI/signup_page')
const LoginPage = require('../src/models/UI/login_page')
const dataTest_ = require('../src/test-data/data.json')



//################### POM UI tests ###################
//Support Parallel, Grouping, TDD 
let dataTest = dataTest_.ui_data_test

test.describe.parallel('New user login @ui_test', () => {
  //single page test
  let page;

  //Before all do this actions
  test.beforeAll(async ({browser}) => {
     page = await browser.newPage()
     const signupPage = new SignupPage(page)
  
     page.on('dialog', async(dialog) => { 
      console.log(dialog.message())
      expect(['This user already exist.','Sign up successful.']).toContain(dialog.message());
      await dialog.accept();
      });
  
    await signupPage.navigate()
    await signupPage.signUp(dataTest[0].user,dataTest[0].password)
  });
  

  
  test('Login with correct password', async () =>{  
    const loginPage = new LoginPage(page)
    await loginPage.navigate()
    await loginPage.login(dataTest[0].user,dataTest[0].password)

    const homePage = new HomePage(page)
    await homePage.navigate()
    await homePage.delay(1000) //page loading content (wait 2 second)
    const userName = await homePage.userIsLogin()
    expect([`Welcome ${dataTest[0].user}`]).toContain(userName)
  })


   //After all 
   test.afterAll(async () => {
    const homePage = new HomePage(page)

    await homePage.navigate()
    await homePage.logout()
    await homePage.delay(1000)
    let btnLogin = await homePage.userIsLogout()
    await expect(btnLogin).toBeVisible()

    await page.close()
  });
 

});


// test('Signup test', async ({page}) =>{  
 
//   const signupPage = new SignupPage(page)
  
//   page.on('dialog', async(dialog) => { 
//     console.log(dialog.message())
//     expect(['This user already exist.','Sign up successful.']).toContain(dialog.message());
//     await dialog.accept();
//     });

//   await signupPage.navigate()
//   await signupPage.signUp('erez','1234')

// })


// test('Login with wrong password', async ({page}) =>{  
 
//   const loginPage = new LoginPage(page)
  
//   page.on('dialog', async(dialog) => { 
//     console.log(dialog.message())
//     expect(['Wrong password.']).toContain(dialog.message());
//     await dialog.accept();
//     });

//   await loginPage.navigate()
//   await loginPage.login('erez','90$21')

// })

// test('Login with correct password', async ({page}) =>{  
 
//   const loginPage = new LoginPage(page)
//   await loginPage.navigate()
//   await loginPage.login('erez','1234')

//   const homePage = new HomePage(page)
//   await homePage.navigate()
//   await homePage.delay(1000) //page loading content (wait 2 second)
//   const userName = await homePage.userIsLogin()
//   expect(['Welcome erez']).toContain(userName)


// })

// test('Logout user',async ({page})=>{

//   // const loginPage = new LoginPage(page)
//   // await loginPage.navigate()
//   // await loginPage.login('erez','1234')

//   const homePage = new HomePage(page)
//   await homePage.navigate()
//   await homePage.logout()
//   await homePage.delay(1000)
//   let btnLogin = await homePage.userIsLogout()
//   await expect(btnLogin).toBeVisible()

// })



