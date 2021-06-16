const firebase = require("firebase-admin");
const settings = require("./settings");

var serviceAccount;

if (settings.environment == "development") {
  serviceAccount = require("./firebase-service-account-dev.json");
} else if (settings.environment == "staging") {
  serviceAccount = require("./firebase-service-account-staging.json");
} else {
  serviceAccount = require("./firebase-service-account-prod.json");
}

module.exports = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: settings.firebaseDatabaseUrl,
});
