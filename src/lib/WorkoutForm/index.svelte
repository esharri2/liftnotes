<script>
  import { user } from '$lib/stores';
  import { upsertWorkout } from '$lib/api';
  import { uuid } from '$lib/helpers';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
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

  const workoutId =  $page.url.searchParams.get('id');
  const workoutToEdit = workouts.find((workout) => workout.id === workoutId);

  const DEFAULT_ACTIVITY = { id: uuid(), exercise: '', sets: [] };
  const DEFAULT_REP = { weight: null, unit };

  // Default to current date
  let date = workoutToEdit.date || new Date().toISOString().split('T')[0];
  let notes = workoutToEdit.notes || '';
  let activities = workoutToEdit.activities || [{ ...DEFAULT_ACTIVITY }];

  let saving = false;

  const handleAddActivity = () => {
    const newActivity = { ...DEFAULT_ACTIVITY };
    newActivity.id = uuid();
    activities = [...activities, newActivity];
  };

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
    const workoutPayload = { date, notes, activities };
    if (workoutId) {
      workoutPayload.id = workoutId;
    }
    await upsertWorkout(workoutPayload);
    saving = false;
    goto('/dashboard');
  };

  // Keep track of sets where the user has manually modified a rep weight value so we can skip predicting values
  let modifiedSets = {};

  const predictReps = (predictedRep, activityId, setIndex, repIndex) => {
    const modifiedSetsForThisActivity = modifiedSets[activityId] || [];

    if (!modifiedSetsForThisActivity.includes(setIndex) && repIndex === 0) {
      const activityState = activities.find((activity) => activity.id === activityId);
      const { weight, unit } = predictedRep;
      activityState.sets.forEach(({ set }, index) => {
        if (index >= setIndex && !modifiedSetsForThisActivity.includes(index)) {
          console.log('updating loop: ', index);
          set.forEach((rep) => {
            rep.weight = weight;
            rep.unit = unit;
          });
        }
      });
    }

    activities = activities;

    // Track that the set has been manually modified to skip predicting values
    modifiedSets[activityId] = [...modifiedSetsForThisActivity, setIndex];
    // if the rep index is 0, prefill everything afterward across all sets, unless one thing in the set is already filled?
    //
  };
</script>

<h1>Add your workout details</h1>

<form on:submit|preventDefault={handleSubmit}>
  <DateInput bind:date />
  <NotesInput bind:notes />
  <!-- TODO if no exercises, redirect -->
  {#each activities as activity, activityIndex}
    <hr />
    <h2>Activity {activityIndex + 1}{activity.exercise ? `: ${activity.exercise}` : ''}</h2>
    <ExerciseSelect {exercises} bind:activities index={activityIndex} rep={DEFAULT_REP} />
    <p>Selected exercise: {activity.exercise || 'None'}</p>
    {#if activity.exercise}
      <h3>Sets:</h3>
      {#each activity.sets as { set }, setIndex}
        <Set
          bind:set
          {predictReps}
          {handleRemoveSet}
          activityId={activity.id}
          {activityIndex}
          {setIndex}
          rep={DEFAULT_REP} />
      {/each}
      <button class="button" type="button" on:click={() => handleAddSet(activityIndex)}>add a set</button>
    {/if}
  {/each}
  <hr />
  <div>
    <button class="button" type="button" on:click={handleAddActivity}>Add another activity</button>
  </div>

  <div>
    <button class="button" disabled={saving} type="submit">{saving ? 'Wait' : 'Save'}</button>
    <a href="/dashboard">Cancel</a>
  </div>
</form>
