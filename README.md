# under-30 README

A Microsoft Visual Studio Code extension that enhances your coding workflow by 
displaying the number of selected lines in the status bar and detecting 
functions that exceed 30 lines of code. It also identifies formatting errors, 
such as unclosed or unmatched braces, ensuring your code remains clean and 
within stylistic guidelines.

This extension was developed to comply with the Tufts University CS Department's
stylistic policy of writing functions no longer than 30 lines.

## Features

The **under-30** extension provides a number of different features to improve 
efficiency when evaluating the functional formatting of your program.

### Line Selection Display
- Select a range of lines in the editor to see the number of selected lines 
displayed in the status bar item at the lower right corner.
  
  ![Select text across lines in the editor to display the number of selected lines in the status bar.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/line-selection.gif)

### Function Length Check
- The extension can scan all functions in the current active editor and raise 
warnings if any function exceeds 30 lines.
- Click the status bar item in the lower right corner to initiate the scan 
after selecting a range of lines.

  ![Click the status bar to check that the length of every function in the file does not exceed 30 lines.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/exceeds-30.png)

  ![Click the status bar to check that the length of every function in the file does not exceed 30 lines.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/status-bar-click.gif)

- Alternatively, run the command "Check Function Length of All Functions in 
This File" from the Command Palette to perform the scan.

  ![Run the command "Check Function Length of All Functions in This File" from the Command Palette.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/command-palette.png)

  ![Run the command "Check Function Length of All Functions in This File" from the Command Palette.](https://raw.githubusercontent.com/danglorioso/under-30/main/images/command.gif)
    


- Success or warning notifications will be displayed in the lower right corner 
and in the Notifications window. If functions exceed the 30-line limit, the 
warning includes the start and end line numbers of each offending function.

### Error Checking for Unclosed Functions
- The extension checks for uneven braces, alerting the user to any unclosed or 
extra braces, which would prevent the function length check from completing.

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

**Enjoy!**
