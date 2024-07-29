# Under 30 README

**Under 30** is a Microsoft Visual Studio Code extension that enhances your 
coding workflow by displaying the number of selected lines in the status bar 
and detecting functions that exceed a specified number of lines. By default, 
this limit is set to 30 lines but may be modified using the extension's 
commands. It also identifies formatting errors, such as unclosed or unmatched 
braces, ensuring your code remains clean and within stylistic guidelines.

This extension was originially developed to comply with the Tufts University CS Department's
stylistic policy of writing functions no longer than 30 lines.

## Features

**Under-30** provides a number of different features to improve 
efficiency when evaluating the functional formatting of your program.

- **Real-Time Updates**: The number of selected lines is dynamically displayed in 
the status bar whenever text is selected, regardless of the coding language or 
document type.
- **Accurate Function Detection**: Functions are identified by their opening curly 
brace ("{") at the start and their closing curly brace ("}") at the end. Nested
curly braces within the function do not interfere with this automatic detection
process.
- **Customizable Function Length Limit**: Users can set their own function length 
limit through a command, allowing flexibility to adhere to different coding standards.
- **Lightweight and Efficient**: Designed to have minimal impact on the performance
of VS Code, ensuring a smooth and responsive coding experience.

### Line Selection Display
- Select a range of lines in the editor to see the number of selected lines 
displayed in the status bar item at the lower right corner.
  
  ![Select text across lines in the editor to display the number of selected lines in the status bar.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/line-selection.gif)

### Function Length Check
- The extension can scan all functions in the current active editor and raise 
warnings if any function exceeds the specified line limit (default is 30 lines).
- Click the status bar item in the lower right corner to initiate the scan 
after selecting a range of lines.

  ![Click the status bar to check that the length of every function in the file does not exceed the specified limit.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/exceeds-30.png)

- If no functions exceed the specified line limit, a success message will be displayed.

  ![Click the status bar to check that the length of every function in the file does not exceed the specified limit.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/status-bar-click.gif)

- Alternatively, run the command "Check Function Length of All Functions in 
This File" from the Command Palette to perform the scan.

  ![Run the command "Check Function Length of All Functions in This File" from the Command Palette.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/command-palette.png)

  ![Run the command "Check Function Length of All Functions in This File" from the Command Palette.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/command.gif)

- Success or warning notifications will be displayed in the lower right corner 
and in the Notifications window. If functions exceed the specified line limit, the 
warning includes the start and end line numbers of each offending function to
pinpoint the issue(s).

### Set Function Length Limit
- Dynamically set the function length limit by running the command 
"Set Function Length Limit" from the Command Palette. Any positive integer may be inputted.

  ![Set the function length limit dynamically from the Command Palette.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/set-limit.gif)

### Error Checking for Unclosed Functions
- The extension checks for uneven braces, alerting the user to any unclosed or 
extra braces, which would prevent the function length check from completing.

  ![Error for missing opening brace.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/missing-closing-brace.png)
  
  ![Error for missing opening brace.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/missing-opening-brace.png)

## Requirements

Requires VS Code version 1.73.0 or greater.

## Extension Settings

Here is the updated "Extension Settings" section of the README:

## Extension Settings

**Under 30** extension provides the following settings to allow customization:

- **Function Length Limit**: Users can set the maximum number of lines allowed for functions. The default limit is 30 lines. This can be customized by using the command `Set Function Length Limit` or through the VSCode settings.

To set the function length limit via the command palette:

1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
2. Search for and select `Set Function Length Limit`.
3. Enter a positive integer for the desired function line limit.

Alternatively, you can set the function length limit through the settings:

1. Go to `File > Preferences > Settings` (or `Code > Preferences > Settings`).
2. Search for `under30.functionLengthLimit`.
3. Enter the desired line limit for functions.

## Known Issues

No known issues at this time.

## Release Notes

### [1.1.0] - 2024-07-29

#### Added
- New command `under30.setFunctionLengthLimit` to allow users to dynamically change the function length limit.
- Updated extension to check function lengths based on the user-defined limit.

### [1.0.3] - 2024-06-05

Updated documentation and corrections for under-30 VSCode Extension.

### [1.0.2] - 2024-06-06

Updated documentation and corrections for under-30 VSCode Extension.

### [1.0.0] - 2024-06-05

Initial release of under-30 VSCode Extension.

**Enjoy!**
