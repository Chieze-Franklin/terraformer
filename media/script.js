// @ts-check

// Script run within the webview itself.
(function () {

	// Get a reference to the VS Code webview api.
	// We use this API to post messages back to our extension.

	// @ts-ignore
	const vscode = acquireVsCodeApi();


	const iframe = /** @type {HTMLIFrameElement} */ (document.querySelector('.visualizer'));

	const errorContainer = document.createElement('div');
	document.body.appendChild(errorContainer);
	errorContainer.className = 'error';
	errorContainer.style.display = 'none';

	/**
	 * Render the document in the webview.
	 */
	function updateContent(/** @type {string} */ text, /** @type {number} */ port) {
		if (!text) {
            text = '{}';
        }
		errorContainer.style.display = 'none';

		// change iframe src
		iframe.src = `http://localhost:${port}/?content=${encodeURIComponent(text)}`;
	}

	// Handle messages sent from the extension to the webview
	window.addEventListener('message', event => {
		const message = event.data; // The json data that the extension sent
		switch (message.type) {
			case 'update':
				const text = message.text;
				const port = message.port;

				// Update our webview's content
				updateContent(text, port);

				// Then persist state information.
				// This state is returned in the call to `vscode.getState` below when a webview is reloaded.
				vscode.setState({ text, port });

				return;
		}
	});

	// Webviews are normally torn down when not visible and re-created when they become visible again.
	// State lets us save information across these re-loads
	const state = vscode.getState();
	if (state) {
		updateContent(state.text, state.port);
	}
}());
