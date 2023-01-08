<script lang="ts">
  import { onMount } from 'svelte'
  import { initializeFirebase, login } from '$lib/firebase'
  import { trpc } from '$lib/trpc/client'

  onMount(async () => initializeFirebase())

  async function createUser() {
    const hello = await trpc.greeting.query()

    console.log(hello)
  }
</script>

<h1>Movie of the Year</h1>

<button on:click={() => login()}>LOGIN</button>

<button on:click={() => createUser()}>CREATE USER</button>
