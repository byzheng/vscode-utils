# vscode-utils

A collection of utility commands for Visual Studio Code.

## Features

### R: Set Working Directory to Current File

Sets the R console working directory to the project root using `here::here()`.

- Works with R (`.r`), R Markdown (`.rmd`), and Quarto (`.qmd`) files
- Automatically finds or creates an R Interactive terminal
- Uses the `here` package to determine the project root directory

**Usage:**
1. Open an R, Rmd, or Qmd file
2. Open Command Palette (`Ctrl+Shift+P`)
3. Run "R: Set Working Directory to Current File"

## Requirements

- R must be installed and available in your PATH
- The `here` R package should be installed for proper functionality

## Release Notes

### 0.0.1

Initial release with R working directory command.
