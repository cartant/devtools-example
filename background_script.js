"use strict";

const pairs = {};

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

    const listener = message => {
        const destinationPort = pair[destination];
        if (destinationPort) {
            console.log(`relaying a message from the ${source} port to the ${destination} port on tab ${tabId}`, message);
            destinationPort.postMessage({ ...message, source });
        } else {
            console.log(`cannot relay; the ${destination} port is not connected on tab ${tabId}`, message);
        }
    };

    connectedPort.onDisconnect.addListener(() => {
        console.log(`disconnected the ${source} port on tab ${tabId}`);
        pair[source] = undefined;
    });
    connectedPort.onMessage.addListener(listener);
});

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