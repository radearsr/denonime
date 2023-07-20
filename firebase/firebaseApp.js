import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD07kNw8LsNVD66I_EH9sQrLQXC3wCeKaE",
  authDomain: "deyapro-63b66.firebaseapp.com",
  projectId: "deyapro-63b66",
  storageBucket: "deyapro-63b66.appspot.com",
  messagingSenderId: "134230060849",
  appId: "1:134230060849:web:2eeb77b7a2a104e8614a10",
  measurementId: "G-Y5GYHJD7YN",
};

export const app = initializeApp(firebaseConfig);

export const initFirebase = () => (app);
