/**************************************************************
 *
 *                     extension.ts
 *
 *            Project: Under 30 VSCode Extension
 *             Author: Dan Glorioso
 *            Created: 05/13/2024
 *           Modified: 05/15/2024
 *
 *     Summary: A Microsoft Visual Studio Code extension that provides a status
 * 			    bar item that displays the number of lines selected in the 
 *              active text editor. This extension also can detect functions
 * 	            that exceed 30 lines of code in length. 
 * 
 *  Acknowledgements: This extension is based on the "statusbar-sample" example
 * 			    provided by Microsoft's Visual Studio Code documentation:
 *              https://github.com/microsoft/vscode-extension-samples/tree/
 *              209ce0e81bdf23adb84e4a913f1082fa116e26f9/statusbar-sample. 
 *
 **************************************************************/

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {

	// register a command that is invoked when the status bar
	// item is selected
	const myCommandId = 'sample.showSelectionCount';
	subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
		const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
		vscode.window.showInformationMessage(`Yeah, ${n} line(s) selected... Keep going!`);
	}));

	// create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = myCommandId;
	subscriptions.push(myStatusBarItem);

	// register some listener that make sure the status bar 
	// item always up-to-date
	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

	// update status bar item once at start
	updateStatusBarItem();
}

function updateStatusBarItem(): void {
	const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
	if (n > 0) {
		myStatusBarItem.text = `$(list-selection) ${n} lines selected`;
		myStatusBarItem.show();
	} else {
		myStatusBarItem.hide();
	}
}

function getNumberOfSelectedLines(editor: vscode.TextEditor | undefined): number {
	let lines = 0;
	if (editor) {
		lines = editor.selections.reduce((prev, curr) => prev + (curr.end.line - curr.start.line), 1);
	}
	return lines;
}
