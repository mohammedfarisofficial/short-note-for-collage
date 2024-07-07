import "./app.scss";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { pdfjs } from "react-pdf";

// react-pdf worker setup
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
getAnalytics(app);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
