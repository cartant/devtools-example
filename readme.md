# devtools-example

This repo contains a simple DevTool that injects an `Extension` object into the inspected tab and implements bi-directional communication between said object and the DevTools panel.

The example's code contains comments that should explain how everything works and there is some official Chrome documentation here: [Extending DevTools](https://developer.chrome.com/extensions/devtools)

## Installing it

1. Browse to `chrome://extensions`.
2. Enable 'Developer Mode' - via the toggle in the page's top-right.
3. Click 'Load unpacked' and browse for the directory that contains `manifest.json`.

## Trying it out

1. Open `example_page.html` in a tab.
2. In another tab, open `chrome://extensions`. The extension's card will have a link named 'background page'. Clicking that will bring up the DevTools for the background script and the console on those DevTools will show what's logged within the background script. You should see that the content port has connected.
3. If you go back to the tab containing `example_page.html` and open the DevTools, you should see a panel named 'Example'. (You will likely have to click the drop-down menu on the right of the panel.)
4. The DevTools console output for the background script should now show that the panel port has connected.
5. You should now be able to click the 'Post' buttons to send messages between the injected extension and the DevTools panel.

## Debugging it

Debugging the DevTool usually involves logging messages to the console. Which can be confusing, as there is more than one console:

* Logging performed within the content script is written to the application's console.
* Logging performed within the background script is written to the background page's console - which can be accessed by clicking the extension's 'background page' link on the `chrome://extensions` page. Clicking that link will open a DevTools window for the background page.
* Logging performed in the DevTools panel is written to the DevTools page's console. The DevTools for the DevTools page - yeah, it's like Russion dolls - can be opened via a link on the `chrome://extensions` page. It can also be opened by undocking the application's DevTools and pressing the DevTools hotkey whilst the DevTools window is focused: <kbd>Cmd</kbd> + <kbd>Opt</kbd> + <kbd>I</kbd> on Mac and <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> on Windows.

The extension's card on the `chrome://extensions` page will also show any errors that have been thrown within the background script.

## Installing it in Firefox

The DevTool in this example can also be installed in Firefox.

1. Click 'Add-ons' in the menu.
2. Click 'Extensions' in the sidebar.
3. Click 'Debug Add-ons' in the menu that drops down from the button with the cog icon.
4. Click 'Load Temporary Add-on...' and open the `manifest.json` file.
