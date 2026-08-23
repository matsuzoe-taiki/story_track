const addRowButton: HTMLElement | null = document.getElementById('addrowbutton');
const tableBody: HTMLElement | null = document.getElementById('tablebody');

type AnimeRecord = {
    id: string,
    isCompleted: boolean,
    title: string,
    season: number,
    episode: number,
    startDate: Date | null,
    lastWatchDate: Date | null
}

function onLoadAnime(): void {
    const animes = readRecord();

    if (animes === undefined) {
        return;
    };

    tableBody!.replaceChildren();

    for (const anime of animes) {
        const tableRow = createTableRow(anime);
        tableBody!.appendChild(tableRow);
    };
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

    tableBody!.replaceChildren();

    for (const anime of animes) {
        const tableRow: HTMLElement = createTableRow(anime);
        tableBody!.appendChild(tableRow);
    }
};

function onEndCheckChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const id = target.dataset.id!;
    const columnName = target.dataset.column!;
    const judgement = target.checked;

    updateRecord(id, columnName, judgement);
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

window.addEventListener("load", onLoadAnime);

addRowButton!.addEventListener("click", onAddAnime);

function createRecord(recordId: string): void {
    const anime: AnimeRecord =
    {
        id: recordId,
        isCompleted: false,
        title: '',
        season: 0,
        episode: 0,
        startDate: null,
        lastWatchDate: null 
    };

    if (localStorage.length === 0) {
        const newAnimes: AnimeRecord[] = [];

        newAnimes.push(anime);
        localStorage.setItem("animes", JSON.stringify(newAnimes));
        return
    }

    const storageAnimes = localStorage.getItem("animes");

    if (storageAnimes === null) {
        return;
    }

    const animes: AnimeRecord[] = JSON.parse(storageAnimes);

    animes.push(anime);
    localStorage.setItem("animes", JSON.stringify(animes));
}

function updateRecord(
    id: string,
    columnName: string,
    information: string | boolean | number | Date
) {

    const animes = readRecord();
    const updateAnimes: AnimeRecord[] = [];

    if (animes === undefined) {
        return;
    }

    for (const anime of animes) {
        if (id === anime.id) {
            switch (columnName) {
                case "isCompleted":
                    if (typeof information === "boolean") anime.isCompleted = information;
                    break;
                case "title":
                    if (typeof information === "string") anime.title = information;
                    break;
                case "season":
                    if (typeof information === "number") anime.season = information;
                    break;
                case "episode":
                    if (typeof information === "number") anime.episode = information;
                    break;
                case "startDate":
                    if (information instanceof Date) anime.startDate = information;
                    break;
                case "lastWatchDate":
                    if (information instanceof Date) anime.lastWatchDate = information;
                    break;
    
            }
            updateAnimes.push(anime);
        } else {
            updateAnimes.push(anime);
        }
    }

    localStorage.setItem("animes", JSON.stringify(updateAnimes));
}

function readRecord() {
    const storageAnimes = localStorage.getItem("animes");

    if (storageAnimes === null) {
        return;
    }

    const animes: AnimeRecord[] = JSON.parse(storageAnimes);

    return animes
}

function createTableRow(anime: AnimeRecord) {
    const COLUMN_COUNT: number = 6;
    const END_CHECK_COLUMN: number = 0;
    const TITLE_COLUMN: number = 1;
    const SEASON_COLUMN: number = 2;
    const EPISODE_COLUMN: number = 3;
    const START_DATE_COLUMN: number = 4;
    const LAST_WATCH_DATE_COLUMN: number = 5;

    const tableRow: HTMLElement = document.createElement('tr');

    for (let columnIndex = 0; columnIndex < COLUMN_COUNT; columnIndex++) {
        const tableData: HTMLElement = document.createElement('td');
        const columnInput: HTMLElement = document.createElement('input');

        switch (columnIndex) {
            case END_CHECK_COLUMN:
                columnInput.setAttribute('type', 'checkbox');
                columnInput.setAttribute('data-id', anime.id);
                columnInput.setAttribute('data-column', 'isCompleted');
                (columnInput as HTMLInputElement).checked = anime.isCompleted;
                tableData.appendChild(columnInput);
                columnInput.addEventListener("change", onEndCheckChange);
                break;
            case TITLE_COLUMN:
                columnInput.setAttribute('data-id', anime.id);
                columnInput.setAttribute('data-column', 'title');
                (columnInput as HTMLInputElement).value = anime.title;
                tableData.appendChild(columnInput);
                columnInput.addEventListener("input", onTitleChange);
                break;
            case SEASON_COLUMN:
                columnInput.setAttribute('style', 'width: 100px')
                columnInput.setAttribute('type', 'number');
                columnInput.setAttribute('data-id', anime.id);
                columnInput.setAttribute('data-column', 'season');
                (columnInput as HTMLInputElement).valueAsNumber = anime.season;
                tableData.appendChild(columnInput);
                columnInput.addEventListener("input", onSeasonChange);
                break;
            case EPISODE_COLUMN:
                columnInput.setAttribute('style', 'width: 100px')
                columnInput.setAttribute('type', 'number');
                columnInput.setAttribute('data-id', anime.id);
                columnInput.setAttribute('data-column', 'episode');
                (columnInput as HTMLInputElement).valueAsNumber = anime.episode;                
                tableData.appendChild(columnInput);
                columnInput.addEventListener("input", onEpisodeChange);
                break;
            case START_DATE_COLUMN:
                columnInput.setAttribute('type', 'date');
                columnInput.setAttribute('data-id', anime.id);
                columnInput.setAttribute('data-column', 'startDate');
                if (anime.startDate != null) {
                    (columnInput as HTMLInputElement).valueAsDate = new Date(anime.startDate);
                };
                tableData.appendChild(columnInput);
                columnInput.addEventListener("input", onStartDateChange);
                break;
            case LAST_WATCH_DATE_COLUMN:
                columnInput.setAttribute('type', 'date');
                columnInput.setAttribute('data-id', anime.id);
                columnInput.setAttribute('data-column', 'lastWatchDate');
                if (anime.lastWatchDate != null) {
                    (columnInput as HTMLInputElement).valueAsDate = new Date(anime.lastWatchDate);
                };
                tableData.appendChild(columnInput);
                columnInput.addEventListener("input", onLastWatchDateChange);
                break;
        };
        tableRow.appendChild(tableData);
    };
    return tableRow;
};
