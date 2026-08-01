const addRowButton: HTMLElement | null = document.getElementById('addrowbutton');
const tableBody: HTMLElement | null = document.getElementById('tablebody');

function onAddRow(): void {
    const COLUMN_COUNT: number = 6;
    const END_CHECK_COLUMN: number = 0;
    const TITLE_COLUMN: number = 1;
    const SEASON_COLUMN: number = 2;
    const EPISODE_COLUMN: number = 3;
    const START_DATE_COLUMN: number = 4;
    const LAST_WATCH_DATE_COLUMN: number = 5;

    const tableRow: HTMLElement = document.createElement('tr');

    createRecord();

    for (let columnIndex = 0; columnIndex < COLUMN_COUNT; columnIndex++) {
        const tableData: HTMLElement = document.createElement('td');
        const columnInput: HTMLElement = document.createElement('input');

        switch (columnIndex) {
            case END_CHECK_COLUMN:
                columnInput.setAttribute('type', 'checkbox');
                tableData.appendChild(columnInput);
                break;
            case TITLE_COLUMN:
                tableData.appendChild(columnInput);
                break;
            case SEASON_COLUMN:
                columnInput.setAttribute('style', 'width: 100px')
                columnInput.setAttribute('type', 'number');
                tableData.appendChild(columnInput);
                break;
            case EPISODE_COLUMN:
                columnInput.setAttribute('style', 'width: 100px')
                columnInput.setAttribute('type', 'number');
                tableData.appendChild(columnInput);
                break;
            case START_DATE_COLUMN:
                columnInput.setAttribute('type', 'date');
                tableData.appendChild(columnInput);
                break;
            case LAST_WATCH_DATE_COLUMN:
                columnInput.setAttribute('type', 'date');
                tableData.appendChild(columnInput);
                break;
        }
        tableRow.appendChild(tableData);
    }
    tableBody!.appendChild(tableRow);
};

addRowButton!.addEventListener("click", onAddRow);

function createRecord(): void {
    type AnimeRecord = {
        id: string,
        isCompleted: boolean,
        title: string,
        season: number,
        episode: number,
        startDate: string,
        lastWatchDate: string
    }

    const newRecord: AnimeRecord =
    {
        id: crypto.randomUUID(),
        isCompleted: false,
        title: '',
        season: 0,
        episode: 0,
        startDate: '',
        lastWatchDate: ''
    };

    const animeStorage: AnimeRecord[] = [];

    animeStorage.push(newRecord);
    console.log(animeStorage);
}
