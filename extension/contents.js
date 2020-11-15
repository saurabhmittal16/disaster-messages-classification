console.log("Extension is running content scripts")

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "find_tweets") {
            let sentences = []
            const tweets = [...document.querySelectorAll('article')]
            tweets.forEach(
                tweet => sentences.push(
                    tweet.firstElementChild.firstElementChild.firstElementChild.children[1].children[1].children[1].innerText
                )
            )

            chrome.runtime.sendMessage({
                "message": "predict",
                "sentences": sentences
            }, function(data) {
                console.log(data)
            })
        }
    }
);