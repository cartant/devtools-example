"use strict";

// The 'outer' DevTools page contains no DOM elements. It just make the
// following API call.

chrome.devtools.panels.create(
    "Example",
    "nerd.png",
    "devtools_panel_page.html",
    () => {}
);