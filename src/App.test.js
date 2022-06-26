import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import App from './App.svelte';

const user = userEvent.setup();

describe('App.svelte', () => {
  afterEach(() => cleanup());

  it('should display a button to add a new note ', () => {
    const { getByRole } = render(App);
    const $newNoteButton = getByRole('button');
    expect($newNoteButton).toBeDefined();
  });

  it('should be able to remove a note', async () => {
    const { getByRole, getByTestId, queryByRole } = render(App);
    const $newNoteButton = getByRole('button');
    await user.click($newNoteButton);
    const $removeNoteButton = getByTestId('remove-note');
    await user.click($removeNoteButton);
    const $newNote = queryByRole('article');
    expect($newNote).toBeNull();
  });

  it('should be able to add an empty new note when click on the new note button', async () => {
    const { getByRole } = render(App);
    const $newNoteButton = getByRole('button');
    await user.click($newNoteButton);
    const $newNote = getByRole('article');
    expect($newNote).toBeDefined();
  });
});
