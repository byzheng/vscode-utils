// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-utils" is now active!');

	// Register command to set R working directory
	const disposable = vscode.commands.registerCommand('vscode-utils.setRWorkingDirectory', () => {
		const editor = vscode.window.activeTextEditor;
		
		if (!editor) {
			vscode.window.showWarningMessage('No active file found.');
			return;
		}

		const document = editor.document;
		const fileName = document.fileName;
		const fileExtension = path.extname(fileName).toLowerCase();

		// Check if the file is an R, Rmd, or Qmd file
		const allowedExtensions = ['.r', '.rmd', '.qmd', '.R', '.Rmd', '.Qmd'];
		if (!allowedExtensions.includes(fileExtension)) {
			vscode.window.showWarningMessage('This command only works with R (.r), R Markdown (.rmd), or Quarto (.qmd) files.');
			return;
		}

		// Get the directory of the current file
		const fileDir = path.dirname(fileName);

		// Convert Windows path to R-compatible format (forward slashes)
		const rPath = fileDir.replace(/\\/g, '/');

		// Find the R terminal by checking for specific R-related terminal names
		const terminals = vscode.window.terminals;
		let rTerminal = terminals.find(t => {
			const name = t.name.toLowerCase();
			return name === 'r interactive';
		});

		let isNewTerminal = false;
		if (!rTerminal) {
			// If no R terminal found, create a new R Interactive terminal
			rTerminal = vscode.window.createTerminal({
				name: 'R Interactive',
				shellPath: 'R',
				shellArgs: ['--no-save', '--no-restore']
			});
			isNewTerminal = true;
			vscode.window.setStatusBarMessage('Started new R Interactive terminal.', 3000);

		}

		rTerminal.show();
		
		// Wait for R to start if new terminal, otherwise send immediately
		const delay = isNewTerminal ? 1500 : 0;
		setTimeout(() => {
			rTerminal!.sendText(`setwd("${rPath}")`);
			vscode.window.setStatusBarMessage(`R working directory set to: ${fileDir}`, 3000);
			
			// Return focus to the editor
			vscode.window.showTextDocument(editor.document);
		}, delay);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
