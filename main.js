const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.setMenuBarVisibility(false);

  const back_end_spawn = require("child_process").spawn("python", [
    "./api/app.py",
  ]);

  back_end_spawn.stdout.on("data", function (data) {
    console.log("Python response: ", data.toString("utf8"));
  });

  back_end_spawn.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  back_end_spawn.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });

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
