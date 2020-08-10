const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wescan.firebaseio.com",
});



module.exports = admin


