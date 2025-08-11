import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpU274gpEDkbbGdFyR_rug87EJSzYGgO4",
  authDomain: "resume-builder-mern-ff2cc.firebaseapp.com",
  projectId: "resume-builder-mern-ff2cc",
  storageBucket: "resume-builder-mern-ff2cc.firebasestorage.app",
  messagingSenderId: "378952483882",
  appId: "1:378952483882:web:aa7fc1c17222be934f2f53",
  measurementId: "G-MHKJM0S3H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export the app for auth and other usage
export { app };

// Optional: export analytics if needed
export const analytics = getAnalytics(app);
