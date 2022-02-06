
// REF. playwright.dev/docs/pom
/**
 * Project: demoblaze
 * Author: erez asmara
 * website: https://www.demoblaze.com/
 * type: user interface tests
 */

class BasePage {

    constructor(page){
        this.page = page
    }

    /**
     * method to navigate
     * @param {number} ms
     */

    async delay(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    /**
     * method to navigate
     * @param {string} path
     */
    async navigate(path){
        await this.page.goto(`https://www.demoblaze.com/${path}`)
    }

}


module.exports = BasePage