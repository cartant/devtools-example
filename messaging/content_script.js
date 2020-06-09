"use strict";

const backgroundConnection = chrome.runtime.connect({
    name: "content"
});

// Listen for messages posted from the extension class that will be injected
// into the inspected page. Filter messages using the source to ignore other
// uses of `window.postMessage` within the inspected page.
//
// Forward the messages to the background script.
//
// Note that the Chrome `postMessage` differs from `window.postMessage` in that
// the message is not wrapped in an `Event` - the message body is posted and
// received directly.

window.addEventListener("message", event => {
    if ((event.source === window) && event.data && (event.data.source === "devtools-example-content")) {
        backgroundConnection.postMessage(event.data.message);
    }
});

// Listen for messages posted by the background script and forward the messages
// to the injected extension class via `window.postMessage`.
//
// Note that a specific source is used to indicate the the message has been
// relayed from the DevTools panel.

backgroundConnection.onMessage.addListener(message => {
    window.postMessage({
        message,
        source: "devtools-example-panel"
    }, "*");
});

// This function will be injected into the inspected page by inserting a
// `script` element into the DOM. The content script has read-write access to
// the page's DOM, but the content script runs in a separate JavaScript realm,
// so it's not possible to just add the `Extention` object to `window` - the
// inspected page and content script have separate `window` objects.
//
// `toString` will be called on the function - to obtain the content for the
// `script` element - and that means the code within it cannot reference
// anything outside of it.

function installExtension(window) {
    class Extension {

        // The application in the inspected page can call `listen` to receive
        // messages from the DevTools panel.

        listen(listener) {
            const unwrapper = event => {
                if (event.data.source === "devtools-example-panel") {
                    listener(event.data.message);
                }
            }
            window.addEventListener("message", unwrapper);
            return () => window.removeEventListener("message", unwrapper);
        }

        // The application can call `post` to send messages to the DevTools
        // panel.

        post(message) {
            window.postMessage({
                message,
                source: "devtools-example-content"
            }, "*");
        }
    }

    // Make the extension instance available by adding an extention-specific
    // property to `window`.

    Object.defineProperty(window, "__DEVTOOLS_EXAMPLE_EXTENSION__", {
        value: new Extension()
    });
}

// Inject the extension into the inspected page's DOM.

const script = document.createElement("script");
script.textContent = `;(${installExtension.toString()}(window))`;
document.documentElement.appendChild(script);
document.documentElement.removeChild(script);