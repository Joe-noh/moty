<script lang="ts">
  import type { Movie } from '$lib/entities/movie'

  export let movie: Movie
</script>

<div class="thumbnail">
  {#if movie.thumbnailUrl}
    <img class="image" src={movie.thumbnailUrl} alt={movie.title} />
  {:else}
    <!-- img class="image" src={fallback} alt="The thumbnail image is not found" / -->
  {/if}
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
    transition: all 0.1s linear 0s;
    transform: 0 0;
  }

  .image:hover {
    transform: translateX(-0.8rem) translateY(-0.6rem);
    box-shadow: rgba(64, 64, 64, 0.5) 0.5rem 0.5rem 0.5rem, var(--primary-color) 0.8rem 0.6rem 0;
  }

  .title {
    max-width: 100%;
    margin-top: 0.7rem;
    text-overflow: clip;
    color: var(--text-color);
  }
</style>
