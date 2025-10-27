const { app, BrowserWindow } = require('electron');
const path = require('path');

require('./ipcHandlers');

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 650,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    win.loadFile(path.join(__dirname, '../public/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
