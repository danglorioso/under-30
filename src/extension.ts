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
		
		for (let i = 0; i < lines.length; i++) {
			if (lines[i].includes('{')) {
				console.log('Opening bracket found at line: ' + (i + 1));
				stack.push('{');
				// If the stack is empty, this is the start of a function.
				// Store the function start line number and initialize the line count.
				if (stack.length === 1) {
					functionStartLine = i;
					lineCount = 1;
				}
			} else if (lines[i].includes('}')) {
				console.log('Closing bracket found at line: ' + (i + 1));
				// Remove the corresponding opening bracket from stack
				if (stack.length > 0) {
					stack.pop();
				}
		
				// If the stack is now empty, then at the end of the function.
				if (stack.length === 0) {
					console.log('End of function and line count is: ' + lineCount);
					console.log('Function start line: ' + (functionStartLine + 1));
					console.log('Function end line: ' + i);
					// Display warning message if function exceeds 30 lines
					if (lineCount > 30) {
						vscode.window.showWarningMessage(`Function from line ${functionStartLine + 1} to line ${i + 1} exceeds 30 lines.`);
					}
					lineCount = 0;
				}
			} else if (stack.length > 0) {
				lineCount++;
			}
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
