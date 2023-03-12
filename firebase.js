import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBZlT1rtSUyd7MgFdeqtdsMkE38FiffzN4",
  authDomain: "rce70-616fc.firebaseapp.com",
  projectId: "rce70-616fc",
  storageBucket: "rce70-616fc.appspot.com",
  messagingSenderId: "401904107771",
  appId: "1:401904107771:web:384ae432742ef928f9305e",
  databaseURL: "https://rce70-616fc-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;