exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['Test/DemoSuite.js'],
    /**
     * Sauce Execution Set up for mobile automation (android).
     * Since sauce does not support execution on Chrome the default browser is being used.
     */
    sauceUser: 'arjun_rajeev',
    sauceKey: '226441b2-737e-4be7-bf05-dc67cffae230',
    //capabilities: {
    //    build: "1",
    //    browserName: 'Browser',
    //    'appium-version': '1.4',
    //    platformName: 'Android',
    //    platformVersion: '4.4',
    //    deviceName: 'Google Nexus 7 HD Emulator',
    //    name: 'CrowdyNews Demo'
    //},
    framework: 'jasmine2',
    onPrepare: function () {
        /**
         * Set up for non angular testing.
         */
        browser.ignoreSynchronization = true;
        global.driver = browser.driver;
        driver.manage().timeouts().implicitlyWait(60000);

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

        /**
         * Report Listener set up.
         */
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: 'jUnitReports',
            filePrefix: 'Suite Results'
        }));
    }
};

