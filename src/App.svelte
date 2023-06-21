<script lang="ts">
  import Keys from "./components/Keys.svelte";
  import Next from "./components/Next.svelte";

  const figures = "SZLJITO".split("");
  let figure = "";

  setInterval(() => {
    figure = figures[Math.floor(Math.random() * figures.length)];
  }, 500);
</script>

<main>
  <Next {figure} />
  <Keys />
</main>

<style>
  /* nothing yet here */
</style>
