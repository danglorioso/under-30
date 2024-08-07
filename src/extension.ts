/**************************************************************
 *
 *                     extension.ts
 *
 *            Project: Under 30 VSCode Extension
 *             Author: Dan Glorioso
 *            Created: 05/13/2024
 *           Modified: 06/24/2024
 * 	          Version: 1.0.4
 *
 *     Summary: A Microsoft Visual Studio Code extension that provides a status
 * 			    bar item that displays the number of lines selected in the 
 *              active text editor. This extension also detects functions
 * 	            that exceed 30 lines of code in length, as well as formatting
 * 				errors in functions like unclosed or unmatched braces.
 * 
 *  Acknowledgements: This extension is based on the "statusbar-sample" example
 * 			    provided by Microsoft's Visual Studio Code documentation:
 *              https://github.com/microsoft/vscode-extension-samples/tree/
 *              209ce0e81bdf23adb84e4a913f1082fa116e26f9/statusbar-sample. 
 *
 **************************************************************/

// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';

// Status bar item declaration
let lineStatusBarItem: vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {

	// Register a command that is invoked when the status bar
	// item is selected
	const myCommandId = 'sample.showSelectionCount';

	// Declare command to check function length
	let disposable = vscode.commands.registerCommand('under30.checkfunctionlength', () => {
		checkFunctionLength();
	});

	// Declare command to set function length limit
	subscriptions.push(vscode.commands.registerCommand('under30.setFunctionLengthLimit', () => {
		setFunctionLengthLimit();
	}));

	// When status bar item is clicked, scan the active editor window
	// for functions that exceed 30 lines of code
	subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
		checkFunctionLength();
	}));

	// Create a new status bar item that we can now manage
	lineStatusBarItem = vscode.window.createStatusBarItem
										(vscode.StatusBarAlignment.Right, 100);
	lineStatusBarItem.command = myCommandId;
	subscriptions.push(lineStatusBarItem);

	// Register some listener that make sure the status bar 
	// items are always up-to-date
	subscriptions.push(vscode.window.onDidChangeActiveTextEditor
														(updateStatusBarItem));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection
					 									(updateStatusBarItem));

	// Update status bar item once at start
	updateStatusBarItem();
}

function checkFunctionLength() {
	// Fetch the active editor window
	const editor = vscode.window.activeTextEditor;

	// If no editor is active, do nothing
	if (!editor) {
		return; 
	}

	// Initialize variables to store the text, lines, stack, and line count
	const text = editor.document.getText();
	const lines = text.split('\n');
	let stack = [];
	let lineCount = 0;
	let functionStartLine = 0;
	let hasWarning = false;
	
	// Fetch function length limit from settings
	const config = vscode.workspace.getConfiguration('under30');
	const functionLengthLimit = config.get<number>('functionLengthLimit') || 30;

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
					// Subtract 1 to account for line with opening brace
					lineCount = -1;
				}
			} else if (char === '}') {
				// Pop the stack if the character is a closing brace
				if (stack.length > 0) {
					stack.pop();
				} else {
					hasWarning = true;
					// If no opening braces to match, display error message
					vscode.window.showWarningMessage(`Unclosed function(s) 
												exist or extra closing brace 
													at line ${LINE_I + 1}.`);
				}

				// If the function has ended, check if it exceeds the limit number of lines
				if (stack.length === 0) {
					if (lineCount > functionLengthLimit) {
						// Trip warning flag boolean
						hasWarning = true;
						// Display warning message
						vscode.window.showWarningMessage(`Function from 
											line ${functionStartLine} to line 
											${LINE_I + 1} exceeds ${functionLengthLimit} lines.`);
					}
					// Reset line count
					lineCount = 0;
				}
			}
		}

		// Increment line count if line is in function and not at end yet
		if (stack.length > 0) {
			lineCount++;
		}
	}
	
	// Display error message if there are unclosed functions at end of file
	if (stack.length > 0) {
		vscode.window.showWarningMessage
								  ('Unclosed function(s) exist in this file!');
	} else if (!hasWarning) {
		// If no warnings were displayed, display success message
		vscode.window.showInformationMessage
							    ('No functions exceed ' + functionLengthLimit +  ' lines in this file!');
	}
}

function setFunctionLengthLimit() {
	vscode.window.showInputBox({
		prompt: "Set the maximum number of lines a function can have",
		value: "30",
		validateInput: (value: string) => {
			const number = parseInt(value);
			if (isNaN(number) || number <= 0) {
				return "Please enter a positive number";
			}
			return null;
		}
	}).then(value => {
		if (value) {
			const number = parseInt(value);
			const config = vscode.workspace.getConfiguration('under30');
			config.update('functionLengthLimit', number, true);
			vscode.window.showInformationMessage(`Function length limit set to ${number} lines.`);
		}
	});
}

function updateStatusBarItem(): void {

	// Fetch number of selected lines from active editor window
	const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);

	// Only display number of selected lines if greater than 1
	if (n > 1) {
		lineStatusBarItem.text = `$(list-selection) ${n} lines selected`;
		lineStatusBarItem.show();
	} else {
		lineStatusBarItem.hide();
	}
}

function getNumberOfSelectedLines(editor: vscode.TextEditor | 
														   undefined): number {
	// Initalize the number of lines
	let lines = 0;

	// For each selection in the editor, calculate the number of lines
	if (editor) {
		lines = editor.selections.reduce(
				  (prev, curr) => prev + (curr.end.line - curr.start.line), 1);
	}
	return lines;
}
