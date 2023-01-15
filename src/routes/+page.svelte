<script lang="ts">
  import { onMount } from 'svelte'
  import { initializeFirebase, login } from '$lib/firebase'
  import Button from '$lib/components/button.svelte'

  let signinForm: HTMLFormElement
  let idTokenInput: HTMLInputElement

  onMount(async () => initializeFirebase())

  async function signin(e: Event) {
    e.preventDefault()

    const user = await login()

    if (user) {
      idTokenInput.value = await user.getIdToken()
      signinForm.submit()
    }
  }
</script>

<h1>Movie of the Year</h1>

<form action="/users" method="post" bind:this={signinForm}>
  <input type="hidden" name="idToken" bind:this={idTokenInput} />
  <Button type="submit" on:click={(e) => signin(e)}>CREATE USER</Button>
</form>
