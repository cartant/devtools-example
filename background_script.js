"use strict";

const pairs = {};

chrome.runtime.onConnect.addListener(port => {

    const { inspectedIabId, name, otherName } = parse(port);
    console.log(`connected the ${name} port`);

    let pair = pairs[inspectedIabId];
    if (!pair) {
        pairs[inspectedIabId] = pair = {
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
            inspectedIabId: match[1],
            name: "panel",
            otherName: "content"
        };
    }
    return {
        inspectedIabId: port.sender.tab.id.toString(),
        name: port.name,
        otherName: "panel"
    };
}