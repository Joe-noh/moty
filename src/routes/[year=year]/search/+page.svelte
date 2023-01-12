<script lang="ts">
  import type { Movie } from '$lib/types'

  let query = ''
  let movies: Movie[] = []

  async function searchMovies(e: Event) {
    e.preventDefault()

    const res = await fetch('/api/movies', {
      method: 'POST',
      body: JSON.stringify({ query, page: 1 }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { results } = await res.json()

    movies = results
  }
</script>

<h1>Search</h1>

<form on:submit={searchMovies}>
  <input type="text" name="query" bind:value={query} />
  <button type="submit">SEARCH</button>
</form>

{#if movies.length > 0}
  {#each movies as movie}
    <li>{movie.title}</li>
  {/each}
{/if}
