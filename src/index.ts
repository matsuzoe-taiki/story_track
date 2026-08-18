const addRowButton: HTMLElement | null = document.getElementById('addrowbutton');
const tableBody: HTMLElement | null = document.getElementById('tablebody');

type AnimeRecord = {
    id: string,
    isCompleted: boolean,
    title: string,
    season: number,
    episode: number,
    startDate: string,
    lastWatchDate: string
}

function onAddRow(): void {
    const COLUMN_COUNT: number = 6;
    const END_CHECK_COLUMN: number = 0;
    const TITLE_COLUMN: number = 1;
    const SEASON_COLUMN: number = 2;
    const EPISODE_COLUMN: number = 3;
    const START_DATE_COLUMN: number = 4;
    const LAST_WATCH_DATE_COLUMN: number = 5;

    const rowId: string = crypto.randomUUID();

    const tableRow: HTMLElement = document.createElement('tr');

    tableRow.setAttribute('data-id', rowId);

    createRecord(rowId);

    for (let columnIndex = 0; columnIndex < COLUMN_COUNT; columnIndex++) {
        const tableData: HTMLElement = document.createElement('td');
        const columnInput: HTMLElement = document.createElement('input');

        switch (columnIndex) {
            case END_CHECK_COLUMN:
                columnInput.setAttribute('type', 'checkbox');
                columnInput.setAttribute('data-id', rowId);
                columnInput.setAttribute('data-column', 'isCompleted');
                tableData.appendChild(columnInput);
                columnInput.addEventListener("change", onEndCheckChange);
                break;
            case TITLE_COLUMN:
                tableData.appendChild(columnInput);
                columnInput.setAttribute('data-id', rowId);
                columnInput.setAttribute('data-column', 'title');
                break;
            case SEASON_COLUMN:
                columnInput.setAttribute('style', 'width: 100px')
                columnInput.setAttribute('type', 'number');
                columnInput.setAttribute('data-id', rowId);
                columnInput.setAttribute('data-id', 'season');
                tableData.appendChild(columnInput);
                break;
            case EPISODE_COLUMN:
                columnInput.setAttribute('style', 'width: 100px')
                columnInput.setAttribute('type', 'number');
                columnInput.setAttribute('data-id', rowId);
                columnInput.setAttribute('data-column', 'episode');
                tableData.appendChild(columnInput);
                break;
            case START_DATE_COLUMN:
                columnInput.setAttribute('type', 'date');
                columnInput.setAttribute('data-id', rowId);
                columnInput.setAttribute('data-column', 'startDate');
                tableData.appendChild(columnInput);
                break;
            case LAST_WATCH_DATE_COLUMN:
                columnInput.setAttribute('type', 'date');
                columnInput.setAttribute('data-id', rowId);
                columnInput.setAttribute('data-column', 'lastWatchDate');
                tableData.appendChild(columnInput);
                break;
        }
        tableRow.appendChild(tableData);
    }
    tableBody!.appendChild(tableRow);
};

function onEndCheckChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const id = target.dataset.id!;
    const columnName = target.dataset.column!;
    const judgement = target.checked;

    updateRecord(id, columnName, judgement);
}

addRowButton!.addEventListener("click", onAddRow);

function createRecord(recordId: string): void {
    const anime: AnimeRecord =
    {
        id: recordId,
        isCompleted: false,
        title: '',
        season: 0,
        episode: 0,
        startDate: '',
        lastWatchDate: ''
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
    information: string | boolean
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