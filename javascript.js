const screenExpression = document.querySelector('#screenExpression');
const screenInput = document.querySelector('#screenInput');

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
    screenExpression.textContent = '';
    screenInput.textContent = '';
}

function equalsClicked(e) {
    let lastCharIndex = screenExpression.textContent.length - 1;
    if (screenInput.textContent !== '' && isOperator(screenExpression.textContent.charAt(lastCharIndex))) {
        let num1 = screenExpression.textContent.slice(0, -1);
        let operator = screenExpression.textContent.charAt(lastCharIndex);
        let num2 = screenInput.textContent;
        
        screenExpression.textContent = calculate(num1, operator, num2).toString();
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
    let lastChar = screenExpression.textContent.charAt(screenExpression.length - 1);

    if (screenInput.textContent !== '') {     
        screenExpression.textContent = screenInput.textContent + e.target.textContent;
        screenInput.textContent = '';
    }
    else {
        if (isOperator(lastChar)) {
            screenExpression.textContent = screenExpression.textContent.slice(0, -1) + e.target.textContent;
        }
        else if (screenExpression.textContent !== '') {
            screenExpression.textContent += e.target.textContent;
        }
    }
}

function isOperator(char) {
    return (char === '÷' || char === '×' || char === '+' || char === '−')
}

function numberClicked(e) {
    screenInput.textContent += e.target.textContent;
}

initializeButtons();