'use strict';
var $ = require('dombo')

let nodemailer = require("nodemailer");

let sentMailBrowserWindowProxy;
function openSendMailDialog () {
  // alert(111)
  // console.log('1111')
  sentMailBrowserWindowProxy = window.open('file://' + __dirname + '/sentMail.html', 'sentMail',
   'width=500,height=300,skipTaskbar=yes,autoHideMenuBar=yes');
}


function sendMail () {
  let nm = nodemailer.createTransport({
				host: 'smtp.139.com',
				port: 25,
				auth: {
						user: '15313159857@139.com',
						pass: 'Draeagi94'
				},
				ignoreTLS: true,
				logger: false
		});

    let myDate = new Date()
    let dateString = myDate.toLocaleString()
    dateString = dateString + '.'

    // return getMailInfo(dateString, nm)
    let count = 0
    setInterval(() => {
      getMailInfo(dateString, nm).then(function(info) {
      console.log('OK: ' + count + ' '+ JSON.stringify(info))
      }, function(error) {
        console.error('Error: ' + count + ' '+ error);
      });
    }, 5000);
}
var getMailInfo = function(dateString, nm) {
  var promise = new Promise(function(resolve, reject){
    let myDate = new Date()
    let milliseconds = myDate.getMilliseconds()
    let mailData = {
      from: '15313159857@139.com',
      to: ['bigdata_fire@hotmail.com'],
      subject: 'html5学习' + dateString + milliseconds,
      date: new Date(),
      messageId: 'www.firemail.wang_' + dateString + milliseconds,
      xMailer: 'aaa',
      text: '一起学习Html5，QQ群：245146134'
    };

    nm.sendMail(mailData, function (err, info) {
      if (err === null) {
        resolve(info);
      } else {
        reject(err);
      }
    });
  });

  return promise;
};
$('#sendMail').on('click', sendMail)
