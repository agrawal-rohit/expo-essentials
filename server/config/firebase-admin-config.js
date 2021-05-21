const firebase = require('firebase-admin');
const settings = require('./settings')

var serviceAccount = require('./firebase-service-account-dev.json');

module.exports = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: settings.firebaseDatabaseUrl
})