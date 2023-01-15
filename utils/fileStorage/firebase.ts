import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { env } from "process";

const firebaseConfig = {
    apiKey: env.FIREBASE_API_KEY,
    projectId: env.FIREBASE_PROJECT_ID,
    storageBucket: env.FIREBASE_STORAGE_BUCKET,
    appId: env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "shattereddev-storage");


// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export default storage;