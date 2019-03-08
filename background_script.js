"use strict";

const pairs = {};

chrome.runtime.onConnect.addListener(port => {

    const { inspectedTabId, name, otherName } = parse(port);
    console.log(`connected the ${name} port`);

    let pair = pairs[inspectedTabId];
    if (!pair) {
        pairs[inspectedTabId] = pair = {
            content: undefined,
            panel: undefined
        };
    }
    pair[name] = port;

    const listener = message => {
        const otherPort = pair[otherName];
        if (otherPort) {
            console.log(`relaying a message from the ${name} port to the ${otherName} port`, message);
            otherPort.postMessage({ ...message, source: name });
        } else {
            console.log(`cannot relay; the ${otherName} port is not connected`, message);
        }
    };

    port.onDisconnect.addListener(() => {
        console.log(`disconnected the ${name} port`);
        pair[name] = undefined;
    });
    port.onMessage.addListener(listener);    
});

function parse(port) {
    const match = port.name.match(/panel@(\d+)/);
    if (match) {
        return {
            inspectedTabId: match[1],
            name: "panel",
            otherName: "content"
        };
    }
    return {
        inspectedTabId: port.sender.tab.id.toString(),
        name: port.name,
        otherName: "panel"
    };
}