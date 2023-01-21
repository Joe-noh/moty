<script lang="ts">
  export let href = '#'
</script>

<a class="button" {href}>
  <span class="plus">+</span>
</a>

<style>
  .button {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    width: 300px;
    aspect-ratio: 0.666;
    border: 2px solid var(--text-color);
    background-color: transparent;
    text-decoration: none;
  }

  .plus {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
    font-size: 3rem;
    color: var(--text-color);
  }
</style>
