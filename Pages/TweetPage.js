/**
 * The Page Object representation of the tweet dialog.
 */
var TweetPage = function () {

    var loginAndTweet = $locator('input[type=submit]');
    /**
     * Return the default text from the tweet dialog.
     * @returns {webdriver.promise.Promise<T>}
     */
    this.defaultText = function () {
        driver.getAllWindowHandles().then(function (handles) {
            driver.switchTo().window(handles[1]);
        });
        driver.wait(function () {
            return driver.isElementPresent(loginAndTweet);
        }, 15000);
        driver.wait(function () {
            return driver.isElementPresent(loginAndTweet);
        }, 15000);
        return driver.executeScript('return window.getSelection().toString()');
    };
};
module.exports = TweetPage;