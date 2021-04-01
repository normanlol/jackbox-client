const { app, BrowserWindow, shell } = require('electron');

app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Jackbox"
    });
    win.setMenu(null);
    win.loadURL("https://jackbox.tv/", {userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0"});

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length == 0) {
            const win = new BrowserWindow({
                width: 800,
                height: 600,
                title: "Jackbox"
            });
            win.setMenu(null);
            win.loadURL("https://jackbox.tv/", {userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0"});
        }
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
    
    win.webContents.addListener("will-navigate", function(event, url) {
        if (!url.startsWith("https://jackbox.tv/") && !url.startsWith("https://id.twitch.tv/")) {
            event.preventDefault();
            shell.openExternal(url);
        }
    });
    
    win.webContents.addListener("new-window", function(event, url) {
        event.preventDefault();
        shell.openExternal(url);
    });
});

