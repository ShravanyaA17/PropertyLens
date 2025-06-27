import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKmg6Z-hSUfZaDP4End8K5dajWPCHnSdU",
  authDomain: "propertylens-41122.firebaseapp.com",
  projectId: "propertylens-41122",
  storageBucket: "propertylens-41122.appspot.com",
  messagingSenderId: "902455840466",
  appId: "1:902455840466:web:ca869fe85e8e7bce23a70b",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };
