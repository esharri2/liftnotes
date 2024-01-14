<script>
  import { onMount } from 'svelte';
  import { auth } from '$lib/firebase/firebase.client';
  import { user, loadingAuth, authHandlers } from '../stores/authStore';

  onMount(() => {
    auth.onAuthStateChanged((userData) => {
      loadingAuth.update(() => false);
      console.log("auth state changed, user data is: ", userData);
      user.update(() => userData);
    });
  });
</script>

<a href="/">Sveltekit + Firebase Clientside Auth</a>
<div>
  {#if $loadingAuth === true}
    Loading...
  {:else}
    {$user ? `User: ${$user.email}` : 'You are not logged in.'}
  {/if}
  {#if $user}
    <button on:click={authHandlers.logout}>Log out</button>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
  {/if}
</div>

<hr />