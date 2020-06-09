# Expression example

This directory contains a DevTools extension that adds a sidebar pane to the 'Elements' tab - it's shown alongside the 'Styles' and 'Event Listeners' panes. The example uses the `setExpression` API to register an expression that evaluates the selected element's client position.

The example's code contains comments that should explain how everything works and there is some official Chrome documentation here: [Extending DevTools](https://developer.chrome.com/extensions/devtools)

## Installing it

1. Browse to `chrome://extensions`.
2. Enable 'Developer Mode' - via the toggle in the page's top-right.
3. Click 'Load unpacked' and browse for the directory that contains `manifest.json`.

## Trying it out

1. Open `example_page.html` - or any other page - in a tab.
2. Open the DevTools and select the 'Elements' tab.
3. In the tab's sidebar - that hosts the 'Styles' pane - there should be an 'Example' pane.
4. The content of the 'Example' pane shows the client position of the selected element in the elements tree. The content will update as the selection is changed.