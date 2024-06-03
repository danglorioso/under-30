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

	// Register a command that is invoked when the status bar
	// item is selected
	const myCommandId = 'sample.showSelectionCount';

	// When status bar item is clicked, scan the active editor window
	// for functions that exceed 30 lines of code
	subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
		// const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
		// vscode.window.showInformationMessage(`Yeah, ${n} line(s) selected... Keep going!`);

		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}
	
		const text = editor.document.getText();
		const lines = text.split('\n');
		let stack = [];
		let lineCount = 0;
		let functionStartLine = 0;
		let hasWarning = false;
		
		// Traverse the lines in the active editor window
		for (let LINE_I = 0; LINE_I < lines.length; LINE_I++) {
			// Fetch the current line
			let line = lines[LINE_I];

			// Traverse each character in the line
			for (let CHAR_I = 0; CHAR_I < line.length; CHAR_I++) {
				// Fetch the current character
				let char = line[CHAR_I];

				if (char === '{') {
					// Push the stack if the character is an opening brace
					stack.push('{');

					// Check if this is the start of a function
					if (stack.length === 1) {
						functionStartLine = LINE_I + 1;
						lineCount = -1; // Subtract 1 to account for the line with the opening brace
					}
				} else if (char === '}') {
					// Pop the stack if the character is a closing brace
					if (stack.length > 0) {
						stack.pop();
					}

					// If the function has ended, check if it exceeds 30 lines
					if (stack.length === 0) {
						if (lineCount > 30) {
							hasWarning = true;
							vscode.window.showWarningMessage(`Function from line ${functionStartLine} to line ${LINE_I + 1} exceeds 30 lines.`);
						}
						lineCount = 0;
					}
				}
			}
			// Increment line count if line is in function and not at end yet
			if (stack.length > 0) {
				lineCount++;
			}
		}
		// Error message for invalid functions
		if (stack.length > 0) {
			vscode.window.showWarningMessage('Function exceeds 30 lines and is not closed.');
		}

		// If no warnings were displayed, display success message
		if (!hasWarning) {
			vscode.window.showInformationMessage('No functions exceed 30 lines in this file!');
		}
	}));

	// Create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = myCommandId;
	subscriptions.push(myStatusBarItem);

	// Register some listener that make sure the status bar 
	// items are always up-to-date
	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

	// Update status bar item once at start
	updateStatusBarItem();
}

function updateStatusBarItem(): void {

	// Fetch number of selected lines from active editor window
	const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);

	// Only display number of selected lines if greater than 1
	if (n > 1) {
		myStatusBarItem.text = `$(list-selection) ${n} lines selected`;
		myStatusBarItem.show();
	} else {
		myStatusBarItem.hide();
	}
}

function getNumberOfSelectedLines(editor: vscode.TextEditor | undefined): number {
	// Initalize the number of lines
	let lines = 0;

	// For each selection in the editor, calculate the number of lines
	if (editor) {
		lines = editor.selections.reduce(
				  (prev, curr) => prev + (curr.end.line - curr.start.line), 1);
	}
	return lines;
}
