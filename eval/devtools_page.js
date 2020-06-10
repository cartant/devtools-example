// Create another pane that will be shown on the sidebar within the 'Elements'
// DevTools tab.

chrome.devtools.panels.elements.createSidebarPane("Example", (sidebar) => {
  // Call `eval` on the inspected window, but evaluate the expression within
  // the context of the content script which was specified in the manifest.
  // The advantage of this is that no code needs to be injected into the
  // JavaScript context of the inspected page.

  function update() {
    chrome.devtools.inspectedWindow.eval(
      "suggestQuery($0)",
      { useContentScriptContext: true },
      function (result, isException) {
        sidebar.setObject(result, "Suggested query");
      }
    );
  }
  update();

  // Whenever the selection in the selected element changes, update the pane
  // content.

  chrome.devtools.panels.elements.onSelectionChanged.addListener(update);
});
