// www.youtube.com/watch?v=8NlUTFppJkU

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_APIKEY,
	authDomain: import.meta.env.VITE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_PROJECTID,
	storageBucket: import.meta.env.VITE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_APPID
};

// Initialize Firebase
// let firebaseApp;
// if (!getApps().length) {
// 	firebaseApp = initializeApp(firebaseConfig);
// } else {
// 	firebaseApp = getApp();
// 	deleteApp(firebaseApp);
// 	firebaseApp = initializeApp(firebaseConfig);
// }

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
