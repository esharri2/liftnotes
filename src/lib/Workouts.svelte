<script>
  import { user } from '$lib/stores';

  const sortedWorkouts = $user.workouts.sort((a, b) => {
    if (b.date > a.date) {
      return 1;
    } else if (a.date > b.date) {
      return -1;
    }
    return 0;
  });

  console.log(sortedWorkouts)
</script>

<h1>Your workout history</h1>
{#if $user.workouts}
  <ol>
    {#each sortedWorkouts as workout, index}
      <li>
        {workout.date} | {workout.id} :
        <a href={`/workout?id=${workout.id}`}>Edit</a>
      </li>
    {/each}
  </ol>
{:else}
  You have not logged any workouts yet!
{/if}
