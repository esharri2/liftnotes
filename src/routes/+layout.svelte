<script>
  import { onMount } from 'svelte';
  import { auth } from '$lib/firebase/firebase.client';
  import { user, loadingAuth } from '../stores/authStore';

  onMount(() => {
    auth.onAuthStateChanged((userData) => {
      console.log("STATE CHANGE");
      console.log(userData);
      loadingAuth.update(() => false);
      user.update(() => userData);
    });
  });
</script>

<h1><a href="/">Sveltekit + Firebase Clientside Auth</a></h1>
<div>
  {#if $loadingAuth === true}
    Loading...
  {:else}
    {$user ? `User: ${$user.email}` : 'You are not logged in.'}
  {/if}
</div>

<hr />
<slot />
