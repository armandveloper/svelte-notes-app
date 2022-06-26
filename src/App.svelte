<script>
  import NewNoteButton from './lib/components/NewNoteButton.svelte';
  import Note from './lib/components/Note.svelte';
  import { notes } from './lib/stores/notes';

  let searchTerm = '';

  $: filteredNotes = searchTerm.trim()
    ? $notes.filter(note =>
        note.title.toUpperCase().includes(searchTerm.toUpperCase())
      )
    : $notes;
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
  <NewNoteButton on:click={() => notes.add({ title: 'Untitled', body: '' })} />
  {#each filteredNotes as { id, title, body } (id)}
    <Note
      bind:id
      bind:title
      bind:body
      on:remove={event => notes.remove(event.detail.id)}
    />
  {/each}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
