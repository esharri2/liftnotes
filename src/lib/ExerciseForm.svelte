<script>
  import { addExercise } from "$lib/api";
  export let adding;
  export let editing;
  export let defaultName;
  export let defaultSets;
  export let defaultReps;
  let name = defaultName || '';
  let sets = defaultSets || 3;
  let reps = defaultReps || 5;

  let updating = false;

  const handleSubmit = (event) => {
    event.preventDefault();
  
    updating = true;
    if (editing) {
      // update
    } else {
      addExercise({name, sets, reps} )
    }
    updating = false;
  }
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
  <button
    type="button"
    on:click={() => {
      adding = false;
      editing = false;
    }}>
    Cancel
  </button>
</form>
