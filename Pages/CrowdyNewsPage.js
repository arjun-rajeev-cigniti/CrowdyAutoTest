/**
 * The Page Object Representation of the Crowdy News page.
 */
var CrowdyNewsPage = function () {
    
    var topic = function (index) {
        return $locator('div[item=link]:nth-child(' + index + ')');
    };

    var topics = $locator('div[item=link]');
    var tweetCount = $locator('.kudos-count');
    
    /**
     * Navigate to the crowdy news page.
     */
    this.get = function () {
        driver.get('http://example.crowdynews.com/crowdynews/usa/politics/');
    };
    /**
     * Select any topic with a specified amount of tweets.
     * @param tweets - Desired number of tweets to be considered for selection.
     */
    this.selectTopicWithTweetsMoreThan = function (tweets) {
        var $scope = {topicSelected: false};
        driver.wait(function () {
            return driver.isElementPresent(topic(3))
        }, 30000);
        $elements(topics).then(function (topicItem) {
            for (var i = 0; i < topicItem.length; i++) {
                $scope.element = topicItem[i];
                topicItem[i].findElement(tweetCount).getAttribute('textContent').then(function (text) {
                    if (Number(text) > tweets && $scope.topicSelected == false) {
                        $scope.element.click();
                        $scope.topicSelected = true;
                    }
                });
            }
        }, function () {
            expect("Topic Selection").toBe("Successful, But found otherwise");
        });
    };
};

module.exports = CrowdyNewsPage;
