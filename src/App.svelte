<script>
  import Game from "./lib/Game.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
</script>

<main>
  <Game />
  <SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
</main>

<style>
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 8rem;
    --toastContainerLeft: calc(50vw - 8rem);
  }
</style>
