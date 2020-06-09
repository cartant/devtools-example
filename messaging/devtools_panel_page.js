"use strict";

// Connect to the background script. Note that the inspected tab ID is encoded
// in the port name.

const backgroundConnection = chrome.runtime.connect({
  name: `panel@${chrome.devtools.inspectedWindow.tabId}`,
});

// Listen for messages from the content script.

backgroundConnection.onMessage.addListener((message) => {
  console.log("received", message);
  document.querySelector("#received").innerHTML = JSON.stringify(message);
});

// Whenever the 'Post' button is clicked, post a message to the extension that
// was injected into the content script.

document.querySelector("#post").addEventListener("click", () => {
  const message = {
    data: "from panel",
    timestamp: Date.now(),
  };
  console.log("posting", message);
  backgroundConnection.postMessage(message);
});
