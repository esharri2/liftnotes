<script>
  import { authState, loadingAuth, user } from '$lib/stores';
  import { authHandlers } from "$lib/auth";

  console.log("test header user: ", $user);
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
