<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { Movie } from '$lib/entities/movie'
  import { trpc } from '$lib/trpc/client'
  import MovieThumbnail from '$lib/components/movie-thumbnail.svelte'
  import PoweredBy from '$lib/components/powered-by.svelte'
  import type { PageData } from './$types'

  export let data: PageData

  let query = ''
  let page = 1
  let maxPage: number
  let movies: Movie[] = []
  let input: HTMLInputElement
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

    setTimeout(() => input?.focus(), 200)
  })

  async function searchMovies(e: Event) {
    e.preventDefault()

    const res = await trpc.searchMovies.query({ query, page: 1 })

    page = 1
    movies = res.movies.map((m) => new Movie(m))
    maxPage = res.maxPage

    scrollTo({ top: 0 })
  }

  async function fetchMoreMovies() {
    const res = await trpc.searchMovies.query({ query, page: ++page })

    movies = [...movies, ...res.movies.map((m) => new Movie(m))]
    maxPage = res.maxPage
  }

  async function addRanking(movie: Movie) {
    await trpc.appendToRanking.query({ movieId: movie.id.toString(), year: parseInt(data.year) })
    await goto(`/${data.year}/movies`)
  }
</script>

<form class="form" on:submit={searchMovies}>
  <input type="text" name="query" class="input" placeholder="Movie Title" bind:value={query} bind:this={input} />
  <button type="submit" class="button">SEARCH</button>
</form>

<div class="powered-by">
  <PoweredBy />
</div>

{#if movies.length > 0}
  <ul class="movies">
    {#each movies as movie}
      <li class="movie">
        <MovieThumbnail {movie} on:click={() => addRanking(movie)} />
      </li>
    {/each}
  </ul>
{/if}

<div bind:this={loader} />

<style>
  .form {
    width: 100%;
    margin: 2rem 0 1rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 1.5rem;
    z-index: 10000;
  }

  .input {
    background-color: var(--text-color);
    color: var(--background-color);
    padding: 1rem;
    margin-right: 0.5rem;
    box-shadow: rgba(64, 64, 64, 0.5) 0.5rem 0.5rem 0.5rem;
  }

  .input::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }

  .button {
    padding: 1rem;
    background-color: var(--primary-color);
    color: var(--background-color);
    box-shadow: rgba(64, 64, 64, 0.5) 0.5rem 0.5rem 0.5rem;
  }

  .powered-by {
    margin-bottom: 1rem;
  }

  .movies {
    list-style: none;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  .movie {
    margin: 0 1rem 2rem;
    cursor: pointer;
  }
</style>
