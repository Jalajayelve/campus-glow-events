
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { toast } from 'sonner';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgdQ5Q-xjWM50Iu-Wbf9ChCEC_fJzyuF0",
  authDomain: "eventmanager-48e43.firebaseapp.com",
  projectId: "eventmanager-48e43",
  storageBucket: "eventmanager-48e43.appspot.com",
  messagingSenderId: "283870973640",
  appId: "1:283870973640:web:b325897d5e097bdaad1ffd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Function to create a new event in Firestore
export const createEvent = async (eventData) => {
  try {
    const docRef = await addDoc(collection(db, "events"), {
      ...eventData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    toast.success("Event created successfully! 🎉");
    return docRef.id;
  } catch (error) {
    console.error("Error creating event: ", error);
    toast.error("Oops! Failed to create the event 😕");
    throw error;
  }
};

export { db, auth };
