import * as vscode from 'vscode';

export function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export function showInfo(message: string) {
	vscode.window.showInformationMessage(message);
	vscode.window.setStatusBarMessage(message, 1000);
	console.log(message);
}

export function showError(message: string) {
	vscode.window.showErrorMessage(message);
	vscode.window.setStatusBarMessage(message, 1000);
	console.log(message);
}