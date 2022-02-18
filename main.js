// catch elements the numbers and operators
let number = document.querySelectorAll('.numbers')
let operator = document.querySelectorAll('.operators')

// catch buttons: " = AC ⌫ . "
let equalto = document.querySelector('.equal')
let clear = document.querySelector('.clear')
let backspace = document.querySelector('.backspace')

// catch display and output
let display = document.querySelector('.display.cover')
let output = document.querySelector('.output')

// flag to keep an eye on what output is displayed
let equaltoPressed = false // no exemplo é resultDisplayed

// adding click handlers to number buttons
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function (e) {
        //storing current input string and its last character in variables - used later
        let currentString = display.innerHTML
        let lastChar = currentString[currentString.length - 1]

        // if result is not diplayed, just keep adding
        if (equaltoPressed === false) {
            display.innerHTML += e.target.innerHTML
        } else if (
            (equaltoPressed === true && lastChar === '+') ||
            lastChar === '-' ||
            lastChar === '∗' ||
            lastChar === '/'
        ) {
            // if result is currently displayed and user pressed an operator
            // we need to keep on adding to the string for next operation
            equaltoPressed = false
            display.innerHTML += e.target.innerHTML
        } else {
            // if result is currently displayed and user pressed a number
            // we need clear the input string and add the new input to start the new opration
            equaltoPressed = false
            display.innerHTML = ''
            display.innerHTML += e.target.innerHTML
        }
    })
}

// adding click handlers to number buttons
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function (e) {
        // storing current input string and its last character in variables - used later
        let currentString = display.innerHTML
        let lastChar = currentString[currentString.length - 1]

        // if last character entered is an operator, replace it with the currently pressed one
        if (
            lastChar === '+' ||
            lastChar === '-' ||
            lastChar === '∗' ||
            lastChar === '/'
        ) {
            let newString =
                currentString.substring(0, currentString.length - 1) +
                e.target.innerHTML
            display.innerHTML = newString
        } else if (currentString.length == 0) {
            // if first key pressed is an opearator, don't do anything
            console.log('enter a number first')
        } else {
            // else just add the operator pressed to the input
            display.innerHTML += e.target.innerHTML
        }
    })
}

// on click of 'equal' button
equalto.addEventListener('click', function () {
    // this is the string that we will be processing eg. -10+26+33-56*34/23
    let inputString = display.innerHTML

    // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
    let numbers = inputString.split(/\+|\-|\∗|\//g)

    // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
    // first we replace all the numbers and dot with empty string and then split
    let operators = inputString.replace(/[0-9]|\./g, '').split('')

    console.log(inputString)
    console.log(operators)
    console.log(numbers)

    // now we are looping through the array and doing one operation at a time.
    // first divide, then multiply, then subtraction and then addition
    // as we move we are alterning the original numbers and operators array
    // the final element remaining in the array will be the output

    // Division
    let divide = operators.indexOf('/')
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1])
        operators.splice(divide, 1)
        divide = operators.indexOf('/')
    }

    // Multiplication
    let multiply = operators.indexOf('∗')
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1])
        operators.splice(multiply, 1)
        multiply = operators.indexOf('∗')
    }

    // Subtraction
    let subtract = operators.indexOf('-')
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1])
        console.log(numbers)
        operators.splice(subtract, 1)
        subtract = operators.indexOf('-')
    }

    // Addition
    let add = operators.indexOf('+')
    while (add != -1) {
        // using parseFloat is necessary, otherwise it will result in string concatenation :)
        numbers.splice(
            add,
            2,
            parseFloat(numbers[add]) + parseFloat(numbers[add + 1])
        )
        operators.splice(add, 1)
        add = operators.indexOf('+')
    }

    // verificando quantidade de caracteres
    let quant = String(numbers[0])

    if (quant.length > 8) {
        output.innerHTML = `= ${numbers[0].toFixed(6)}`
        equaltoPressed = true
    } else {
        output.innerHTML = `= ${numbers[0]}`
        equaltoPressed = true
    }
})

// clearing the input on press of clear
clear.addEventListener('click', function () {
    display.innerHTML = ''
    output.innerHTML = ''
    equaltoPressed = false
})

// backspace one character
backspace.addEventListener('click', function () {
    equaltoPressed = false
    display.innerHTML = display.innerHTML.substr(
        0,
        display.innerHTML.length - 1
    )
})
