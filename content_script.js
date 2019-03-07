"use strict";

const backgroundConnection = chrome.runtime.connect({
    name: "content"
});

window.addEventListener("message", event => {
    if ((event.source === window) && event.data && (event.data.source === "devtools-example-content")) {
        backgroundConnection.postMessage({
            ...event.data.message,
            source: "content"
        });
    }
});

backgroundConnection.onMessage.addListener(message => {
    if (message.source === "panel") {
        window.postMessage({
            message,
            source: "devtools-example-panel"
        }, "*");
    }
});


function installExtension(window) {

    class Extension {
        listen(listener) {
            const unwrapper = event => listener(event.data.message);
            window.addEventListener("message", unwrapper);
            return () => window.removeEventListener("message", unwrapper);
        }
        post(message) {
            window.postMessage({
                message,
                source: "devtools-example-content"
            }, "*");
        }
    }

    Object.defineProperty(window, "__DEVTOOLS_EXAMPLE_EXTENSION__", {
        value: new Extension()
    });
}

const script = document.createElement("script");
script.textContent = `;(${installExtension.toString()}(window))`;
document.documentElement.appendChild(script);
document.documentElement.removeChild(script);