const functions = require('firebase-functions');
const admin = require('firebase-admin');

const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
const stripe = require('stripe')('sk_test_IvOosPXVlCxl1xOeT7sUCxlL');

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
    apiKey: 'AIzaSyA4ZyNXBoRhVpDuEvNbFidOQvx6lDamgqI',
    authDomain: 'habbitapp.firebaseapp.com',
    databaseURL: 'https://habbitapp.firebaseio.com',
    projectId: 'habbitapp',
    storageBucket: 'habbitapp.appspot.com',
    messagingSenderId: '601664610822'
});

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

exports.sendTestMessage = functions.firestore
  .document(`messages/{messageId}`)
  .onCreate(snap => {
    let subject = snap.data().subject;
    let html = snap.data().html;
    let mailOptions = {
        to: 'company@habbit.info',
        subject: snap.data().mailbox + ': ' + subject,
        html: html
    };
    return mailTransport.sendMail(mailOptions).then(() => {
        return console.log('Mail sent to: company@habbit.info');
    });
});


exports.createStripeCustomer = functions.auth.user().onCreate(user => {
    console.log(user);
    // register Stripe user
    return stripe.customers.create({
        email: user.email
    }).then(customer => {
        console.log(customer);
        const customerId = customer.id;
        // const store = admin.firestore('habbitApp');
        db.collection('customers').doc(user.uid).set({
             customerId: customerId,
        }, {merge: true});
    });     
});

// firebase functions:config:set gmail.email="company@habbit.com" gmail.password="QHfo27$&@"
exports.stripeCharge =  functions.firestore
        .document('payments/{userId}')
        .onWrite(change => {
            stripe.subscriptions.list(
                { limit: 3 },
                function(err, subscriptions) {
                    console.log("errors: ");
                    console.log(err);
                    console.log("subscriptions");
                    console.log(subscriptions);
              });


        }
    );
// functions.firestore
// .document(`/payments/{userId}`)
// .onUpdate(snap => {
//     console.log(snap);
// });
    // functions.database
    // .ref('/payments/{userId}/{paymentId}')
    // .onWrite(event => {
    //     console.log("HELLO");
    //     const payment = event.data.val();
    //     const userId = event.params.userId;
    //     const paymentId = event.params.paymentId; 
    // // checks if payment exists or if it has already been charged
    // if (!payment || payment.charge) return;
    // return admin.database()
    //     .ref(`/users/${userId}`)
    //     .once('value')
    //     .then(snapshot => {
    //         return snapshot.val();
    //     })
    //     .then(customer => {
    //         const amount = payment.amount;
    //         const idempotency_key = paymentId;  // prevent duplicate charges
    //         const source = payment.token.id;
    //         const currency = 'usd';
    //         const charge = {amount, currency, source};
    //         console.log(stripe);
    //         return stripe.charges.create(charge, { idempotency_key });
    //     })
    //     .then(charge => {
    //         admin.database()
    //                 .ref(`/payments/${userId}/${paymentId}/charge`)
    //                 .set(charge)
    //         }
    //     )
    // }
// );