const expression = document.querySelector('#screenExpression');
const input = document.querySelector('#screenInput');

function initializeButtons() {
    const buttons = document.querySelectorAll('.calcButton');

    for (let button of buttons) {
        button.addEventListener('click', numberClicked);
    }
}

function numberClicked(e) {
    expression += e.target.textContent;

}

initializeButtons();