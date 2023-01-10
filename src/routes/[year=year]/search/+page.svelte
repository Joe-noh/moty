<script lang="ts">
  import type { ActionData, PageData } from './$types'

  export let data: PageData
  export let form: ActionData

  $: movies = form?.movies || []
</script>

<h1>Search</h1>

<form method="post" action={`/${data.year}/search`}>
  <input type="text" name="query" />
  <button type="submit">SEARCH</button>
</form>

{#each movies as movie}
  <li>{movie.title}</li>
{/each}
