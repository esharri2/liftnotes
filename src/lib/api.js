import { db } from '$lib/firebase/firebase.client';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

const getUserRef = (email) => doc(db, 'users', email);

const createUserInDB = async (email) => {
  await setDoc(doc(db, 'users', email), {
    email,
    registrationTimestamp: Date.now(),
    exercises: [
      { name: 'Bench press', set: 5, reps: 5 },
      { name: 'Squat', set: 5, reps: 5 },
      { name: 'Deadlift', set: 3, reps: 5 }
    ]
  });
};

const addExercise = async (email, obj) => {
  const userRef = getUserRef(email);

  await updateDoc(userRef, {
    test: true
  });
};

export { createUserInDB };
