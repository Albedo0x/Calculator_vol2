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

class Calculation {
  constructor(number1, number2, operation, info) {
    this.number1 = number1;
    this.number2 = number2;
    this.operation = operation;
    this.info = info;
  }

  show() {
    inputScreen.innerHTML = this.info;
  }

  clear() {
    inputScreen.innerHTML = "0";
  }

  onLoadClearing() {
    this.clear();
    number1 = "0";
    number2 = "";
    operation = "";
  }

  onCalcClearing() {
    this.show();
    state = true;
    number2 = "";
    operation = "";
  }

  calculate(number1, number2, operation) {
    switch (operation) {
      case "+":
        number1 = +(+this.number1 + +this.number2).toFixed(3);
        return number1;
      case "-":
        number1 = +(+this.number1 - +this.number2).toFixed(3);
        return number1;
      case "*":
        number1 = +(+this.number1 * +this.number2).toFixed(3);
        return number1;
      case "÷":
        number1 = +(+this.number1 / +this.number2).toFixed(3);
        return number1;
      case "^":
        number1 = +((+this.number1) ** +this.number2).toFixed(3);
        return number1;
    }
  }
}
calculator = new Calculation(number1, number2, operation, info);

calculator.onLoadClearing();

calcInput.addEventListener("click", (event) => {
  let clickedBtn = event.target;

  // Если нажал не на кнопку - ничего не делаем

  if (!clickedBtn.classList.contains("calculator-btn")) {
    return;
  }

  // Если нажал на "C" - очистить экран и переменные

  if (clickedBtn.classList.contains("btn-clear-all")) {
    clearing();
  }

  if (clickedBtn.classList.contains("btn-result")) {
    if (number2 === "" && operation != "") {
      number1 = calculator.calculate(number1, number1, operation);
      number1 > maxN
        ? (inputScreen.innerHTML = "too Much")
        : calculator.onCalcClearing();
    }
    if (number2 === "" && operation === "") {
      console.log(number1);
    } else {
      number1 = calculator.calculate(number1, number2, operation);
      number1 > maxN
        ? (inputScreen.innerHTML = "too Much")
        : calculator.onCalcClearing();
    }
  }

  if (clickedBtn.classList.contains("btn-operation")) {
    if (number1 !== "" && state === true) {
      state = false;
      operation = clickedBtn.innerHTML;
      calculator.show(operation);
    } else {
      operation = clickedBtn.innerHTML;
      calculator.show(operation);
    }
  }

  if (clickedBtn.classList.contains("btn-digit")) {
    if (state === false) {
      if (operation === "" && number2 === "" && number1 === "0") {
        number1 = clickedBtn.innerHTML;
        inputScreen.innerHTML = number1;
        return;
      }
      if (operation === "" && number2 === "" && number1 != "0") {
        number1 = number1 + clickedBtn.innerHTML;
        inputScreen.innerHTML = number1;
        return;
      } else {
        number2 = number2 + clickedBtn.innerHTML;
        inputScreen.innerHTML = number2;
      }
    } else {
      number1 = clickedBtn.innerHTML;
      inputScreen.innerHTML = number1;
      state = false;
    }
  }
});
