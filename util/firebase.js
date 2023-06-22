var admin = require("firebase-admin");

const serviceAccount = require("../key.json");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = firebaseApp.messaging();

module.exports = firebaseApp;