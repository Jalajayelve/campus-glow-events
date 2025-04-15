
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { toast } from 'sonner';

// Firebase configuration - replace with your own values
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
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
    
    toast.success("Event created successfully!");
    return docRef.id;
  } catch (error) {
    console.error("Error creating event: ", error);
    toast.error("Failed to create event");
    throw error;
  }
};

export { db, auth };
