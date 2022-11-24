//Объявление переменных и констант

const calcInput = document.getElementById("main-input");
const inputScreen = document.getElementById("screen");
const maxN = 999999999999;
let number1 = "";
let number2 = "";
let operation = "";
let state = false;
let info = "";
let calculator;

class Calculator {
  constructor(number1, number2, operation) {
    this.number1 = number1;
    this.number2 = number2;
    this.operation = operation;
  }

  show(info) {
    inputScreen.innerHTML = info;
  }

  clear() {
    inputScreen.innerHTML = "0";
  }

  onLoadClearing() {
    this.clear();
    number1 = "";
    number2 = "";
    operation = "";
  }

  onCalcClearing(info) {
    this.show(info);
    state = true;
    number2 = "";
    operation = "";
  }

  calculate(number1, number2, operation) {
    switch (operation) {
      case "+":
        number1 = +(+number1 + +number2).toFixed(3);
        return number1;
      case "-":
        number1 = +(+number1 - +number2).toFixed(3);
        return number1;
      case "*":
        number1 = +(+number1 * +number2).toFixed(3);
        return number1;
      case "÷":
        number1 = +(+number1 / +number2).toFixed(3);
        return number1;
      case "^":
        number1 = +((+number1) ** +number2).toFixed(3);
        return number1;
    }
  }
}
calculator = new Calculator(number1, number2, operation);

calculator.onLoadClearing();

calcInput.addEventListener("click", (event) => {
  let clickedBtn = event.target;

  // Если нажал не на кнопку - ничего не делаем

  if (!clickedBtn.classList.contains("calculator-btn")) {
    return;
  }

  // Если нажал на "C" - очистить экран и переменные

  if (clickedBtn.classList.contains("btn-clear-all")) {
    calculator.onLoadClearing();
    console.log(number1, operation, number2, state);
  }

  if (clickedBtn.classList.contains("btn-result")) {
    if (number2 === "" && operation != "") {
      number1 = calculator.calculate(number1, number1, operation);
      console.log(number1, operation, number2, state);
      number1 > maxN
        ? (inputScreen.innerHTML = "too Much")
        : calculator.onCalcClearing(number1);
    }
    if (number2 === "" && operation === "") {
      console.log(number1, operation, number2, state);
      calculator.onCalcClearing(number1);
    } else {
      console.log(number1, operation, number2, state);
      number1 = calculator.calculate(number1, number2, operation);
      console.log(number1, operation, number2, state);
      calculator.onCalcClearing(number1);
      console.log(number1, operation, number2, state);
    }
  }

  if (clickedBtn.classList.contains("btn-operation")) {
    if (number1 !== "" && state === true) {
      state = false;
      operation = clickedBtn.innerHTML;
      calculator.show(operation);
      console.log(number1, operation, number2, state);
    } else {
      operation = clickedBtn.innerHTML;
      calculator.show(operation);
      console.log(number1, operation, number2, state);
    }
  }

  if (clickedBtn.classList.contains("btn-digit")) {
    if (state === false) {
      if (operation === "" && number2 === "" && number1 === "0") {
        number1 = clickedBtn.innerHTML;
        calculator.show(number1);
        console.log(number1, operation, number2, state);
        return;
      }
      if (operation === "" && number2 === "" && number1 != "0") {
        number1 = number1 + clickedBtn.innerHTML;
        calculator.show(number1);
        console.log(number1, operation, number2, state);
        return;
      } else {
        number2 = number2 + clickedBtn.innerHTML;
        calculator.show(number2);
        console.log(number1, operation, number2, state);
      }
    } else {
      number1 = clickedBtn.innerHTML;
      calculator.show(number1);
      state = false;
      console.log(number1, operation, number2, state);
    }
  }
});
