<script>
  import { addExercise, updateExercise } from '$lib/api';
  export let adding = false;
  export let editing = false;
  export let startingValues = {};

  const {
    name: startingName,
    sets: startingSets,
    reps: startingReps,
    id,
    warmup: startingWarmup
  } = startingValues;

  let name = startingName || '';
  let sets = startingSets || 3;
  let reps = startingReps || 5;
  let warmup = startingWarmup || [
    { reps: 5, percent: 40 },
    { reps: 5, percent: 60 },
    { reps: 3, percent: 80 }
  ];

  let saving = false;

  const reset = () => {
    adding = false;
    editing = false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    saving = true;
    if (typeof editing === 'number' && editing >= 0) {
      await updateExercise({ name, sets, reps, id, warmup });
    } else {
      await addExercise({ name, sets, reps, warmup });
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
  <div>Warmup</div>
  {#each warmup as set, index}
    <div>
      <label>
        Reps <input type="number" bind:value={warmup[index].reps} placeholder="Reps" />
      </label>
      <label>
        Percent of working weight <input
          type="number"
          bind:value={warmup[index].percent}
          placeholder="Percent" />
      </label>
      <button class="button"
        type="button"
        on:click={() => {
          warmup = warmup.toSpliced(index, 1);
        }}>
        Delete
      </button>
    </div>
  {/each}
  <button class="button"
    type="button"
    on:click={() => {
      warmup = [...warmup, { reps: 5, percent: 50 }]
    }}>
    Add another warmup set
  </button>

  <div>
    <button class="button" disabled={saving} type="submit">{saving ? 'Wait' : 'Save'}</button>
    <button class="button" type="button" on:click={reset}>Cancel</button>
  </div>
</form>
