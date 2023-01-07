<script lang="ts">
  import { onMount } from 'svelte'
  import { initializeFirebase, login } from '$lib/firebase'

  onMount(async () => initializeFirebase())
</script>

<h1>Movie of the Year</h1>

<button on:click={() => login()}>LOGIN</button>
