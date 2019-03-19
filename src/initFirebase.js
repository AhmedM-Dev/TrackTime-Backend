import { initializeApp } from "firebase";

const config = {
  projectId: "mobile-tracktime",
  apiKey: "AIzaSyC_NBVLPhgaiBYOMnYNEbyL35o3U7fuXZ0",
  authDomain: "mobile-tracktime.firebaseapp.com",
  databaseURL: "https://mobile-tracktime.firebaseio.com/"
}

const initFirebase = initializeApp(config);

export default initFirebase;
