const screenExpression = document.querySelector('#screenExpression');
const screenInput = document.querySelector('#screenInput');
let currentExpression = '';
let currentInput = '';

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('#equalsButton');
const clearButton = document.querySelector('#clearButton');
const negativeButton = document.querySelector('#negativeButton');
const percentButton = document.querySelector('#percentButton');
const decimalButton = document.querySelector('#decimalButton');

function initializeButtons() {
    for (let button of numberButtons) {
            button.addEventListener('click', numberClicked);
    }
    for (let button of operatorButtons) {
        button.addEventListener('click', operatorClicked);
    }

    equalsButton.addEventListener('click', equalsClicked);
    clearButton.addEventListener('click', clearClicked);
    
}

function clearClicked(e) {
    currentExpression = '';
    currentInput = '';
    screenExpression.textContent = '';
    screenInput.textContent = '';
}

function equalsClicked(e) {
    let lastCharIndex = currentExpression.length - 1;
    if (screenInput.textContent !== '' && isOperator(currentExpression.charAt(lastCharIndex))) {
        let num1 = currentExpression.slice(0, -1);
        let operator = currentExpression.charAt(lastCharIndex);
        let num2 = screenInput.textContent;
        
        currentExpression = calculate(num1, operator, num2).toString();
        screenExpression.textContent = currentExpression;
        screenInput.textContent = '';

    }
}

function calculate(num1, operator, num2) {
    if (operator === '+') {return parseFloat(num1) + parseFloat(num2);}
    else if (operator === '−') {return parseFloat(num1) - parseFloat(num2);}
    else if (operator === '÷') {return parseFloat(num1) / parseFloat(num2);}
    else if (operator === '×') {return parseFloat(num1) * parseFloat(num2);}
    else {
        console.log("calculate method error: improper operator given");
    }
}

function operatorClicked(e) {
    let lastCharIndex = currentExpression.length - 1;
    let lastChar = currentExpression.charAt(lastCharIndex);

    if (screenInput.textContent !== '') {
        currentExpression = screenInput.textContent;
        currentExpression += e.target.textContent;        
        screenExpression.textContent = currentExpression;
        currentInput = '';
        screenInput.textContent = '';
    }
    else {
        if (isOperator(lastChar)) {
            currentExpression = currentExpression.slice(0, -1) + e.target.textContent;
            screenExpression.textContent = currentExpression;
        }
        else if (screenExpression.textContent !== '') {
            currentExpression += e.target.textContent;
            screenExpression.textContent = currentExpression;
        }
    }
}

function isOperator(char) {
    return (char === '÷' || char === '×' || char === '+' || char === '−')
}

function numberClicked(e) {
    screenInput.innerHTML += e.target.textContent;
}

initializeButtons();