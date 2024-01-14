import { writable } from 'svelte/store';
import { auth } from '../lib/firebase/firebase.client';
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
  signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword
} from 'firebase/auth';

import { createUserInDB } from '../lib/api';

export const user = writable(null);
export const loadingAuth = writable(true);

export const authHandlers = {
  signup: async (email, password) => {
    // Creates authentication record
    const userData = await createUserWithEmailAndPassword(auth, email, password);
    const user = await createUserInDB(email);
    user.update(() => userData);
  },
  login: async (email, password) => {
    const userData = await signInWithEmailAndPassword(auth, email, password);
    user.update(() => userData);
  },
  logout: async () => {
    await signOut(auth);
    window.location.href = '/';
    user.update(() => null);
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
