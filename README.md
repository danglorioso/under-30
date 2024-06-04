# under-30 README

A Microsoft Visual Studio Code extension that provides a status bar item that 
displays the number of lines selected in the active text editor. This extension
also detects functionsthat exceed 30 lines of code in length, as well as 
formatting errors in functions like unclosed or unmatched braces.

This extension was developed to comply with the Tufts University CS Department's
stylistic policy of writing functions of a length of 30 lines of fewer. 

## Features

The under-30 extension provides a number of different features to improve 
efficiency when evaluating the functional formatting of your program.

Most simply, select a range of lines to calculate the number of selected lines.
The result is displayed in the status bar item that appears in the lower right
corner.

![Select text across lines in the editor to display the number of selected lines in the status bar.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/line-selection.gif)

This can be useful when a large range of code lines need to be tallied. 

The most time-saving aspect of this extension is that it can scan every function
in your current active editor and raise warnings for functions that exceed
30 lines in length. 

If there are no functions present that exceed 30 lines in length, a success
informaiton message will be displayed in the lower right and in the Notifications
window. If there exist one or more functions that exceed the 30 lines limit, a 
warning notification will appear, which will include the beginning and end line
numbers of every function in the current editor that violates the function line
limit.

![Click the status bar to check that the length of every function in the file does not exceed 30 lines.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/status-bar-click.gif)

Another way to initiate the function-line-length scan is by running the command
"Check Function Length of All Functions in This File" from the Command Palette
at the center top. Identical warning or success notification will appear in the
lower right corner and in the Notifications window.

![Run the command "Check Function Length of All Functions in This File" from the Command Palette.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/line-selection.gif)

Additional features of this extension include error checking for unclosed functions.
This includes uneven opening braces without corresponding closing braces or 
extra closing braces. The function-line-length scan will not be able to perform
with these errors present.

Error messages, similar to the ones below, will be displayed in these circumstances
to alert the programmer of the issue.

![Error for missing opening brace.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/missing-closing-brace.png)

![Error for missing opening brace.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/missing-opening-brace.png)



## Requirements

Requires VSCode version 1.73.0 or greater.

## Extension Settings

This extension currently does not add any VS Code Settings. 

## Known Issues

No known issues at this time.

## Release Notes

Initial release of under-30 VSCode Extension.

### 1.0.0

Initial release of under-30 VSCode Extension.


---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
