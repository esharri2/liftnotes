<script>
  import { user } from '$lib/stores';
</script>

<h1>Your workout history</h1>
{#if $user.workouts}
  {#each $user.workouts as workout, index}
    {index}
  {/each}
{:else}
  You have not logged any workouts yet!
{/if}
