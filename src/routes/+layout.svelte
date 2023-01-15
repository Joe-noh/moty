<script lang="ts">
  import 'ress'
</script>

<slot />

<style>
  :global(html, body) {
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    font-style: italic;
    font-weight: 900;
    background-color: var(--background-color);
  }

  :root {
    --primary-color: #d4af37;
    --background-color: #2a3441;
    --text-color: #f9faf5;
  }
</style>
