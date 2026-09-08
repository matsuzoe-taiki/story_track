import { showAnimes } from "./display.js";
import {
  createRecord,
  readRecord,
  updateRecord,
  deleteRecord
} from "./storage.js";

export function onAddAnime(): void {
  const rowId: string = crypto.randomUUID();
  const tableRow: HTMLElement = document.createElement('tr');

  tableRow.setAttribute('data-id', rowId);

  createRecord(rowId);

  const animes = readRecord();

  if (animes === undefined) {
      return;
  }

  showAnimes(animes);
};

export function onIsCompletedChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const id = target.dataset.id!;
  const columnName = target.dataset.column!;
  const judgement = target.checked;

  updateRecord(id, columnName, judgement);
  target.closest('tr')?.classList.toggle('is-completed', judgement);
}

export function onTitleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const id = target.dataset.id!;
  const columnName = target.dataset.column!;
  const title = target.value;
  
  updateRecord(id, columnName, title);
}

export function onSeasonChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const id = target.dataset.id!;
  const columnName = target.dataset.column!;
  const season = target.valueAsNumber;

  updateRecord(id, columnName, season);
}

export function onEpisodeChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const id = target.dataset.id!;
  const columnName = target.dataset.column!;
  const episode = target.valueAsNumber;

  updateRecord(id, columnName, episode);
}

export function onStartDateChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const id = target.dataset.id!;
  const columnName = target.dataset.column!;
  const startDate = target.valueAsDate!;

  updateRecord(id, columnName, startDate);
}

export function onLastWatchDateChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const id = target.dataset.id!;
  const columnName = target.dataset.column!;
  const lastWatchDate = target.valueAsDate!;

  updateRecord(id, columnName, lastWatchDate);
}

export function onDeleteClick(event: Event) {
  const isConfirmed = confirm('【警告】\n削除してよろしいですか？\n');

  if (isConfirmed) {
      const target = event.currentTarget as HTMLButtonElement;
      const id = target.dataset.id!;
  
      deleteRecord(id);
  } else {
      return;
  }
}
