import admin from "firebase-admin";

import serviceAccount from "../config/mobile-tracktime-firebase-adminsdk-wuohr-e17e04c5b7.json";

const initAdminFirebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mobile-tracktime.firebaseio.com"
});

export default initAdminFirebase;
