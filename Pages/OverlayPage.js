/**
 * The Page Object Representation of the Overlay page.
 */
var OverlayPage = function() {

    var overlaySelf = $locator('.overlay-media');
    var overlayContentLink = $locator('.overlayLeftPanel .content-title-link');
    var overlayTwitterShare = $locator('.overlayLeftPanel .btn.share-twitter');

    /**
     * Wait for the overlay page to be displayed.
     */
    this.isDisplayed = function(){
        driver.wait(function () {
            return driver.isElementPresent(overlaySelf);
        }, 15000);
    };

    /**
     * Select the tweet option.
     */
    this.tweet = function() {
        $element(overlayTwitterShare).click();
    };

    /**
     * Get the topic text.
     * @returns {string|webdriver.promise.Promise<string>|webdriver.promise.Promise<string[]>}
     */
    this.getOverlayTitleText = function() {
        return $element(overlayContentLink).getAttribute('textContent');
    };
};
module.exports = OverlayPage;