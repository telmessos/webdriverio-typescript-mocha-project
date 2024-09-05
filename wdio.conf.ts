import type { Options } from '@wdio/types'
import { browser } from '@wdio/globals'

const settings = require('./settings.ts');

let baseUrl: string
let browserName: string
const argv = require('yargs').argv;
const ENV = argv.Env || process.env.Env || 'local'; // If the Env variable is not set, it will be local by default
const BROWSER = argv.Browser || process.env.Browser || 'chrome' // If the Browser variable is not set, it will be chrome by default

console.log('------------------------------------- ' + ENV + ' -------------------------------------')
console.log('------------------------------------- ' + BROWSER + ' -------------------------------------')

// If the variable Env is set, but it does not match the ones in settings.ts, throw an error and exit
// Else set baseUrl to the selected environment
if(Object.keys(settings.urls).includes(ENV)) {
    baseUrl = settings.urls[ENV]
} else {
    console.error('Can\'t run tests. You need to add environment info to the run command. Check settings.ts file ' +
        'Eg. npm run test Env=local')
    process.exit()
}

// If the variable Browser is set, but it does not match the ones in settings.ts, throw an error and exit
// Else set Browser to the selected browser
if(Object.keys(settings.browsers).includes(BROWSER)) {
    browserName = settings.browsers[BROWSER]
} else {
    console.error('Can\'t run tests. You need to add browser info to the run command. Check settings.ts file ' +
        'Eg. npm run test Browser=chrome  (chrome, firefox, edge, safari)')
    process.exit()
}
console.log('')
export const config: Options.Testrunner = {
    //
    // ====================
    // Runner Configuration
    // ====================
    // WebdriverIO supports running e2e tests as well as unit and component tests.
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    specs: [
        './test/specs/**/*.ts'
    ],
    suites: {
        smoke: [
            './test/specs/smoke/*.ts'
        ],
        regression: [
            './test/specs/regression/*.ts'
        ]
    },
    maxInstances: 1,
    capabilities: [{
        browserName: browserName,
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--disable-dev-shm-usage',
                '--headless',
                '--disable-gpu',
                '--window-size=1440,735'
            ],
        }
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: baseUrl,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [['allure',
        {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }
    ]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    before: async function (): Promise<void> {
        await browser.maximizeWindow();
    },

    afterEach: async function (
        step,
        scenario,
        { error, duration, passed },
        context,
    ): Promise<void> {
        if(error) {
            await browser.takeScreenshot();
        }
    },
}
