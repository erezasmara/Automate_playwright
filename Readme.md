# Automate test via Playwright.js framework

### **Description** 
Automate test with playwright framework , written with javascript.\
the purpose of the project build automation system test for UI and API.\
REFERENCES: playwright.dev/docs/pom

- APIS TEST PROJECT
  - Project: restful-booker
  - website: https://restful-booker.herokuapp.com
  - type: restful api test 

 <BR>

- UI TEST PROJECT
  - Project: demoblaze
  - website: https://www.demoblaze.com/
  - type: user interaction tests
  
 <BR>
 <BR>

**Project structure**
```
── playwright_pom
   ├─ Readme.md
   ├─ package-lock.json
   ├─ package.json
   ├─ playwright-report
   │  └─ index.html
   ├─ playwright.config.js
   ├─ src
   │  ├─ models
   │  │  ├─ API
   │  │  │  ├─ api_request.js
   │  │  │  └─ base_request.js
   │  │  └─ UI
   │  │     ├─ base_page.js
   │  │     ├─ home_page.js
   │  │     ├─ login_page.js
   │  │     └─ signup_page.js
   │  └─ test-data
   │     └─ data.json
   └─ tests
      ├─ APIs_test.spec.js
      └─ UI_test.spec.js
```
 
 **Precondition**
 - node.js v12.19.1 or above
 - playwright framework

**Installation**
```js
/*
$ git clone <https git repository>
$ npm i -D @playwright/test
$ npx playwright install
*/
```
**Execution with terminal**
```js
//Run both ui & api test
$ npx playwright test
//Run api test 
$ npx playwright test --grep @api_test
//Run ui test 
$ npx playwright test --grep @ui_test 
//Run ui test with debug mode
$ npx playwright test --grep @ui_test --debug
//Run ui test only with firefox browser
$ npx playwright test --grep @ui_test  --project=firefox 

//Check report (html)
$ npx playwright show-report

```

**Output**
![Screen Shot 2022-02-06 at 14 13 13](https://user-images.githubusercontent.com/33747218/152680215-b2187098-03fc-46a9-9943-c141ef8de6ac.png)

<BR>

**Have fun!.**

<BR>
<BR>
<BR>
erezAs (c)
