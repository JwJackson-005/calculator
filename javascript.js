const screenExpression = document.querySelector('#screenExpression');
const screenInput = document.querySelector('#screenInput');

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('#equalsButton');
const clearButton = document.querySelector('#clearButton');
const negativeButton = document.querySelector('#negativeButton');
const percentButton = document.querySelector('#percentButton');
const decimalButton = document.querySelector('#decimalButton');

function initializeListeners() {
    for (let button of numberButtons) {
            button.addEventListener('click', numberClicked);
    }
    for (let button of operatorButtons) {
        button.addEventListener('click', () => operatorClicked(button.textContent));
    }

    equalsButton.addEventListener('click', equalsClicked);
    clearButton.addEventListener('click', clearClicked);
    negativeButton.addEventListener('click', negativeClicked);
    percentButton.addEventListener('click', percentClicked);
    decimalButton.addEventListener('click', decimalClicked);

    document.addEventListener('keydown', keyPressed);
    
}

function keyPressed(e) {
    if (e.key >= 0 && e.key <= 9) {
        screenInput.textContent += e.key;
    }
    if (e.key === "Escape" || e.key === 'c') {clearClicked();}
    if (e.key === 'Backspace') {deleteNumber()}
    if (isOperator(e.key)) {operatorClicked(e.key)}
    if (e.key === '=' || e.key === 'Enter') {equalsClicked();}
    if (e.key === '.') {decimalClicked();}
    
}

function deleteNumber() {
    if (screenInput.textContent.length > 0) {
        screenInput.textContent = screenInput.textContent.slice(0, -1);
    }
}

function decimalClicked() {
    if (!screenInput.textContent.includes('.')) {
        screenInput.textContent += '.';
    }
}

function percentClicked() {
    if (screenInput.textContent !== '') {
        screenInput.textContent = (parseFloat(screenInput.textContent) / 100).toString();
    }
    else if (screenExpression.textContent !== '' && 
            !isOperator(screenExpression.textContent.charAt(screenExpression.textContent.length - 1))) {
                screenExpression.textContent = (parseFloat(screenExpression.textContent) / 100).toString();
    }
}

function negativeClicked() {
    if (screenInput.textContent !== '') {
        screenInput.textContent = (-1 * parseFloat(screenInput.textContent)).toString();
    }
    else if (screenExpression.textContent !== '' && 
            !isOperator(screenExpression.textContent.charAt(screenExpression.textContent.length - 1))) {
                console.log('here!');
                screenExpression.textContent = (-1 * parseFloat(screenExpression.textContent)).toString();
    }

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

function operatorClicked(operator) {
    let lastChar = screenExpression.textContent.charAt(screenExpression.textContent.length - 1);
    if (screenInput.textContent !== '') {     
        screenExpression.textContent = screenInput.textContent + convert(operator);
        screenInput.textContent = '';
    }
    else {
        if (isOperator(lastChar)) {
            screenExpression.textContent = screenExpression.textContent.slice(0, -1) + convert(operator);
        }
        else if (screenExpression.textContent !== '') {
            screenExpression.textContent += convert(operator);
        }
    }
}

function convert(operator) {
    if (operator === '*') {return '×';}
    if (operator === '/') {return '÷';}
    if (operator === '-') {return '−';}
    return operator;
}

function isOperator(char) {
    return (char === '÷' || char === '×' || char === '+' || char === '−' || char === '-' || char === '*' || char === '/')
}

function numberClicked(e) {
    screenInput.textContent += e.target.textContent;
}

initializeListeners();