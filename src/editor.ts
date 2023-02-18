import * as vscode from 'vscode';
import { getNonce } from './util';

export class TerraformerEditorProvider implements vscode.CustomTextEditorProvider {
    public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const provider = new TerraformerEditorProvider(context);
		const providerRegistration = vscode.window.registerCustomEditorProvider(TerraformerEditorProvider.viewType, provider);
		return providerRegistration;
	}

    private static readonly viewType = 'terraformer.editor';

    private static readonly scratchCharacters = ['😸', '😹', '😺', '😻', '😼', '😽', '😾', '🙀', '😿', '🐱'];

    constructor(
		private readonly context: vscode.ExtensionContext
	) { }

    /**
	 * Called when our custom editor is opened.
	 */
	public async resolveCustomTextEditor(
		document: vscode.TextDocument,
		webviewPanel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {
        // Setup initial content for the webview
		webviewPanel.webview.options = {
			enableScripts: true,
		};
		webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

        const updateWebview = () => {
			webviewPanel.webview.postMessage({
				type: 'update',
				text: document.getText(),
			});
		};

        // Hook up event handlers so that we can synchronize the webview with the text document.
		//
		// The text document acts as our model, so we have to sync change in the document to our
		// editor and sync changes in the editor back to the document.
		//
		// Remember that a single text document can also be shared between multiple custom
		// editors (this happens for example when you split a custom editor)

		const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
			if (e.document.uri.toString() === document.uri.toString()) {
				updateWebview();
			}
		});

        // Make sure we get rid of the listener when our editor is closed.
		webviewPanel.onDidDispose(() => {
			changeDocumentSubscription.dispose();
		});

        // Receive message from the webview.
		webviewPanel.webview.onDidReceiveMessage(e => {
			switch (e.type) {
				case 'add':
					// this.addNewScratch(document);
					return;

				case 'err':
					// this.deleteScratch(document, e.id);
					console.log('>>>>>>>>>>>>>>error');
            		console.log(e.url);
					return;
			}
		});

		updateWebview();
    }

    /**
	 * Get the static html used for the editor webviews.
	 */
	private getHtmlForWebview(webview: vscode.Webview): string {
        // Local path to script and css for the webview
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this.context.extensionUri, 'media', 'script.js'));

        // Use a nonce to whitelist which scripts can be run
		const nonce = getNonce();

        return /* html */`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                </head>
                <body>
                    <iframe id="inlineFrameExample"
                        title="Inline Frame Example"
                        width="100%"
                        height="1000px"
                        class="visualizer"
                        src="https://terraform-visualizer.netlify.app/">
                    </iframe>

                    <script nonce="${nonce}" src="${scriptUri}"></script>
                </body>
            </html>
        `;
    }
}