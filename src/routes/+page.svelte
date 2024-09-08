<script>
  import { onMount } from 'svelte';
  import { getAuth } from 'firebase/auth';
  export let data;
  const { count = 0 } = data;

  onMount(async () => {
    const token = await getAuth().currentUser?.getIdToken(true);
    console.log('jwt token', token);

  });
</script>

<h1>Number of records: {count}</h1>
