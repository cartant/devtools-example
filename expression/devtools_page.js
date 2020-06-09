// Create another pane that will be shown on the sidebar within the 'Elements'
// DevTools tab.

chrome.devtools.panels.elements.createSidebarPane("Example", (sidebar) => {
  // Use setExpression to evaluate an object that contains the client position
  // for the selected element: `$0`
  //
  // The expression is evaluated in the JavaScript context of the inspected
  // page, so any globals in that context could be used within the expression.
  //
  // Object.setPrototypeOf is used here to prevent the Object prototype being
  // shown in the pane content.

  function update() {
    sidebar.setExpression(
      `Object.setPrototypeOf({
        left: $0.clientLeft,
        right: $0.clientLeft + $0.clientWidth,
        top: $0.clientTop,
        bottom: $0.clientTop + $0.clientHeight,
      }, null)`,
      `Client position`
    );
  }
  update();

  // Whenever the selection in the selected element changes, update the
  // expression so that the pane content is updated.

  chrome.devtools.panels.elements.onSelectionChanged.addListener(update);
});
