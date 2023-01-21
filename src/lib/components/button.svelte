<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button'
  export let fluid = false
</script>

<button class="button" class:fluid="{fluid}" {type} on:click>
  <slot />
</button>

<style>
  .button {
    background-color: var(--primary-color);
    color: var(--background-color);
    padding: 1rem 2rem;
    min-width: 240px;
  }

  .fluid {
    width: 100%;
  }
</style>
