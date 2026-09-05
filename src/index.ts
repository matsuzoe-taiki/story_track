import type { AnimeRecord } from "./types";
import { createRecord, readRecord } from "./storage";
import { updateRecord, deleteRecord } from "./storage";

const addRecordButton: HTMLElement | null = document.getElementById('addrecordbutton');
const tableBody: HTMLElement | null = document.getElementById('tablebody');
const recordCount: HTMLElement | null = document.getElementById('record-count');

// type AnimeRecord = {
//     id: string,
//     isCompleted: boolean,
//     title: string,
//     season: number,
//     episode: number,
//     startDate: Date | null,
//     lastWatchDate: Date | null
// }

function onLoadAnime(): void {
    const animes = readRecord();

    if (animes === undefined) {
        showEmptyState();
        return;
    };

    showAnimes(animes);
};

function onAddAnime(): void {
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

function onIsCompletedChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const id = target.dataset.id!;
    const columnName = target.dataset.column!;
    const judgement = target.checked;

    updateRecord(id, columnName, judgement);
    target.closest('tr')?.classList.toggle('is-completed', judgement);
}

function onTitleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const id = target.dataset.id!;
    const columnName = target.dataset.column!;
    const title = target.value;
    
    updateRecord(id, columnName, title);
}

function onSeasonChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const id = target.dataset.id!;
    const columnName = target.dataset.column!;
    const season = target.valueAsNumber;

    updateRecord(id, columnName, season);
}

function onEpisodeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const id = target.dataset.id!;
    const columnName = target.dataset.column!;
    const episode = target.valueAsNumber;

    updateRecord(id, columnName, episode);
}

function onStartDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const id = target.dataset.id!;
    const columnName = target.dataset.column!;
    const startDate = target.valueAsDate!;

    updateRecord(id, columnName, startDate);
}

function onLastWatchDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const id = target.dataset.id!;
    const columnName = target.dataset.column!;
    const lastWatchDate = target.valueAsDate!;

    updateRecord(id, columnName, lastWatchDate);
}

function onDeleteClick(event: Event) {
    const isConfirmed = confirm('【警告】\n削除してよろしいですか？\n');

    if (isConfirmed) {
        const target = event.currentTarget as HTMLButtonElement;
        const id = target.dataset.id!;
    
        deleteRecord(id);
    } else {
        return;
    }
}

document.addEventListener('DOMContentLoaded', onLoadAnime);

addRecordButton!.addEventListener("click", onAddAnime);

// function createRecord(recordId: string): void {
//     const anime: AnimeRecord =
//     {
//         id: recordId,
//         isCompleted: false,
//         title: '',
//         season: 0,
//         episode: 0,
//         startDate: null,
//         lastWatchDate: null 
//     };

//     if (localStorage.length === 0) {
//         const updatedAnimes: AnimeRecord[] = [];

//         updatedAnimes.push(anime);
//         localStorage.setItem("animes", JSON.stringify(updatedAnimes));
//         return
//     }

//     const storageAnimes = localStorage.getItem("animes");

//     if (storageAnimes === null) {
//         return;
//     }

//     const animes: AnimeRecord[] = JSON.parse(storageAnimes);

//     animes.push(anime);
//     localStorage.setItem("animes", JSON.stringify(animes));
// }

// function readRecord() {
//     const storageAnimes = localStorage.getItem("animes");

//     if (storageAnimes === null) {
//         return;
//     }

//     const animes: AnimeRecord[] = JSON.parse(storageAnimes);

//     return animes
// }

// function updateRecord(
//     id: string,
//     columnName: string,
//     information: string | boolean | number | Date
// ) {

//     const animes = readRecord();
//     const updatedAnimes: AnimeRecord[] = [];

//     if (animes === undefined) {
//         return;
//     }

//     for (const anime of animes) {
//         if (id === anime.id) {
//             switch (columnName) {
//                 case "isCompleted":
//                     if (typeof information === "boolean") anime.isCompleted = information;
//                     break;
//                 case "title":
//                     if (typeof information === "string") anime.title = information;
//                     break;
//                 case "season":
//                     if (typeof information === "number") anime.season = information;
//                     break;
//                 case "episode":
//                     if (typeof information === "number") anime.episode = information;
//                     break;
//                 case "startDate":
//                     if (information instanceof Date) anime.startDate = information;
//                     break;
//                 case "lastWatchDate":
//                     if (information instanceof Date) anime.lastWatchDate = information;
//                     break;
    
//             }
//             updatedAnimes.push(anime);
//         } else {
//             updatedAnimes.push(anime);
//         }
//     }

//     localStorage.setItem("animes", JSON.stringify(updatedAnimes));
// }

// function deleteRecord(id: string) {
//     const animes = readRecord();

//     if (animes === undefined) {
//         throw new Error('animesが空です');
//     }

//     for (let index = 0; index < animes.length; index++) {
//         if (id === animes[index]?.id) {
//             animes.splice(index, 1);
//             break;
//         }
//     }

//     localStorage.setItem("animes", JSON.stringify(animes));

//     onLoadAnime();
// }

function createTableRow(anime: AnimeRecord) {
    const COLUMN_COUNT: number = 7;
    const END_CHECK_COLUMN: number = 0;
    const TITLE_COLUMN: number = 1;
    const SEASON_COLUMN: number = 2;
    const EPISODE_COLUMN: number = 3;
    const START_DATE_COLUMN: number = 4;
    const LAST_WATCH_DATE_COLUMN: number = 5;
    const DELETE_COLUMN: number = 6;

    const tableRow: HTMLElement = document.createElement('tr');
    tableRow.classList.toggle('is-completed', anime.isCompleted);

    for (let columnIndex = 0; columnIndex < COLUMN_COUNT; columnIndex++) {
        const tableData: HTMLElement = document.createElement('td');
        const columnInput: HTMLElement = document.createElement('input');

        switch (columnIndex) {
            case END_CHECK_COLUMN:
                columnInput.setAttribute('type', 'checkbox');
                columnInput.className = 'complete-check';
                columnInput.setAttribute('aria-label', '完結済みにする');
                columnInput.setAttribute('data-id', anime.id);
                columnInput.setAttribute('data-column', 'isCompleted');
                (columnInput as HTMLInputElement).checked = anime.isCompleted;
                tableData.appendChild(columnInput);
                columnInput.addEventListener("change", onIsCompletedChange);
                break;
            case TITLE_COLUMN:
                columnInput.className = 'cell-input';
                columnInput.setAttribute('placeholder', '作品タイトルを入力');
                columnInput.setAttribute('aria-label', 'タイトル');
                columnInput.setAttribute('data-id', anime.id);
                columnInput.setAttribute('data-column', 'title');
                (columnInput as HTMLInputElement).value = anime.title;
                tableData.appendChild(columnInput);
                columnInput.addEventListener("input", onTitleChange);
                break;
            case SEASON_COLUMN:
                columnInput.className = 'cell-input';
                columnInput.setAttribute('type', 'number');
                columnInput.setAttribute('min', '0');
                columnInput.setAttribute('aria-label', 'シーズン');
                columnInput.setAttribute('data-id', anime.id);
                columnInput.setAttribute('data-column', 'season');
                (columnInput as HTMLInputElement).valueAsNumber = anime.season;
                tableData.appendChild(columnInput);
                columnInput.addEventListener("input", onSeasonChange);
                break;
            case EPISODE_COLUMN:
                columnInput.className = 'cell-input';
                columnInput.setAttribute('type', 'number');
                columnInput.setAttribute('min', '0');
                columnInput.setAttribute('aria-label', '話数');
                columnInput.setAttribute('data-id', anime.id);
                columnInput.setAttribute('data-column', 'episode');
                (columnInput as HTMLInputElement).valueAsNumber = anime.episode;                
                tableData.appendChild(columnInput);
                columnInput.addEventListener("input", onEpisodeChange);
                break;
            case START_DATE_COLUMN:
                columnInput.className = 'cell-input';
                columnInput.setAttribute('type', 'date');
                columnInput.setAttribute('aria-label', '見始めた日');
                columnInput.setAttribute('data-id', anime.id);
                columnInput.setAttribute('data-column', 'startDate');
                if (anime.startDate != null) {
                    (columnInput as HTMLInputElement).valueAsDate = new Date(anime.startDate);
                };
                tableData.appendChild(columnInput);
                columnInput.addEventListener("input", onStartDateChange);
                break;
            case LAST_WATCH_DATE_COLUMN:
                columnInput.className = 'cell-input';
                columnInput.setAttribute('type', 'date');
                columnInput.setAttribute('aria-label', '最近見た日');
                columnInput.setAttribute('data-id', anime.id);
                columnInput.setAttribute('data-column', 'lastWatchDate');
                if (anime.lastWatchDate != null) {
                    (columnInput as HTMLInputElement).valueAsDate = new Date(anime.lastWatchDate);
                };
                tableData.appendChild(columnInput);
                columnInput.addEventListener("input", onLastWatchDateChange);
                break;
            case DELETE_COLUMN:
                const deleteButton: HTMLButtonElement = document.createElement('button');

                deleteButton.type = "button";
                deleteButton.className = "delete-button";
                deleteButton.dataset.id = anime.id;
                deleteButton.setAttribute('aria-label', 'この作品を削除');

                const deleteIcon: HTMLElement = document.createElement('i');
                deleteIcon.className = 'bi bi-trash';

                deleteButton.appendChild(deleteIcon);

                tableData.appendChild(deleteButton);
                deleteButton.addEventListener("click", onDeleteClick);
                break;
        };
        tableRow.appendChild(tableData);
    };
    return tableRow;
};

function showEmptyState(): void {
    const emptyRow = document.createElement('tr');
    emptyRow.className = 'empty-state';
    emptyRow.innerHTML = `
        <td colspan="7">
            <div class="empty-icon"><i class="bi bi-book" aria-hidden="true"></i></div>
            <strong>まだ作品が登録されていません</strong>
            <span>「新しい作品を追加」から記録を始めましょう</span>
        </td>
    `;
    tableBody!.replaceChildren(emptyRow);
    recordCount!.textContent = '0 TITLES';
}

function showAnimes(animes: AnimeRecord[]): void {
    if (animes.length === 0) {
        showEmptyState();
        return;
    }

    tableBody!.replaceChildren();

    for (const anime of animes) {
        const tableRow = createTableRow(anime);
        tableBody!.appendChild(tableRow);
    };

    recordCount!.textContent = `${animes.length} ${animes.length === 1 ? 'TITLE' : 'TITLES'}`;
}
