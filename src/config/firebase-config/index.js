import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, serverTimestamp, set, get, orderByChild } from "firebase/database";
import { query } from "firebase/firestore";

import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDMirwB_ms0XHhiOU1XaVZ5SLgd-ylxB7M",
  authDomain: "astroremedy-90cb0.firebaseapp.com",
  databaseURL: "https://astroremedy-90cb0-default-rtdb.firebaseio.com",
  projectId: "astroremedy-90cb0",
  storageBucket: "astroremedy-90cb0.appspot.com",
  messagingSenderId: "395034377495",
  appId: "1:395034377495:web:c2311de2d8982ea31dcb52",
};

//! Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

//! Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

export { database, ref, push, onValue, serverTimestamp, set, messaging, get, orderByChild, query };