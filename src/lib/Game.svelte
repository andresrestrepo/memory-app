<script>
  import "./game.css";
  import { toast } from "@zerodevx/svelte-toast";

  const clip1_sound = new Audio("/1.mp3");
  const clip2_sound = new Audio("/2.mp3");
  const clip3_sound = new Audio("/3.mp3");
  const clip4_sound = new Audio("/4.mp3");
  const loser_sound = new Audio("/loser.mp3");

  let cpuMoves = $state([]);
  let plaverMoves = $state([]);
  let isCpuTurn = $state(false);
  let isPlaying = $state(false);

  let items = $state([
    {
      classes: "bg-red-700 rounded-tl-full",
      opacity: false,
    },
    {
      classes: "bg-blue-700 rounded-tr-full",
      opacity: false,
    },
    {
      classes: "bg-yellow-600 rounded-bl-full",
      opacity: false,
    },
    {
      classes: "bg-green-700 rounded-br-full",
      opacity: false,
    },
  ]);

  function startGame() {
    console.log("Game started");
    isPlaying = true;
    const nextMove = Math.floor(Math.random() * (3 - 0 + 0) + 0);
    cpuMoves.push(nextMove);
    cpuTurn();
  }

  function resetGame() {
    toast.push(`Good game :) Round ${cpuMoves.length}`);
    plaverMoves = [];
    cpuMoves = [];
    isPlaying = false;
    loser_sound.play();
  }

  function resetItems() {
    items = items.map((item) => {
      item.opacity = false;
      return item;
    });
  }

  function reproduceSound(index) {
    try {
      if (index === 0) {
        clip1_sound.play();
      } else if (index === 1) {
        clip2_sound.play();
      } else if (index === 2) {
        clip3_sound.play();
      } else {
        clip4_sound.play();
      }
    } catch (err) {
      console.error("Sound playback error:", err);
    }
  }

  function cpuTurn() {
    isCpuTurn = true;
    let index = 0;
    const intvalCpu = setInterval(async () => {
      resetItems();

      reproduceSound(cpuMoves[index]);

      items[cpuMoves[index]].opacity = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      items[cpuMoves[index]].opacity = false;

      index++;
      if (index === cpuMoves.length) {
        resetItems();
        clearInterval(intvalCpu);
        isCpuTurn = false;
      }
    }, 2000);
  }

  function playerTurn(index) {
    if (isCpuTurn) {
      return;
    }

    if (!isPlaying) {
      toast.push(`Click on Play to start the game`);
      return;
    }

    const len = plaverMoves.length - 1 < 0 ? 0 : plaverMoves.length;
    if (index !== cpuMoves[len]) {
      resetGame();
      return;
    } else {
      reproduceSound(index);
      plaverMoves.push(index);
    }

    if (plaverMoves.length === cpuMoves.length) {
      plaverMoves = [];
      const nextMove = Math.floor(Math.random() * (3 - 0 + 0) + 0);
      cpuMoves.push(nextMove);
      cpuTurn();
    }
  }
</script>

<div class="my-container">
  <div class="relative flex items-center justify-center gap-4 group pt-5 mb-10">
    <div
      class="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-yellow-500 via-blue-500 to-red-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"
    ></div>
    <div
      id="title-game"
      role="button"
      class="group relative inline-flex items-center justify-center rounded-xl bg-white px-5 py-2 font-semibold text-black transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
      title="memory game"
    >
      Memory Game - Round: {cpuMoves.length}
    </div>
  </div>

  <div
    class="container-board grid grid-cols-2 gap-2 items-center justify-center w-56 h-56 lg:size-150 m-auto"
  >
    {#each items as item, i}
      <button
        aria-label="test"
        onclick={() => playerTurn(i)}
        class={`item ${item.classes} ${item.opacity ? "pushed-item" : ""} h-full w-full hover:shadow-2xl hover:opacity-70 cursor-pointer ring-2`}
      ></button>
    {/each}
  </div>

  <div class="fixed bottom-3 w-full flex justify-center text-center">
    {#if isCpuTurn}
      <div class="w-full animate-bounce font-bold text-white">
        Look carefully
      </div>
    {:else if isPlaying}
      <div class="w-full animate-bounce font-bold text-white">Your Turn!</div>
    {:else}
      <button
        class="group cursor-pointer text-black relative inline-flex h-12 items-center justify-center overflow-hidden bg-white rounded-md border border-neutral-200 px-6 font-medium transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(82_82_82)]"
        onclick={startGame}
      >
        Play
      </button>
    {/if}
  </div>
</div>
