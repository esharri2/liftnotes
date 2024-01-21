<script>
  import { user } from '$lib/stores';
  import ExerciseForm from '$lib/ExerciseForm.svelte';
  import { deleteExercise } from '$lib/api';

  let adding = false; // Boolean
  let editing = false; // Index of exercise being edited

  let { exercises } = user;
  user.subscribe((value) => {
    exercises = value.exercises;
  });
</script>

{#if typeof editing === 'number'}
  <ExerciseForm
    bind:adding
    bind:editing
    startingValues={exercises[editing]}
     />
{:else}
  {#if adding}
    <ExerciseForm bind:adding bind:editing />
  {:else}
    <button
      on:click={() => {
        adding = true;
      }}>
      Add an exercise
    </button>
  {/if}

  {#if exercises}
    <ol>
      {#each exercises as exercise, index}
        <li>
          <div>{exercise.name}</div>
          <div>Reps: {exercise.reps}</div>
          <div>Sets: {exercise.sets}</div>
          <button
            on:click={() => {
              editing = index;
            }}>
            Edit
          </button>
          <button
            on:click={async () => {
              await deleteExercise(exercises[index]);
            }}>
            Delete
          </button>
        </li>
      {/each}
    </ol>
  {/if}
{/if}
