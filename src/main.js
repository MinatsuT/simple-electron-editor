const { app, BrowserWindow, dialog, Menu, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    
    // アプリケーションメニューの作成
    const template = [
        {
            label: 'ファイル',
            submenu: [
                {
                    label: '新規作成',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        mainWindow.webContents.send('file:new');
                    }
                },
                {
                    label: '開く',
                    accelerator: 'CmdOrCtrl+O',
                    click: async () => {
                        const result = await handleFileOpen();
                        if (result) {
                            mainWindow.webContents.send('file:open', result);
                        }
                    }
                },
                {
                    label: '保存',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
                        mainWindow.webContents.send('file:save');
                    }
                },
                {
                    label: '名前を付けて保存',
                    accelerator: 'CmdOrCtrl+Shift+S',
                    click: () => {
                        mainWindow.webContents.send('file:saveAs');
                    }
                },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        {
            label: '編集',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' }
            ]
        }
    ];
    
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'テキストファイル', extensions: ['txt', 'md', 'js', 'html', 'css'] },
            { name: 'すべてのファイル', extensions: ['*'] }
        ]
    });
    
    if (!canceled) {
        const content = fs.readFileSync(filePaths[0], 'utf8');
        return { filePath: filePaths[0], content };
    }
    return null;
}

// IPC通信ハンドラー
ipcMain.handle('dialog:openFile', handleFileOpen);

ipcMain.handle('open-file-by-path', async (event, filePath) => {
    try {
        const content = await fs.promises.readFile(filePath, 'utf8');
        return {
            filePath,
            content
        };
    } catch (error) {
        console.error('ファイルを開けませんでした:', error);
        return null;
    }
});

ipcMain.handle('dialog:saveFile', async (event, content) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
        filters: [
            { name: 'テキストファイル', extensions: ['txt'] },
            { name: 'すべてのファイル', extensions: ['*'] }
        ]
    });
    
    if (!canceled) {
        fs.writeFileSync(filePath, content);
        return filePath;
    }
    return null;
});

// 既存のipcMainハンドラーの後に追加
ipcMain.handle('file:saveExisting', async (event, filePath, content) => {
    try {
        fs.writeFileSync(filePath, content);
        return true;
    } catch (error) {
        console.error('ファイルの保存中にエラーが発生しました:', error);
        dialog.showErrorBox('保存エラー', 'ファイルの保存中にエラーが発生しました。');
        return false;
    }
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});