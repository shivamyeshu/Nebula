const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    search: (query) => ipcRenderer.invoke('perform-search', query)
});
