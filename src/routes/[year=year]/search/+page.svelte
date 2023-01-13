<script lang="ts">
  import { Movie } from '$lib/entities/movie'
  import { trpc } from '$lib/trpc/client'
  import MovieThumbnail from '$lib/components/movie-thumbnail.svelte'

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
  <ul class="movies">
    {#each movies as movie}
      <li class="movie">
        <MovieThumbnail {movie} />
      </li>
    {/each}
    {#if movies.length % 3 == 1}
      <li class="movie padder"></li>
      <li class="movie padder"></li>
    {/if}
    {#if movies.length % 3 == 2}
      <li class="movie padder"></li>
    {/if}
  </ul>
  <button on:click={fetchMoreMovies}>LOAD MORE</button>
{/if}

<style>
  .movies {
    list-style: none;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  .movie {
    margin: 0 1rem 2rem;
  }

  .padder {
    width: 300px;
  }
</style>
