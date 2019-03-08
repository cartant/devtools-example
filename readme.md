# devtools-example

This repo contains a simple DevTool that injects an `Extension` object into the inspected tab and implements bi-directional communication between said object and the DevTools panel.

The example's code contains comments that should explain how everything works and there is some official Chrome documentation here: [Extending DevTools](https://developer.chrome.com/extensions/devtools)

## Installation

1. Browse to `chrome://extensions`.
2. Enable 'Developer Mode' - via the toggle in the page's top-right.
3. Click 'Load unpacked' and browse for the directory that contains `manifest.json`.

## Trying it out

1. Open `example_page.html` in a tab.
2. In another tab, open `chrome://extensions`. The extension's card will have a link named 'background page'. Clicking that will bring up the DevTools for the background script and the console on those DevTools will show what's logged within the background script. You should see that the content port has connected.
3. If you go back to the tab containing `example_page.html` and open the DeTools, you should see a panel named 'Example'. (You will likely have to click the drop-down menu on the right of the panel.)
4. The DevTools console output for the background script should now show that the panel port has connected.
5. You should now be able to click the 'Post' buttons to send messages between the injected extension and the DevTools panel.

A tip: if you need to inspect the DevTools panel - either the DOM or the console output - you can do so by opening the DevTools for the DevTools. To do that, detach the DevTools containing the DevTools Example, so that they are not docked and then use the DevTools hot key to open the DevTools for the DevTools. Weird, isn't it? 

## Installation with Firefox

The DevTool in this example can also be loaded into Firefox.

1. Click 'Add-ons' in the menu.
2. Click 'Extensions' in the sidebar.
3. Click 'Debug Add-ons' in the menu that drops down from the button with the cog icon.
4. Click 'Load Temporary Add-on...' and open the `manifest.json` file.