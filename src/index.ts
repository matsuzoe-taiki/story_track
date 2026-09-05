import { readRecord } from "./storage.js";
import { onAddAnime } from "./handlers.js";
import { showAnimes, showEmptyState } from "./display.js";

const addRecordButton: HTMLElement | null = document.getElementById('addrecordbutton');

export function loadInitialOperation(): void {
    console.log('こんにちは')
    const animes = readRecord();

    if (animes === undefined) {
        showEmptyState();
        return;
    };

    showAnimes(animes);
};

document.addEventListener('DOMContentLoaded', loadInitialOperation);
addRecordButton!.addEventListener("click", onAddAnime);
