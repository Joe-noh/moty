<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<h1>Search</h1>

<ol>
  {#each data.movies as movie}
    <li>{movie}</li>
  {/each}
</ol>
