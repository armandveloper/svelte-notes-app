<script>
  import { nanoid } from 'nanoid';
  import NewNoteButton from './lib/components/NewNoteButton.svelte';

  let notes = [];

  let searchTerm = '';

  $: filteredNotes = searchTerm.trim()
    ? notes.filter(note =>
        note.title.toUpperCase().includes(searchTerm.toUpperCase())
      )
    : notes;

  function handleDeleteNote(id) {
    return () => {
      const newNotes = notes.filter(note => note.id !== id);
      notes = newNotes;
    };
  }

  function handleAddNote() {
    const newNote = {
      id: nanoid(),
      title: 'Untitled',
      body: '',
    };
    notes = [newNote, ...notes];
  }
</script>

<header
  class="px-5 py-4 flex items-center justify-between mx-auto max-w-screen-md mb-8"
>
  <span class="font-medium text-2xl cursor-default">Notes</span>
  <input
    class="pl-2 pr-3 py-1 border border-gray-300 rounded-sm transition-colors focus:outline-none focus:border-blue-400"
    type="text"
    placeholder="Search"
    aria-label="Search a note by title"
    bind:value={searchTerm}
  />
</header>

<main
  class="grid gap-x-5 gap-y-8 max-w-screen-xl mx-auto px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
>
  <NewNoteButton on:click={handleAddNote} />
  {#each filteredNotes as { title, body, id } (id)}
    <article
      class="bg-yellow-200 p-2 rounded-md h-[15rem] transition-colors md:h-[20rem] flex flex-col"
    >
      <header class="flex items-center justify-end">
        <button data-testid="remove-note" on:click={handleDeleteNote(id)}>
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
  {/each}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
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
