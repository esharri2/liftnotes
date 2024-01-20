import { writable } from 'svelte/store';

export const authState = writable(null);
export const loadingAuth = writable(true);
export const user = writable(null);
