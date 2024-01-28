<script>
  export let index;
  export let exercises;
  export let activities;
  export let rep;
  import { generateArray, uuid } from '$lib/helpers';

  // Add choose exercise name for activity and add default sets/reps to form
  const handleExerciseSelection = (event, index) => {
    const { name, reps, sets } = exercises.find(({ id }) => id === event.target.value);
    activities[index].exercise = name;
    activities[index].sets = generateArray(sets).map((set) =>
      generateArray(reps).map(() => {
        return { ...rep, id: uuid() };
      })
    );
  };
</script>

<select on:change={(event) => handleExerciseSelection(event, index)} name="exercise" id="exercise">
  <option value="">- Select exericse --</option>
  {#each exercises as exercise}
    <option value={exercise.id}>{exercise.name}</option>
  {/each}
</select>
