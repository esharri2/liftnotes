<script>
  import TestHeader from '$lib/TestHeader.svelte';

  import { onMount } from 'svelte';
  import { auth } from '$lib/firebase/firebase.client';
  import { authState, loadingAuth, user } from '$lib/stores';
  import { getUser } from '$lib/api';

  onMount(() => {
    auth.onAuthStateChanged(async (data) => {
      if (data && data.email) {
        const userData = await getUser(data.email);
        user.update(() => userData);
      }
      authState.update(() => data);
      loadingAuth.update(() => false);
    });
  });
</script>

<TestHeader />
{#if $loadingAuth}
  loading
{:else}
  <slot />{/if}
