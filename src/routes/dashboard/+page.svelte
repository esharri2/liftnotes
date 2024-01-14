<script>
  import { db } from '$lib/firebase/firebase.client';
  import { doc, setDoc } from "firebase/firestore"; 

  const saveData = async () => {
    // Add a new document in collection "cities"
    await setDoc(doc(db, 'cities', 'LA'), {
      name: 'Los Angelessssss',
      state: 'CA',
      country: 'USA'
    });
  };
</script>

<button on:click={saveData}>Save</button>
