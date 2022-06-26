import { writable } from 'svelte/store';
import { nanoid } from 'nanoid';

function createNotes() {
  const { subscribe, update } = writable([]);

  const add = ({ title, body }) =>
    update(notes => [{ id: nanoid(), title, body }, ...notes]);

  const remove = id => {
    update(notes => {
      const newNotes = notes.filter(note => note.id !== id);
      return newNotes;
    });
  };

  return {
    subscribe,
    add,
    remove,
  };
}
export const notes = createNotes();
