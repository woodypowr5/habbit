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

const stripeProduct = 'prod_DnArKOitOGmJkz';
const stripePlans = {
    monthly: 'plan_DnAsVDFeJRWlRm',
    annual: 'plan_DnAsX5dFauBCg8'
};

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
            token: null,
            customerId: customerId,
            subscription: null,
            userId: user.uid 
        });
    });     
});

exports.createSubscription = functions.firestore.document('/customers/{userId}')
    .onUpdate((change, context) => {
        if (change.before.data().source !== change.after.data().source) {
            const newValue = change.after.data();
            const customer = {
                id: newValue.customerId,
                source: newValue.source,
                subscription: newValue.subscription,
                userId: newValue.userId
            };
            console.log("NEW SOURCE");   
            console.log('newValue:');
            console.log(newValue);    

            stripe.customers.createSource(customer.id, {
                source: customer.source.id
            }, function(err, source) {
                return stripe.subscriptions.create({
                    customer: customer.id,
                    items: [
                        {
                            plan: stripePlans.monthly
                        }
                    ] 
                })
                .then(sub => {
                    console.log(context);
                    console.log("YEHAAW");
                    db.collection('customers').doc(user.uid).set({
                        source: source,
                        customerId: customer.id,
                        subscription: 'active',
                        userId: customer.userId
                    });
                })
                .catch(error => console.log(error))
            });
        } else {
            console.log("no difference");
            console.log("BEFORE:");
            console.log(change.before.data().source);
            console.log("AfTER:");
            console.log(change.after.data().source);
        }
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