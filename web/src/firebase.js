// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDuz6s3-PvrzfhXFjd2tQBqvS0SoInqFdo",
	authDomain: "orderbyte-web.firebaseapp.com",
	projectId: "orderbyte-web",
	storageBucket: "orderbyte-web.appspot.com",
	messagingSenderId: "799398566340",
	appId: "1:799398566340:web:36f84530ce4d2a3aceec91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default { app, db };
