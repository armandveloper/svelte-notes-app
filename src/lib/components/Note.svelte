<script>
  import { createEventDispatcher } from 'svelte';

  export let id;
  export let title;
  export let body;

  const dispatch = createEventDispatcher();

  function removeNote() {
    dispatch('remove', {
      id,
    });
  }
</script>

<article
  class="bg-yellow-200 p-2 rounded-md h-[15rem] transition-colors md:h-[20rem] flex flex-col"
>
  <header class="flex items-center justify-end">
    <button data-testid="remove-note" on:click={removeNote}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  </header>
  <input
    class="bg-transparent font-bold mb-3 outline-none"
    type="text"
    bind:value={title}
  />
  <textarea
    class="bg-transparent text-black placeholder:text-black flex-1 outline-none resize-none "
    placeholder="Type the body"
    bind:value={body}
  />
</article>

<style>
  textarea::-webkit-scrollbar {
    width: 4px;
  }
  textarea::-webkit-scrollbar-track {
    border-radius: 4px;
  }
  textarea::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
