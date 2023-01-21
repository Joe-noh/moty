<script lang="ts">
  import { Movie } from '$lib/entities/movie'
  import MovieThumbnail from '$lib/components/movie-thumbnail.svelte'
  import AddMovieButton from '$lib/components/add-movie-button.svelte'
  import type { PageData } from './$types'

  export let data: PageData

  const movies = data.movies.map((m) => new Movie(m))
</script>

<h1 class="heading">Movie of the Year {data.year}</h1>

<ol class="movies">
  {#each movies as movie}
    <li class="movie"><MovieThumbnail {movie} /></li>
  {/each}
  {#if movies.length < 5}
    <li class="movie">
      <AddMovieButton href={`/${data.year}/search`} />
    </li>
  {/if}
</ol>

<style>
  .heading {
    width: 100%;
    display: block;
    text-align: center;
    color: var(--text-color);
    margin: 2rem 0;
  }

  .movies {
    list-style: none;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .movie {
    margin: 0 1rem 2rem;
    cursor: pointer;
  }
</style>
