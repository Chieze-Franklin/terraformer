// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TerraformerEditorProvider } from './editor';
import { showInfo } from './util';

// This method is called when the extension is activated
export function activate(context: vscode.ExtensionContext) {
	// Register our custom editor providers
	context.subscriptions.push(TerraformerEditorProvider.register(context));

	// This line of code will only be executed once when the extension is activated
	showInfo('Terraformer activated!');
}

// This method is called when the extension is deactivated
export function deactivate() {}
