<script lang="ts">
  import { onMount } from 'svelte'
  import { initializeFirebase, login } from '$lib/firebase'
  import Hero from '$lib/components/hero.svelte'
  import Button from '$lib/components/button.svelte'
  import type { PageData } from './$types'

  export let data: PageData

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

<div class="container">
  <Hero />

  <p class="lead">Can you tell me the best movies of {data.year}?</p>

  <form class="form" action="/users" method="post" bind:this={signinForm}>
    <input type="hidden" name="idToken" bind:this={idTokenInput} />
    <Button type="submit" on:click={(e) => signin(e)}>Sure!</Button>
  </form>
</div>

<style>
  .container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 100%;
    overflow-x: hidden;
    padding-top: 1rem;
  }

  .lead {
    color: var(--text-color);
    margin-top: 5rem;
  }

  .form {
    margin: 2rem;
  }

  @media (min-width: 768px) {
    .container {
      padding-top: 3rem;
    }
  }
</style>
