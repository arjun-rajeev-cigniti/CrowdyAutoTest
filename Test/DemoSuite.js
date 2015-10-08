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
    //Initialize the Browser instance before each test.

    beforeEach(function () {
        browser.ignoreSynchronization = true;
        global.driver = browser.driver;
        driver.manage().timeouts().implicitlyWait(60000);
        crowdyNewsPage = new CrowdyNewsPage();
        overlayPage = new OverlayPage();
        tweetPage = new TweetPage();

        browser.getCapabilities().then(function(caps) {
            if(caps.caps_.platform.valueOf().toLowerCase().trim() !== (new String('android').valueOf() || new String('ios').valueOf())){
                console.log("Values in True : " + caps.caps_.platform.valueOf());
                driver.manage().window().maximize();
            }else{
                console.log("Values in False : " + caps.caps_.platform.valueOf());
            }
        });
    });



    it('should display a tweet pop up with the topic as the default text', function () {
        crowdyNewsPage.get();
        crowdyNewsPage.selectTopicWithTweetsMoreThan(40);
        overlayPage.isDisplayed();
        overlayPage.getOverlayTitleText().then(function (text) {
            overlayPage.tweet();
            expect(tweetPage.defaultText()).toEqual(text);
        });
    });

    it('The content on the 5 re-tweets on the right all have the same author name', function () {
        crowdyNewsPage.get();
        crowdyNewsPage.selectTopicWithTweetsMoreThan(40);
        overlayPage.isDisplayed();
        //Validate all the Author names displayed on Right are same
        overlayPage.validateNames().then(function(boolval){
            console.log("Return Value : " + boolval);
            expect(boolval).toBe(true);
        });
    });


});