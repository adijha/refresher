// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import * as cp from 'child_process'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "refresher" is now active!')

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('refresher.runadmin', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// cp.exec('ls', (err: string, stdout: string, stderr: string) => {
		// 	console.log('stdout: ' + stdout)
		// 	console.log('stderr: ' + stderr)

		vscode.window.createTerminal({
			hideFromUser: false,
			cwd: vscode.workspace.rootPath,
			name: 'refresher',
			shellPath: 'zsh',
			shellArgs: ['-c', 'npm run start'],
		})
		vscode.window.createTerminal({
			hideFromUser: false,
			cwd: vscode.workspace.rootPath,
			name: 'refresher',
			shellPath: 'zsh',
			shellArgs: ['-c', 'npm run serve'],
		})

		vscode.window.createTerminal({
			hideFromUser: false,
			cwd: vscode.workspace.rootPath,
			name: 'refresher',
			shellPath: 'zsh',
			shellArgs: ['-c', 'nodemon  -e js,styl  refresher.js'],
		})

		vscode.window.showInformationMessage(
			'admin dashboard ran',
			vscode.workspace?.rootPath || ''
		)
	})

	let installChromeCLI = vscode.commands.registerCommand(
		'refresher.installChromeCli',
		async () => {
			await vscode.window.createTerminal({
				hideFromUser: false,
				cwd: vscode.workspace.rootPath,
				name: 'refresher',
				shellPath: 'zsh',
				shellArgs: ['-c', 'brew install chrome-cli'],
			})

			vscode.window.showInformationMessage(
				'Chrome Cli install',
				vscode.workspace?.rootPath || ''
			)
		}
	)

	context.subscriptions.push(disposable, installChromeCLI)
}

// this method is called when your extension is deactivated
export function deactivate() {}
