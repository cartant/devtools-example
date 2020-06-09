chrome.devtools.panels.elements.createSidebarPane(
    'Example',
    (sidebar) => {
        const update = () => {
            sidebar.setExpression(
                `Object.setPrototypeOf({
                    left: $0.clientLeft,
                    right: $0.clientLeft + $0.clientWidth,
                    top: $0.clientTop,
                    bottom: $0.clientTop + $0.clientHeight,
                }, null)`,
                `Client position`
            );
        };
        update();
        chrome.devtools.panels.elements.onSelectionChanged.addListener(update);
    },
);