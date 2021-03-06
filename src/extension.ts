import * as vscode from 'vscode'
const { exec } = require('child_process')
const adminDashboard = 'Razorpay - Admin Panel'

function showInfoMessage(message: string){
	vscode.window.showInformationMessage(message)
}

function reloadTab(tabId: string) {
	exec(
		'chrome-cli reload -t ' + tabId,
		(error: { message: any }, stdout: any, stderr: any) => {
			if (error) {
				showInfoMessage(`error: ${error.message}`)
				return
			}
			if (stderr) {
				showInfoMessage(`stderr: ${stderr}`)
				return
			}
			if (stdout) {
				showInfoMessage(`stdout: ${stdout}`)
				return
			}
		}
	)
	;``
}

function refreshChromeTab(matchString: string) {
	exec(
		'chrome-cli list tabs',
		(error: { message: string }, stdout: string, stderr: string) => {
			let tabId = ''
			if (error) {
				showInfoMessage(`error: ${error.message}`)
				return
			}
			if (stderr) {
				showInfoMessage(`stderr: ${stderr}`)
				return
			}
			let arrTab = stdout.split('\n')
			arrTab.forEach((element: string) => {
				if (element.includes(matchString)) {
					tabId = element.split(' ')[0].replace('[', '').replace(']', '')
				}
			})
			reloadTab(tabId)
		}
	)
}

function createTerminal(command: string) {
	vscode.window.createTerminal({
		hideFromUser: false,
		cwd: vscode.workspace.rootPath,
		name: 'refresher',
		shellPath: 'zsh',
		shellArgs: ['-c', command],
	})
}
function createWatcher(filePath: string, matchString: string) {
	let watcher = vscode.workspace.createFileSystemWatcher(filePath)
	watcher.onDidChange(() => {
		refreshChromeTab(matchString)
	})
}
export function activate(context: vscode.ExtensionContext) {
	let runAndWatchServer = vscode.commands.registerCommand(
		'refresher.runadmin',
		() => {
			createTerminal('npm run start')
			createTerminal('npm run serve')
			createWatcher('**/*.{styl,js}', adminDashboard)
			showInfoMessage('Admin dashboard ran successfully')
		}
	)

	let installChromeCLI = vscode.commands.registerCommand(
		'refresher.installChromeCli',
		async () => {
			await createTerminal('brew install chrome-cli')
			showInfoMessage('Success!!, Chrome Cli is installed')
		}
	)

	context.subscriptions.push(runAndWatchServer, installChromeCLI)
}

export function deactivate() {}
