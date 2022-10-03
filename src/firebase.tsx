import firebase,{ initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import  {getAuth} from "firebase/auth";
import {getAnalytics} from "firebase/analytics"; 

const firebaseConfig = {
    apiKey: "AIzaSyCzkfFRCw3BmFw9HnVZYHvdowLuRViZ1DI",
    authDomain: "workingtime-app.firebaseapp.com",
    projectId: "workingtime-app",
    storageBucket: "workingtime-app.appspot.com",
    messagingSenderId: "66787743574",
    appId: "1:66787743574:web:342d4cb0de0673897ae8f7",
    measurementId: "G-2GM4GDC2B4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);