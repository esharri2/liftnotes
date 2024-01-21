import { db } from '$lib/firebase/firebase.client';
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { user } from './stores';
import { uuid } from './helpers';

// Keep up-to-date values from store to use in API calls
let email;
let exercises;

user.subscribe((value) => {
  email = value?.email;
  exercises = value?.exercises;
});

const getUserRef = async (email) => doc(db, 'users', email);

const getUser = async (email) => {
  const userRef = await getUserRef(email);
  const userDoc = await getDoc(userRef);
  return userDoc.data();
};

const syncUserToStore = async () => {
  const data = await getUser(email);
  user.update(() => data);
};

const DEFAULT_WARMUP = [
  { reps: 5, percent: 40 },
  { reps: 5, percent: 60 },
  { reps: 3, percent: 80 }
];
const DEFAULT_EXERCISES = [
  { name: 'Barbell bench press', sets: 5, reps: 5, warmup: DEFAULT_WARMUP, id: uuid() },
  { name: 'Barbell squat', sets: 5, reps: 5, warmup: DEFAULT_WARMUP, id: uuid() },
  { name: 'Barbell deadlift', sets: 3, reps: 5, warmup: DEFAULT_WARMUP, id: uuid() },
  { name: 'Overhead barbell press', sets: 3, reps: 8, warmup: DEFAULT_WARMUP, id: uuid() },
  { name: 'Lat pulldown', sets: 3, reps: 8, warmup: DEFAULT_WARMUP, id: uuid() },
  { name: 'Bent-over barbell row', sets: 3, reps: 5, warmup: DEFAULT_WARMUP, id: uuid() }
];
const createUserInDB = async (email) => {
  await setDoc(doc(db, 'users', email), {
    email,
    registrationTimestamp: Date.now(),
    exercises: DEFAULT_EXERCISES
  });
  return;
};

const addExercise = async (exercise) => {
  exercise.id = uuid();
  const userRef = await getUserRef(email);
  await updateDoc(userRef, {
    exercises: arrayUnion(exercise)
  });
  await syncUserToStore();
};

const updateExercise = async (updatedExercise) => {
  const index = exercises.findIndex((exercise) => exercise.id === updatedExercise.id);
  if (index === -1) {
    console.error('updateExercise error: Could not find exercise with this id.');
  }
  exercises[index] = updatedExercise;
  const userRef = await getUserRef(email);
  await updateDoc(userRef, {
    exercises
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

export { addExercise, createUserInDB, deleteExercise, getUser, updateExercise };
