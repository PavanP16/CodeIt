var admin = require("firebase-admin");

var serviceAccount = require("C:/Users/Pavan kumar/Downloads/codeit-1e6d1-firebase-adminsdk-j5xr6-9c1bf9c80e.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.storageBucket,
});

const bucket = admin.storage().bucket();

module.exports = bucket;