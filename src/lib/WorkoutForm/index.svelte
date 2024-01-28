<script>
  export let adding = true;
  import { user } from '$lib/stores';
  import { addWorkout, updateWorkout } from '$lib/api';
  import DateInput from './DateInput.svelte';
  import NotesInput from './NotesInput.svelte';
  import ExerciseSelect from './ExerciseSelect.svelte';
  import Set from './Set.svelte';

  let exercises = [];
  let workouts = [];
  let unit = 'lbs';
  user.subscribe((value) => {
    exercises = value.exercises || exercises;
    workouts = value.workouts || workouts;
    unit = value.preferences?.unit || unit;
  });

  const DEFAULT_ACTIVITIES = [{ exercise: '', sets: [] }];
  const DEFAULT_REP = { weight: 0, unit };

  let date = '';
  let notes = '';
  let activities = DEFAULT_ACTIVITIES;

  $: console.log("ACTIVITIES: ", activities);

  let saving = false;

  const handleAddSet = (activityIndex) => {
    const sets = activities[activityIndex].sets;
    const lastSet = sets[sets.length - 1];
    activities[activityIndex].sets = [...activities[activityIndex].sets, lastSet];
  };

  const handleRemoveSet = (activityIndex, setIndex) => {
    activities[activityIndex].sets = [...activities[activityIndex].sets.toSpliced(setIndex, 1)];
  };

  const handleSubmit = async (event) => {
    saving = true;
    await addWorkout({ date, notes, activities });
    saving = false;
  };
</script>

<h1>Add your workout details</h1>

<form on:submit|preventDefault={handleSubmit}>
  <DateInput bind:date />
  <NotesInput bind:notes />

  <!-- TODO if no exercises, redirect -->

  {#each activities as activity, activityIndex}
    <h2>Exercise {activityIndex + 1}</h2>
    <ExerciseSelect {exercises} bind:activities index={activityIndex} rep={DEFAULT_REP} />
    <p>Selected exercise: {activity.exercise || 'None'}</p>
    {#if activity.exercise}
      <h3>Sets:</h3>
      {#each activity.sets as set, setIndex}
        <Set bind:set {handleRemoveSet} {activityIndex} {setIndex} rep={DEFAULT_REP} />
      {/each}
      <button type="button" on:click={() => handleAddSet(activityIndex)}>add a set</button>
    {/if}
  {/each}

  <div>
    <button disabled={saving} type="submit">{saving ? 'Wait' : 'Save'}</button>
    <a href="/dashboard">Cancel</a>
  </div>
</form>
