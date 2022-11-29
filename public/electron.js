const { app, BrowserWindow, Menu, Tray, Notification} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const sound = require("sound-play");

let mainWindow;
let tray;
//트레이 아이콘
function initTrayIconMenu(){
  tray = new Tray(path.join(__dirname, '/assets/icon.png'));
  console.log(path.join(__dirname, '/icon.png'));
  const myMenu = Menu.buildFromTemplate([
    {label: '앱 열기', type: 'normal', checked: true, click: ()=>{
      mainWindow.show();
      tray.destroy();
    } },
    {label: '앱 종료', type: 'normal', click: ()=>{
      app.isQuiting = true;
      app.quit();
    }},
  ]);
  tray.setToolTip('데브리')
  tray.setContextMenu(myMenu);
  tray.addListener('double-click', ()=>{
    mainWindow.show()
    tray.destroy();
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    frame: false,
    width: 440,
    height: 839,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be',
      height: 20,
  
    },
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      devTools: isDev,
      webSecurity: false
    },
    autoHideMenuBar: true,
    icon: `${path.join(__dirname, '/assets/icon.png')}`
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `${path.join(__dirname, "/index.html")}`
  );
    // contextMenu();
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
  mainWindow.setResizable(false);
  // mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.focus();
//   mainWindow.on('minimize',function(event){
//     event.preventDefault();
//     mainWindow.hide();
// });

mainWindow.on('close', function (event) {
    if(!app.isQuiting){
        event.preventDefault();
        mainWindow.hide();
        initTrayIconMenu();
        const showNotification = () => {
          new Notification({
            title: "데브리",
            body: "데브리를 트레이에 보관합니다",
            silent: true, //// Disable sound by operating system
          }).show();
        
          // Play custom sound
          
          // console.log(__dirname);
          sound.play(`${path.join(__dirname, "/closeToTraySound.mp3")}`);
        };
        showNotification();
    }
    return false;
});
}

app.on("ready", createWindow);

// localStorage.removeItem('userData');
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
