import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDEtJvGH2knN-oRsd0RwOHpW9aw419nux8",
  authDomain: "countries-data-13bd9.firebaseapp.com",
  projectId: "countries-data-13bd9",
  storageBucket: "countries-data-13bd9.appspot.com",
  messagingSenderId: "281575388334",
  appId: "1:281575388334:web:294805180a59e475b6293f",
  measurementId: "G-YGME2SHSKB",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
