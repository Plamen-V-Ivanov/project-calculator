//Calculator functions//

function plusOperator(num1, num2) {
    return num1 + num2;
}

function minusOperator(num1, num2) {
    return num1 - num2;
}

function multiplyOperator(num1, num2) {
    return num1 * num2;
}

function divideOperator(num1, num2) {
    if (num2 == 0) {
        alert('You cannot divide to zero!');
        return "0";
    }
    return num1 / num2;
}


//Input functions 

function backspace(input) {
    if (input.length == 1 || (input.length == 2 && input[0] == "-")) {
        return input = 0;
    }
    return input.slice(0, length - 1);
}

function comma(input) {
    if (input.includes(".")) {
        return input;
    }
    return input + ".";
}

function clearCE() {
    return '0';
}

function reverseSign(input) {
    return Number(input * (-1)).toString();
}

// Expression functions //

function clearC(input, expression) {
    input = '0';
    expression = '';
    return [input, expression];
}

function equal(input, expression) {
    let [num1, operator, num2] = expression.split(' ');
    input = operators[operator](Number(num1), Number(num2));

    if (operator == "/" && num2 == "0") {
        expression = '';
    } else {
        expression += ' =';
    }
    return [input.toString(), expression];
}

const operators = {
    "+": plusOperator,
    "-": minusOperator,
    "*": multiplyOperator,
    "/": divideOperator,
}

const inputManipulators = {
    "CE": clearCE,
    ",": comma,
    "\u2190": backspace,
    "+/-": reverseSign,

}

const expressionManipulators = {
    "C": clearC,
    "=": equal,
}


const inputDiv = document.querySelector('#input');
const expressionDiv = document.querySelector('#expression');
const allDigitBtns = document.querySelectorAll('.digit');
const allOperatorBtns = document.querySelectorAll('.operator');
const allInputManipulationBtns = document.querySelectorAll('.input-manipulator');
const allExpressionManipulationBtns = document.querySelectorAll('.expression-manipulator');
const historyDiv = document.querySelector('#history');


Array.from(allDigitBtns).forEach(btn => btn.addEventListener('click', inputDigit));
Array.from(allOperatorBtns).forEach(btn => btn.addEventListener('click', registerOperator));
Array.from(allInputManipulationBtns).forEach(btn => btn.addEventListener('click', manipulateInput));
Array.from(allExpressionManipulationBtns).forEach(btn => btn.addEventListener('click', manipulateExpression));

let expression = '';
let currInput = inputDiv.textContent;
let IsOperatorRegistered = false;
let IsEquationMade = false;

function inputDigit(e) {

    let currDigit = e.target.textContent;


    if (expression == "") {
        expressionDiv.textContent = expression;
    }

    console.log(IsEquationMade);

    if (IsEquationMade) {
        currInput = currDigit;
        inputDiv.textContent = currInput;
        IsEquationMade = false;
        IsOperatorRegistered = false;
        return;
    }

    // here //

    if (IsOperatorRegistered) {
        currInput = currDigit;
        inputDiv.textContent = currInput;
        IsOperatorRegistered = false;
        return;
    }


    if (currInput == "0") {
        currInput = currDigit;
        inputDiv.textContent = currInput;
        return;

    }
    console.log(currDigit);
    console.log(currInput);
    currInput = currInput + currDigit
    inputDiv.textContent = currInput;
    return;
}


function registerOperator(e) {

    let operator = e.target.textContent;

    console.log(currInput);

    if (!currInput) {
        currInput = inputDiv.textContent;
    }

    if (IsOperatorRegistered) {
        expression = expression.slice(0, expression.length - 1) + operator;
        expressionDiv.textContent = expression;
        return;
    }

    let action = expression.match(/\s[+\/*-]/g);
    if (action) {
        expression += (" " + currInput);
        [currInput, expression] = expressionManipulators["="](currInput, expression);
        inputDiv.textContent = currInput;

        // expression += " ="
        let currHistoryExpr = document.createElement("div");
        currHistoryExpr.className = "history-expression";
        currHistoryExpr.textContent = expression;
        historyDiv.appendChild(currHistoryExpr);

        let currHistoryRes = document.createElement("div");
        currHistoryRes.className = " history-result";
        currHistoryRes.textContent = currInput;
        historyDiv.appendChild(currHistoryRes);

        expression = '';
        IsOperatorRegistered = true;
    }

    expression += currInput + " " + operator;
    expressionDiv.textContent = expression;
    IsOperatorRegistered = true;
    return;
}

function manipulateInput(e) {

    let action = e.target.textContent;
    currInput = inputManipulators[action](currInput);
    inputDiv.textContent = currInput;
    IsOperatorRegistered = false;
    IsEquationMade = false;
    return;
}

function manipulateExpression(e) {

    expression += " " + currInput;
    let action = e.target.textContent;
    [currInput, expression] = expressionManipulators[action](currInput, expression);
    inputDiv.textContent = currInput;
    expressionDiv.textContent = expression;


    if (action == "=") {
        let currHistoryExpr = document.createElement("div");
        currHistoryExpr.className = "history-expression";
        currHistoryExpr.textContent = expression;
        historyDiv.appendChild(currHistoryExpr);

        let currHistoryRes = document.createElement("div");
        currHistoryRes.className = " history-result";
        currHistoryRes.textContent = currInput;
        historyDiv.appendChild(currHistoryRes);
        IsEquationMade = true;
    }

    expression = '';
    return;
}



