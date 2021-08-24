const electron  = require('electron')
const fs = require('fs')
const {app, BrowserWindow, ipcMain, dialog, Menu} = electron
let win
let filePath = undefined

app.on('ready', ()=>{
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        width: 830
    })
    win.loadFile('index.html')
    // win.webContents.openDevTools();

    // remove default menu
    //const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(null)
})