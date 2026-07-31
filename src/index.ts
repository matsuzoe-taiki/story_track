const addRowButton: HTMLElement | null = document.getElementById('addrowbutton');
const tableBody: HTMLElement | null = document.getElementById('tablebody');

const addRow = () => {
    const COLUMN_COUNT: number = 6;

    const tableRow: HTMLElement = document.createElement('tr');

    for (let count = 0; count < COLUMN_COUNT; count++) {
        const tableData: HTMLElement = document.createElement('td');
        const columnInput: HTMLElement = document.createElement('input');

        switch (count) {
            case 0:
                columnInput.setAttribute('type', 'checkbox');

                tableData.appendChild(columnInput);
                break;
            case 1:
                tableData.appendChild(columnInput);
                break;
            case 2:
                columnInput.setAttribute('style', 'width: 100px')
                columnInput.setAttribute('type', 'number');

                tableData.appendChild(columnInput);
                break;
            case 3:
                columnInput.setAttribute('style', 'width: 100px')
                columnInput.setAttribute('type', 'number');

                tableData.appendChild(columnInput);
                break;
            case 4:
                columnInput.setAttribute('type', 'date');

                tableData.appendChild(columnInput);
                break;
            case 5:
                columnInput.setAttribute('type', 'date');

                tableData.appendChild(columnInput);
                break;
        }
        tableRow.appendChild(tableData);
    }
    tableBody!.appendChild(tableRow);
};

addRowButton!.addEventListener("click", addRow);
