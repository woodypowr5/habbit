const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.sendTestMessage = functions.firestore
  .document(`messages/{messageId}`)
  .onCreate(snap => {
    console.log(snap.data());
    let userId = snap.data().userId;
    let html = snap.data().html;
    let mailOptions = {
        to: 'company@habbit.info',
        subject: 'Test: ' + userId,
        html: html
    };
    return mailTransport.sendMail(mailOptions).then(() => {
        return console.log('Mail sent to: company@habbit.info');
    });
});

// firebase functions:config:set gmail.email="company@habbit.com" gmail.password="QHfo27$&@"