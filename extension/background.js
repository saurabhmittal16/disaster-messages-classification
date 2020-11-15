chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {hostEquals: 'twitter.com'},
                })
            ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.pageAction.onClicked.addListener(function (tab) {
    console.log("Clicked extension icon");
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "find_tweets"});
    });
});

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });

    return response.json();
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "predict") {
            console.log("Making prediction request");
            postData("http://localhost:5000/predict", {
                "sentences": request.sentences
            }).then(
                data => sendResponse(data)
            );
        }
        return true;
    }
);

