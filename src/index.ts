const addRowButton: HTMLElement | null = document.getElementById('addrowbutton');

if (addRowButton !== null) {
    addRowButton.addEventListener("click", () => {
        console.log('こんにちは');
    });
}