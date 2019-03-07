chrome.runtime.onConnect.addListener(port => {
    const { inspectedIabId, name } = parse(port);
    console.log(`connect: ${name} ${inspectedIabId}`);
});

chrome.runtime.onConnect.removeListener(port => {
    const { inspectedIabId, name } = parse(port);
    console.log(`disconnect: ${name} ${inspectedIabId}`);
});

function parse(port) {
    const match = port.name.match(/panel@(\d+)/);
    if (match) {
        return {
            inspectedIabId: match[1],
            name: "panel"
        };
    }
    return {
        inspectedIabId: port.sender.tab.id.toString(),
        name: port.name
    };
}