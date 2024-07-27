import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDi1yijAjx1zOo0GbpLf-0ZBQQYo4aEOe4",
  authDomain: "blinko-4f62f.firebaseapp.com",
  projectId: "blinko-4f62f",
  messagingSenderId: "1090124032010",
  appId: "1:1090124032010:web:1bde9dfa416b401f2797f3",
  measurementId: "G-2G9NJW448G",
  storageBucket: "gs://blinko-4f62f.appspot.com",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
