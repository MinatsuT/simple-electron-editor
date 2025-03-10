const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (content) => ipcRenderer.invoke('dialog:saveFile', content),
  saveExistingFile: (filePath, content) => ipcRenderer.invoke('file:saveExisting', filePath, content),
  openFileByPath: (filePath) => ipcRenderer.invoke('open-file-by-path', filePath)
});

// メインプロセスからのイベントをレンダラープロセスに転送
ipcRenderer.on('file:open', (event, fileData) => {
  window.dispatchEvent(new CustomEvent('file:open', { detail: fileData }));
});

ipcRenderer.on('file:new', () => {
  window.dispatchEvent(new CustomEvent('file:new'));
});

ipcRenderer.on('file:save', () => {
  window.dispatchEvent(new CustomEvent('file:save'));
});

ipcRenderer.on('file:saveAs', () => {
  window.dispatchEvent(new CustomEvent('file:saveAs'));
});
