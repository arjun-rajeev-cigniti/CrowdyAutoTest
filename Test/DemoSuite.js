/// < reference path="../Utils/angular-protractor.d.ts" />

var CrowdyNewsPage = require('../Pages/CrowdyNewsPage.js');
var OverlayPage = require('../Pages/OverlayPage.js');
var TweetPage = require('../Pages/TweetPage.js');

describe('Crowdy News Topic twitter sharing', function () {

    var crowdyNewsPage;
    var overlayPage;
    var tweetPage;

    /**
     * Set up before test methods.
     * Initiates all the page objects for testing.
     */
    beforeEach(function () {
        crowdyNewsPage = new CrowdyNewsPage();
        overlayPage = new OverlayPage();
        tweetPage = new TweetPage();
    });

    it('should display a tweet pop up with the topic as the default text', function () {
        crowdyNewsPage.get();
        crowdyNewsPage.selectTopicWithTweetsMoreThan(45);
        overlayPage.isDisplayed();
        overlayPage.getOverlayTitleText().then(function (text) {
            overlayPage.tweet();
            expect(tweetPage.defaultText()).toEqual(text);
        });
    });
});