import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
        apiKey: "AIzaSyDFP2k-aYICcFx3G_3__ZkVxfkToxnvObk",
        authDomain: "twitter-f75e3.firebaseapp.com",
        projectId: "twitter-f75e3",
        storageBucket: "twitter-f75e3.appspot.com",
        messagingSenderId: "885550879743",
        appId: "1:885550879743:web:c7c5b31929e720775acdca",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
