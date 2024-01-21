<script>
  import { addExercise, updateExercise } from '$lib/api';
  export let adding = false;
  export let editing = false;
  export let startingValues = {};

  const { name: startingName, sets: startingSets, reps: startingReps, id } = startingValues;

  let name = startingName || '';
  let sets = startingSets || 3;
  let reps = startingReps || 5;

  let saving = false;

  const reset = () => {
    adding = false;
    editing = false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    saving = true;
    console.log('handle submit, editing?', editing);
    console.log(editing>=0);
    if (typeof editing === "number" && editing >= 0) {
      console.log("UP")
      await updateExercise({ name, sets, reps, id });
    } else {
      console.log("ADD")
      await addExercise({ name, sets, reps });
    }
    saving = false;
    reset();
  };
</script>

<form on:submit={handleSubmit}>
  <label>
    Exercise name:
    <input type="text" bind:value={name} placeholder="Name" />
  </label>
  <label>
    Sets <input type="number" bind:value={sets} placeholder="Sets" />
  </label>
  <label>
    Reps <input type="number" bind:value={reps} placeholder="Reps" />
  </label>
  <button type="submit">Save</button>
  <button type="button" on:click={reset}>Cancel</button>
</form>
