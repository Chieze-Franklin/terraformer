import * as vscode from 'vscode';
import express from 'express';
import { getNonce, showError } from './util';
import { AddressInfo } from 'net';

export class TerraformerEditorProvider implements vscode.CustomTextEditorProvider {
    public static register(context: vscode.ExtensionContext): vscode.Disposable {
		TerraformerEditorProvider.server.use(express.static(vscode.Uri.joinPath(context.extensionUri, 'visualizer').fsPath));
		TerraformerEditorProvider.server.get('/', function (req, res) {
			res.sendFile(vscode.Uri.joinPath(context.extensionUri, 'visualizer', 'index.html').fsPath);
		});
		try {
			const server = TerraformerEditorProvider.server.listen(0, () => {
				TerraformerEditorProvider.port = (server.address() as AddressInfo)?.port;
			});
		} catch (e) {
			showError('Error starting server: ' + (e as any).message ? (e as any).message : e);
		}

		const provider = new TerraformerEditorProvider(context);
		const providerRegistration = vscode.window.registerCustomEditorProvider(TerraformerEditorProvider.viewType, provider);
		return providerRegistration;
	}

    private static readonly viewType = 'terraformer.editor';
	private static server = express();
	private static port = 0;

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
				port: TerraformerEditorProvider.port,
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
				case 'err':
					//
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
					<title>Terraform Visualizer</title>
                </head>
                <body>
                    <iframe id="inlineFrame"
                        title="Inline Frame"
                        width="100%"
						height="100vh"
                        class="visualizer"
                        src="http://localhost:${TerraformerEditorProvider.port}/?integrated=true">
                    </iframe>

                    <script nonce="${nonce}" src="${scriptUri}"></script>
                </body>
            </html>
        `;
    }
}
