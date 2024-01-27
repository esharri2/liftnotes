<script>
  import { user } from '$lib/stores';
  import { addWorkout, updateWorkout } from '$lib/api';

  let exercises = [];
  let workouts = [];
  let unit = 'lbs';
  user.subscribe((value) => {
    exercises = value.exercises || exercises;
    workouts = value.workouts || workouts;
    unit = value.preferences?.unit || preferences;
  });

  const form = {
    date: '',
    notes: '',
    activities: [{ exercise: '', sets: [{ weight: 0, unit }] }]
  };

  let saving = false;

  const handleSubmit = async (event) => {
    event.preventDefault();
    saving = true;
    alert("save form");
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

<form on:submit={handleSubmit}>
  <label>
    Date:
    <input type="date" bind:value={form.date} />
  </label>
  <label>
    Notes <input type="text" bind:value={form.notes} placeholder="Notes" />
  </label>

  {#each form.activities as activity, index}
  <h2>Exercise {index + 1}</h2>
      <!-- add a form for each activity -->
  {/each}

  <!-- <button>Add another exercise</button> -->
  <div>
    <button disabled={saving} type="submit">{saving ? 'Wait' : 'Save'}</button>
    <a href="/dashboard">Cancel</a>
  </div>
</form>
