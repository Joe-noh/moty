<script lang="ts">
  import { Movie } from '$lib/entities/movie'
  import { trpc } from '$lib/trpc/client'

  let query = ''
  let page = 1
  let maxPage: number
  let movies: Movie[] = []

  async function search(query: string, page: number) {
    return await trpc.searchMovies.query({ query, page })
  }

  async function searchMovies(e: Event) {
    e.preventDefault()

    const res = await search(query, page)

    movies = res.movies.map((m) => new Movie(m))
    maxPage = res.maxPage
  }

  async function fetchMoreMovies(e: Event) {
    e.preventDefault()

    const res = await search(query, ++page)

    movies = [...movies, ...res.movies.map((m) => new Movie(m))]
  }
</script>

<h1>Search</h1>

<form on:submit={searchMovies}>
  <input type="text" name="query" bind:value={query} />
  <button type="submit">SEARCH</button>
</form>

{#if movies.length > 0}
  {#each movies as movie}
    <li>
      <img src={movie.thumbnailUrl} alt={movie.title} />
      {movie.title} - {movie.releaseDate?.getFullYear()}
    </li>
  {/each}
  <button on:click={fetchMoreMovies}>LOAD MORE</button>
{/if}
