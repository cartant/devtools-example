"use strict";

// Store a map of content and panel ports keyed by tab ID.

const pairs = {};

// When a content script or panel connects, make sure a pair exists and that
// the connected port is assigned to the appropriate property.

chrome.runtime.onConnect.addListener(connectedPort => {

    const { tabId, source, destination } = info(connectedPort);
    console.log(`connected the ${source} port on tab ${tabId}`);

    let pair = pairs[tabId];
    if (!pair) {
        pairs[tabId] = pair = {
            content: undefined,
            panel: undefined
        };
    }
    pair[source] = connectedPort;

    // When a message is received from the connected port, forward the message
    // to the destination port.

    const listener = message => {
        const destinationPort = pair[destination];
        if (destinationPort) {
            console.log(`relaying a message from the ${source} port to the ${destination} port on tab ${tabId}`, message);
            destinationPort.postMessage(message);
        } else {
            console.log(`cannot relay; the ${destination} port is not connected on tab ${tabId}`, message);
        }
    };

    // Clean up when the connected port disconnects - i.e. with either the tab
    // or the DevTools are closed.

    connectedPort.onDisconnect.addListener(() => {
        console.log(`disconnected the ${source} port on tab ${tabId}`);
        pair[source] = undefined;
    });
    connectedPort.onMessage.addListener(listener);
});

// When the content script connects to the background script, it will have been
// called within the inspected page. That means the tab ID will be specifed in
// the port's sender.
//
// When the panel connects, its port's sender will not have a tab ID. However,
// within the panel, the ID can be obtained from `chrome.devtools`, so the ID
// is encoded in the port name.

function info(port) {
    const match = port.name.match(/panel@(\d+)/);
    if (match) {
        return {
            tabId: match[1],
            source: "panel",
            destination: "content"
        };
    }
    return {
        tabId: port.sender.tab.id.toString(),
        source: "content",
        destination: "panel"
    };
}