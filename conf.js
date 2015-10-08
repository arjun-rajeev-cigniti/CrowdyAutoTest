exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['Test/DemoSuite.js'],
    /**
     * Sauce Execution Set up for mobile automation (android).
     * Since sauce does not support execution on Chrome the default browser is being used.
     */
    sauceUser: process.env.SAUCE_USER,
    sauceKey: process.env.SAUCE_KEY,
    //capabilities: {
    //    build: "1",
    //    browserName: 'Browser',
    //    'appium-version': '1.4',
    //    platformName: 'Android',
    //    platformVersion: '4.4',
    //    deviceName: 'Google Nexus 7 HD Emulator',
    //    name: 'CrowdyNews Demo'
    //},

    //capabilities: {
    //        browserName: 'chrome',
    //    chromeOptions: {
    //        args: [
    //            '--start-maximized'
    //        ]
    //    }
    //    },


    multiCapabilities: [{
        'browserName': 'chrome'
    }, {
        'browserName': 'firefox'
    }
        //{
        //    browserName: 'chrome',
        //    'appium-version': '1.4',
        //    platformName: 'Android',
        //    platformVersion: '4.4',
        //    deviceName: 'oneplus one',
        //    name: 'CrowdyNews Demo',
        //    seleniumAddress: 'http://localhost:4723/wd/hub'
        //}
    ],

    framework: 'jasmine2',
    restartBrowserBetweenTests: true,
    onPrepare: function () {
        /**
         * Set up for non angular testing.
         */

        //browser.ignoreSynchronization = true;
        //global.driver = browser.driver;
        //driver.manage().timeouts().implicitlyWait(60000);

        /**
         * Abstraction for findElement.
         */
        global.$element = function (locator) {
            return driver.findElement(locator);
        };

        /**
         * Abstraction for findElements.
         */
        global.$elements = function (locator) {
            return driver.findElements(locator);
        };

        /**
         * Abstraction for locator strategy.
         */
        global.$locator = function (byCss) {
            return by.css(byCss);
        };

        global.$locatorxpath = function (byXpath) {
            return by.xpath(byXpath);
        };

        /**
         * Report Listener set up.
         */
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: 'jUnitReports',
            filePrefix: 'Suite Results'
        }));
        var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: 'jUnitReports/',
            screenshotsFolder: 'images',
            takeScreenshots: true,
            takeScreenshotsOnlyOnFailures: true
        }));
    }
};

