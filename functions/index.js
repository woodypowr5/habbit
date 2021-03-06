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
        // new source added
        if (change.before.data().source !== change.after.data().source) {
            const newValue = change.after.data();
            const customer = {
                id: newValue.customerId,
                source: newValue.source,
                subscription: 'active',
                userId: newValue.userId
            };
            console.log("CUSTOMER:");
            console.log(customer);
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
                    // need to remove all current subscriptions from customer in Stripe
                    console.log("SETTING SUBSCRIPTION TO ACTIVE: ");
                    console.log("userID:");
                    db.collection('customers').doc(customer.userId).set({
                        source: source,
                        customerId: customer.id,
                        subscription: customer.subscription,
                        userId: customer.userId
                    });
                    db.collection('customers').doc(customer.userId).update({
                        source: source,
                        subscription: 'active'
                    })
                })
                .catch(error => console.log(error))
            });
        }
    }
);

exports.recurringPayment = functions.https.onRequest((req, res) => {
    console.log("TRIGGERED");
    const hook  = req.body.type;
    const data  = req.body.data.object;
    console.log(hook);
    if (!data) throw new Error('missing data')
      // Handle successful payment webhook
        if (hook === 'invoice.payment_succeeded') {
            var customersRef = db.collection('customers');
            var query = customerRef.where('customerId', "==", data.customer);
            query.get().then(function(customer) {
                if (customer.exists) {
                    console.log("Customer Data: ");
                    console.log(customer.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
            

            return db.collection('customers').document(userId).update({ status: 'active' });
        }

        // Handle failed payment webhook
        if (hook === 'invoice.payment_failed') {
            return ref.update({ status: 'pastDue' });
        }

    // return admin.database()
    //   .ref(`/customers/${data.customer}`)
    // 	.once('value')
    // 	.then(snapshot => snapshot.val())
    // 	.then((userId) => {
    //   	const ref = admin.database().ref(`/users/${userId}/pro-membership`)
          
    //       // Handle successful payment webhook
    //       if (hook === 'invoice.payment_succeeded') {
    //   			return ref.update({ status: 'active' });
   	// 			 }
    
    //       // Handle failed payment webhook
    //       if (hook === 'invoice.payment_failed') {
    //         return ref.update({ status: 'pastDue' });
    //       }


    //    })
    //    .then(() => res.status(200).send(`successfully handled ${hook}`) )
    //    .catch(err => res.status(400).send(`error handling ${hook}`))
    }
);    

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