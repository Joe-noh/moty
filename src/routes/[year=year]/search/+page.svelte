<script lang="ts">
  import { onMount } from 'svelte'
  import { Movie } from '$lib/entities/movie'
  import { trpc } from '$lib/trpc/client'
  import MovieThumbnail from '$lib/components/movie-thumbnail.svelte'

  let query = ''
  let page = 1
  let maxPage: number
  let movies: Movie[] = []
  let loader: HTMLDivElement

  onMount(() => {
    const options = { rootMargin: '900px' }
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (page === maxPage) {
          observer.unobserve(entry.target)
        } else {
          if (movies.length > 0) {
            fetchMoreMovies()
          }
        }
      })
    }, options)

    observer.observe(loader)
  })

  async function searchMovies(e: Event) {
    e.preventDefault()

    const res = await trpc.searchMovies.query({ query, page: 1 })

    page = 1
    movies = res.movies.map((m) => new Movie(m))
    maxPage = res.maxPage
  }

  async function fetchMoreMovies() {
    const res = await trpc.searchMovies.query({ query, page: ++page })

    movies = [...movies, ...res.movies.map((m) => new Movie(m))]
    maxPage = res.maxPage
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
  </ul>
{/if}

<div bind:this={loader} />

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
</style>
