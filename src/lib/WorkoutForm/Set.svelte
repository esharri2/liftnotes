<script>
  export let activityIndex;
  export let setIndex;
  export let rep;
  export let handleRemoveSet;
  export let set;

  console.log("HERES THE set: ", set);

  import { user } from '$lib/stores';

  let exercises = [];
  let workouts = [];
  let unit = 'lbs';

  user.subscribe((value) => {
    exercises = value.exercises || exercises;
    workouts = value.workouts || workouts;
    unit = value.preferences?.unit || unit;
  });

  const handleAddRep = () => {
    set = [...set, rep];
  };

  const handleRemoveRep = () => {
    set.pop();
    set = [...set];
  };
</script>

<h4>Set {setIndex + 1}</h4>
{#each set as rep, index}
  <label>
    Rep {index + 1}
    Weight: {rep.weight + " " + rep.unit}
    <input type="number" bind:value={set[index].weight} />
  </label>
{/each}
<div>
  <button type="button" on:click={() => handleAddRep(activityIndex, setIndex)}>Add rep</button>
  <button
    disabled={set.length < 2}
    type="button"
    on:click={() => handleRemoveRep(activityIndex, setIndex)}>
    Remove rep
  </button>
  <button type="button" on:click={() => handleRemoveSet(activityIndex, setIndex)}>
    Delete this set
  </button>
</div>
