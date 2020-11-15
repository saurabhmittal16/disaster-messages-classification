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
                if (data.success == true) {
                    data = data.response
                    for(let i = 0; i < data.length; i++) {
                        if (data[i].request == true) {
                            tweets[i].style.border = "solid 2px black"

                            let span = document.createElement('span')
                            span.style.marginTop = '30px';
                            span.style.marginLeft = '10px'

                            if (data[i].food == true) {
                                let img = document.createElement('img')
                                img.setAttribute('src', 'https://cdn.onlinewebfonts.com/svg/img_419722.png')
                                img.setAttribute('height', '20px')
                                span.appendChild(img)
                            }
                            if (data[i].water == true) {
                                let img = document.createElement('img')
                                img.setAttribute('src', 'https://cdn.onlinewebfonts.com/svg/img_317447.png')
                                img.setAttribute('height', '20px')
                                span.appendChild(img)
                            }
                            if (data[i].shelter == true) {
                                let img = document.createElement('img')
                                img.setAttribute('src', 'https://cdn.onlinewebfonts.com/svg/img_8.png')
                                img.setAttribute('height', '20px')
                                span.appendChild(img)
                            }

                            tweets[i].appendChild(span)
                        }
                    }
                }
            })
        }
    }
);