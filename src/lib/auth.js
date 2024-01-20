import { auth } from '../lib/firebase/firebase.client';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword
} from 'firebase/auth';

import { createUserInDB } from '$lib/api';

export const authHandlers = {
  signup: async (email, password) => {
    // Creates authentication record
    await createUserWithEmailAndPassword(auth, email, password);
    // Creates user doc in DB where we store all the stuff
    await createUserInDB(email);
  },
  login: async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  },
  logout: async () => {
    await signOut(auth);
    window.location.href = '/';
  },
  resetPassword: async (email) => {
    await sendPasswordResetEmail(auth, email);
  },
  updateEmail: async (email) => {
    await updateEmail(auth, email);
  },
  updatePassword: async (password) => {
    await updatePassword(auth, password);
  }
};
