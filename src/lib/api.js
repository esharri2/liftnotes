import { db } from '$lib/firebase/firebase.client';
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { user } from './stores';

let email;

user.subscribe((value) => {
  email = value?.email;
});

const getUserRef = async (email) => doc(db, 'users', email);

const getUser = async (email) => {
  const userRef = await getUserRef(email);
  const userDoc = await getDoc(userRef);
  return userDoc.data();
};

const syncUserToStore = async () => {
  console.log('SYCN!', email);
  const data = await getUser(email);
  console.log(data);
  user.update(() => data);
};

const createUserInDB = async (email) => {
  await setDoc(doc(db, 'users', email), {
    email,
    registrationTimestamp: Date.now(),
    exercises: [
      { name: 'Bench press', sets: 5, reps: 5 },
      { name: 'Squat', sets: 5, reps: 5 },
      { name: 'Deadlift', sets: 3, reps: 5 }
    ]
  });
  return;
};

const addExercise = async (exercise) => {
  const userRef = await getUserRef(email);
  await updateDoc(userRef, {
    exercises: arrayUnion(exercise)
  });
  await syncUserToStore();
};

const deleteExercise = async (exercise) => {
  const userRef = await getUserRef(email);
  await updateDoc(userRef, {
    exercises: arrayRemove(exercise)
  });
  await syncUserToStore();
};

export { addExercise, createUserInDB, deleteExercise, getUser };
