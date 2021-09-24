const { app, BrowserWindow } = require("electron");
const { path } = require("path");
const cp = require("child_process");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.setMenuBarVisibility(false);
  cp.exec("python app.py", { cwd: "/api" });

  //load the index.html from a url
  win.loadURL("http://localhost:3000");
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
