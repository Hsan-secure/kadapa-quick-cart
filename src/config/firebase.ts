import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBPg7La7t_EdgGU3yI35t0I6VQVsq_bBUY",
  authDomain: "quick-delivery-79d4f.firebaseapp.com",
  projectId: "quick-delivery-79d4f",
  storageBucket: "quick-delivery-79d4f.firebasestorage.app",
  messagingSenderId: "924847059875",
  appId: "1:924847059875:web:fc8d67e1a2616affc62016",
  measurementId: "G-B877R3SLK2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;