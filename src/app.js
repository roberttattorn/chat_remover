(function() {
    async function setup() {
         // Lets query the chat frame
        var yt_frame = document.querySelectorAll('ytd-live-chat-frame');
        // If something is found, lets remove it
        var div = document.querySelector('.chatInnerDiv');
        var division = document.querySelector('#panels-full-bleed-container');
        // If something is found, lets remove it
        if(div) {
            div.remove();
        }
        if(division)
            division.remove();
        if(yt_frame.length) {
            await browser.storage.local.get('yt_chat_blocker')
                .then((res) => {
                    if (res.yt_chat_blocker) {
                        yt_frame.forEach(function(element){
                            // remove element
                            //element.style.display = 'none';
                            const cinemaModeButton = document.querySelector('.ytp-size-button');
        const chatContainer = document.querySelector('ytd-live-chat-frame');
        
        if (cinemaModeButton && chatContainer) {
            // Close chat if Cinema Mode is enabled
            if (!chatContainer.hasAttribute('hidden')) {
                const closeButton = chatContainer.querySelector('ytd-button-renderer');
                if (closeButton) {
                    closeButton.click();
                    chatContainer.remove();
                }
            }
        }
                        });
                    }
            });
        }
    }

    async function handleChange(change) {
        if (change.yt_chat_blocker != undefined) {
            var value = change.yt_chat_blocker.newValue != undefined 
                && change.yt_chat_blocker.newValue != null ? 
                    change.yt_chat_blocker.newValue : 
                    !!change.yt_chat_blocker.oldValue;
            // Lets query the chat frame
            var yt_frame = document.querySelectorAll('ytd-live-chat-frame');
            var division = document.querySelector('#panels-full-bleed-container');
            if(division)
                division.remove();
            // If something is found, lets remove it
            yt_frame.forEach(function(element){
                // removing element
                //element.style.display = value ? 'none' : null;
                const cinemaModeButton = document.querySelector('.ytp-size-button');
        const chatContainer = document.querySelector('ytd-live-chat-frame');
        
        if (cinemaModeButton && chatContainer) {
            // Close chat if Cinema Mode is enabled
            if (!chatContainer.hasAttribute('hidden')) {
                const closeButton = chatContainer.querySelector('ytd-button-renderer');
                if (closeButton) {
                    closeButton.click();
                    chatContainer.remove();
                }
            }
        }
            });
        }
    }

    var yt_chat_blocker = new MutationObserver(setup);

    yt_chat_blocker.observe(document.querySelector('body'), {
        childList: true,
        subtree: true,
    });

    browser.storage.onChanged.addListener(async (changes, areaName) => {
        if (areaName == 'local') {
            await handleChange(changes);
        }
    });
})();
