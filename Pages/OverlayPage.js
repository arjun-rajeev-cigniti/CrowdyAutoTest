/**
 * The Page Object Representation of the Overlay page.
 */
var OverlayPage = function() {

    var overlaySelf = $locator('.overlay-media');
    var overlayContentLink = $locator('.overlayLeftPanel .content-title-link');
    var overlayTwitterShare = $locator('.overlayLeftPanel .btn.share-twitter');
    var TweetAuthorLeft = $locatorxpath("//span[contains(@class,'overlay-author')]");
    var FirstReTweetAuthorName = $locatorxpath("(//div[@class='overlayRightPanel']//blockquote//span[@class='username']/a)[1]");
    var authorCount = $locatorxpath("(//div[@class='overlayRightPanel']//blockquote//span[@class='username']/a)[1]");

    /**
     * Wait for the overlay page to be displayed.
     */
    this.isDisplayed = function(){
        driver.wait(function () {
            return driver.isElementPresent(overlaySelf);
        }, 15000);
    };
    this.getWindowcount =  function(){

    }
    /**
     * Select the tweet option.
     */
    this.tweet = function() {
        $element(overlayTwitterShare).click(); //.then(function(){
        //    driver.sleep(3000);
        //});

    };

    /**
     * Get the topic text.
     * @returns {string|webdriver.promise.Promise<string>|webdriver.promise.Promise<string[]>}
     */
    this.getOverlayTitleText = function() {
        return $element(overlayContentLink).getAttribute('textContent');
    };

    /*
     * Get Author name from first 5 re-tweets, Compare each with each other
     * If All are same then compare them with the Author name from the left*/

    this.validateNames = function(){
        //Get authorname from first re-tweet
        driver.sleep(3000);
        retval =  $element(FirstReTweetAuthorName).getText().then(function(txt){
            console.log("FAN Number : " + txt);
            tmpVar =  txt;
            //Create a Xpath with retrived Author name
            var tmpxpath = $locatorxpath("//a[contains(text(),'"+txt+"')]/..");
            $elements(tmpxpath).then(function(elms)
            {
                tempcount =  elms.length;
            });

            var tmpxpath = $locatorxpath("//p[@class='content-twitter-tweet']");
            retval =  $elements(tmpxpath).then(function(retweetelms)
            {
                //Check if total tweet count on right is equal to the total elements count created by "AuthorName"
                if(retweetelms.length==tempcount){

                        return true;
                    }else{

                        return false;
                    }
            });
            return retval;
        });

        return retval;

    };

};
module.exports = OverlayPage;