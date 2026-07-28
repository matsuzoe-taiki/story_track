const addRowButton: HTMLElement | null = document.getElementById('addrowbutton');

const addRow = () => {
    const COLUMN_COUNT = 6

    const tableBody: HTMLElement | null = document.getElementById('tablebody');
    const tableRow: HTMLElement = document.createElement('tr');

    for (let count = 0; count < COLUMN_COUNT; count++) {
        const tableData: HTMLElement = document.createElement('td');

        tableData.textContent = 'hello';

        tableRow.appendChild(tableData);
    }

    tableBody!.appendChild(tableRow);
};

addRowButton!.addEventListener("click", addRow);