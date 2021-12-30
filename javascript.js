let expression = document.querySelector('#screenExpression');
let input = document.querySelector('#screenInput');

function initializeButtons() {
    const buttons = document.querySelectorAll('.calcButton');

    for (let button of buttons) {
        button.addEventListener('click', numberClicked);
    }
}

function numberClicked(e) {
    input.innerHTML += e.target.textContent;

}

initializeButtons();