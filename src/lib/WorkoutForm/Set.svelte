<script>
  export let activityId;
  export let activityIndex;
  export let handleRemoveSet;
  export let predictReps;
  export let rep;
  export let set;
  export let setIndex;

  const handleAddRep = () => {
    set = [...set, rep];
  };

  const handleRemoveRep = () => {
    set.pop();
    set = [...set];
  };

  const handleInput = (repIndex, rep) => {
    const { weight, unit } = rep;
    predictReps({ weight, unit }, activityId, setIndex, repIndex);
  };
</script>

<h4>Set {setIndex + 1}</h4>
{#each set as rep, index}
  <label>
    <input type="number" step=".001" bind:value={rep.weight} on:change={(event) => handleInput(index, rep)} />
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
