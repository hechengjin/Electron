'use strict';
var $ = require('dombo')
const assert = require('assert')
const path = require('path')
const BrowserWindow = require('electron').remote.BrowserWindow


let sentMailBrowserWindowProxy;
let sendBrowserWindow
var fixtures = path.resolve(__dirname, '')
function openSendMailDialog () {
   sendBrowserWindow = new BrowserWindow({
      show: true,
      width: 400,
      height: 400
    })

    sendBrowserWindow.webContents.on('did-finish-load', function () {
        sendBrowserWindow.webContents.openDevTools()
        try {
          sendBrowserWindow.webContents.debugger.attach()
        } catch (err) {
          assert(sendBrowserWindow.webContents.debugger.isAttached())
        }
      })
      //alert('file://' + path.join(fixtures, '', 'sentMail.html'))
      sendBrowserWindow.webContents.loadURL('file://' + path.join(fixtures, '', 'sentMail.html'))
}



$('#sendMail').on('click', openSendMailDialog)

window.addEventListener('unload', function (e) {
  if (sendBrowserWindow != null) {
     sendBrowserWindow.destroy()
   }
   sendBrowserWindow = null
}, false);
