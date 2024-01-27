<script>
  import { user } from '$lib/stores';
  import { addWorkout, updateWorkout } from '$lib/api';
  import { generateArray } from '$lib/helpers';

  let exercises = [];
  let workouts = [];
  let unit = 'lbs';
  user.subscribe((value) => {
    exercises = value.exercises || exercises;
    workouts = value.workouts || workouts;
    unit = value.preferences?.unit || unit;
  });

  const DEFAULT_REP = { weight: 0, unit };
  const DEFAULT_ACTIVITIES = [{ exercise: '', sets: [] }];

  const form = {
    date: '',
    notes: '',
    activities: DEFAULT_ACTIVITIES
  };

  let saving = false;

  // Add choose exercise name for activity and add default sets/reps to form
  const handleExerciseSelection = (event, index) => {
    const { name, reps, sets } = exercises.find(({ id }) => id === event.target.value);
    form.activities[index].exercise = name;
    form.activities[index].sets = generateArray(sets).map((set) =>
      generateArray(reps).map((rep) => DEFAULT_REP)
    );
  };

  const handleAddSet = (activityIndex) => {
    // form.activities[activityIndex].sets.push(form.activities[activityIndex].sets[form.activities[activityIndex].sets.length + 1])
  };

  const handleRemoveSet = () => {};

  const handleAddRep = (activityIndex, setIndex) => {
    form.activities[activityIndex][setIndex] = DEFAULT_REP;
  };

  const handleRemoveRep = (activityIndex, setIndex) => {
    // Get the sets
    let sets = form.activities[activityIndex].sets;
    // Remove last rep in the set
    sets[setIndex].pop();
    // Save to state
    form.activities[activityIndex].sets = [...sets];
  };

  const handleSubmit = async (event) => {
    saving = true;
    alert('save form');
    // if (typeof editing === 'number' && editing >= 0) {
    //   await updateWorkout(form);
    // } else {
    //   await addWorkout(form);
    // }
    saving = false;
    // todo rdirect? change state?
  };
</script>

<h1>Add your workout details</h1>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Date:
    <input type="date" bind:value={form.date} />
  </label>
  <label>
    Notes <input type="text" bind:value={form.notes} placeholder="Notes" />
  </label>

  <!-- TODO if no exercises, redirect -->

  {#each form.activities as activity, activityIndex}
    <h2>Exercise {activityIndex + 1}</h2>
    <select
      on:change={(event) => handleExerciseSelection(event, activityIndex)}
      name="exercise"
      id="exercise">
      <option value="">- Select exericse --</option>
      {#each exercises as exercise}
        <option value={exercise.id}>{exercise.name}</option>
      {/each}
    </select>
    <p>Selected exercise: {activity.exercise || "None"}</p>
    {#if activity.exercise}
      <h3>Sets:</h3>

      {#each activity.sets as set, setIndex}
        <h4>Set {setIndex + 1}</h4>
        {#each set as rep, index}
          <label>
            Rep {index + 1}
            <input type="text" />
          </label>
        {/each}
        <div>
          <button type="button" on:click={() => handleAddRep(activityIndex, setIndex)}>
            Add rep
          </button>
          <button type="button" on:click={() => handleRemoveRep(activityIndex, setIndex)}>
            Remove rep
          </button>
          <button type="button" on:click={() => handleRemoveSet(activityIndex, setIndex)}>
            Delete this set
          </button>
        </div>
      {/each}
    {/if}
    <!-- <button type="button" on:click={() => handleAddSet(activityIndex)}>Add a set</button> -->
  {/each}

  <!-- <button>Add another exercise</button> -->
  <div>
    <button disabled={saving} type="submit">{saving ? 'Wait' : 'Save'}</button>
    <a href="/dashboard">Cancel</a>
  </div>
</form>
