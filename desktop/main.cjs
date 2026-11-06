const { app, BrowserWindow, Menu } = require('electron');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const isDevelopment = !app.isPackaged;
let backendProcess = null;

function startBackend() {
  const packagedRoot = process.resourcesPath ? path.join(process.resourcesPath, 'app.asar.unpacked', 'backend') : null;
  const executableName = process.platform === 'win32' ? 'autocar-backend.exe' : 'autocar-backend';
  const binaryPath = packagedRoot && path.join(packagedRoot, 'bin', executableName);
  const sourcePath = isDevelopment
    ? path.join(__dirname, '..', 'backend', 'server.py')
    : path.join(packagedRoot, 'server.py');
  const command = binaryPath && fs.existsSync(binaryPath) ? binaryPath : (process.platform === 'win32' ? 'python' : 'python3');
  const args = command === binaryPath ? [] : [sourcePath];
  backendProcess = spawn(command, args, {
    cwd: packagedRoot || path.join(__dirname, '..'),
    env: { ...process.env, AUTOCAR_PORT: '8765', AUTOCAR_DATA_DIR: path.join(app.getPath('userData'), 'data') },
    stdio: isDevelopment ? 'inherit' : 'ignore',
    windowsHide: true
  });
  backendProcess.on('error', (error) => {
    console.error('Não foi possível iniciar o backend Python:', error.message);
  });
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1120,
    minHeight: 720,
    backgroundColor: '#071521',
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      devTools: isDevelopment
    }
  });

  window.once('ready-to-show', () => window.show());
  window.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('file://')) return { action: 'allow' };
    return { action: 'deny' };
  });

  window.loadFile(path.join(__dirname, '..', 'index.html'));
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  startBackend();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('before-quit', () => {
  if (backendProcess && !backendProcess.killed) backendProcess.kill();
});

app.on('web-contents-created', (_event, contents) => {
  contents.on('will-navigate', (event, url) => {
    if (!url.startsWith('file://')) event.preventDefault();
  });
});
