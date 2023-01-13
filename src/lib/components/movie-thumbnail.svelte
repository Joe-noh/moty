<script lang="ts">
  import type { Movie } from '$lib/entities/movie'

  export let movie: Movie
</script>

<div class="thumbnail">
  <img class="image" src={movie.thumbnailUrl} alt={movie.title} />
  <span class="title">{movie.title}</span>
</div>

<style>
  .thumbnail {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
    max-width: 100%;
    width: 300px;
  }

  .image {
    width: 100%;
  }

  .title {
    max-width: 100%;
    margin-top: 0.5rem;
    text-overflow: clip;
  }
</style>
