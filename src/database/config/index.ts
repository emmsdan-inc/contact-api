import colorsCli from 'colors-cli/safe'
import random from 'lodash/random'
const config = require ('./config')
const dbLogger = (...logs) => {
    const colors = ['red','italic', 'green', 'blue', 'yellow', 'white', 'green_bbt']
    logs.forEach(msg => {
        if (typeof msg !== 'string') {
            console.log(msg)
        }
        console.log(colorsCli.bold[colors[random(0,colors.length - 1)]](msg))
    })
}
config.development.logging = dbLogger
config.test.logging = dbLogger
export default config