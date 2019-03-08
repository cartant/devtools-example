"use strict";

const pairs = {};

chrome.runtime.onConnect.addListener(port => {
    const { inspectedIabId, name, otherName } = parse(port);
    console.log(`connected the ${name} port`);
    let pair = pairs[inspectedIabId];
    if (!pair) {
        pairs[inspectedIabId] = pair = {
            contentPort: undefined,
            contentTeardown: undefined,
            panelPort: undefined,
            panelTeardown: undefined
        };
    }
    const listener = message => {
        const otherPort = pair[`${otherName}Port`];
        if (otherPort) {
            console.log(`relaying a message from the ${name} port to the ${otherName} port`, message);
            otherPort.postMessage({ ...message, source: name });
        } else {
            console.log(`cannot relay; the ${otherName} port is not connected`, message);
        }
    };
    port.onMessage.addListener(listener);
    pair[`${name}Port`] = port;
    pair[`${name}Teardown`] = () => port.onMessage.addListener(listener);
});

chrome.runtime.onConnect.removeListener(port => {
    const { inspectedIabId, name } = parse(port);
    console.log(`disconnected the ${name} port`);
    const pair = pairs[inspectedIabId];
    if (pair) {
        pair[`${name}Teardown`]();
        pair[`${name}Teardown`] = undefined;
        pair[`${name}Port`] = undefined;
    }
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