<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button'
</script>

<button class="button" {type} on:click>
  <slot />
</button>

<style>
  .button {
    background-color: var(--primary-color);
    color: var(--background-color);
    padding: 1rem 2rem;
    min-width: 240px;
  }
</style>
