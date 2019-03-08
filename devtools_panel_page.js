"use strict";

const backgroundConnection = chrome.runtime.connect({
    name: `panel@${chrome.devtools.inspectedWindow.tabId}`
});
backgroundConnection.onMessage.addListener(message => console.log("received", message));
document.querySelector("#post").addEventListener("click", () => {
    const message = { data: "from panel" };
    console.log("posting", message);
    backgroundConnection.postMessage(message);
});