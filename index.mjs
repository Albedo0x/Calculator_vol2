//Объявление переменных и констант

const calcInput = document.getElementById("main-input");
const inputScreen = document.getElementById("screen");
const maxN = 999999999999;
let number1 = "";
let number2 = "";
let operation = "";
let state = false;

//   // Если нажата одна из операций необходимо начать набирать вторую переменную

//   if (clickedBtn.classList.contains("btn-operation")) {
//     if (number1 !== "" && state === true) {
//       state = false;
//       operation = clickedBtn.innerHTML;
//       showContent(operation);
//     } else {
//       operation = clickedBtn.innerHTML;
//       showContent(operation);
//     }
//   }
// });

// Функция очистки переменных и экрана
function clearing() {
  inputScreen.innerHTML = "0";
  number1 = "0";
  number2 = "";
  operation = "";
}

class InputButton {
  constructor(value) {
    this.value = value;
  }
}

class Screen {
  constructor(info) {
    this.info = info;
  }

  show() {
    inputScreen.innerHTML = this.info;
  }

  clear() {
    inputScreen.innerHTML = "0";
  }
}

class Calculation {
  constructor(number1, number2, operation, status) {
    this.number1 = number1;
    this.number2 = number2;
    this.operation = operation;
    this.status = status;
  }

  clr() {
    state = true;
    number2 = "";
    operation = "";
  }

  sum() {
    return this.number1 + this.number2;
  }
  sub() {
    return this.number1 - this.number2;
  }
  mult() {
    return this.number1 * this.number2;
  }
  div() {
    return this.number1 / this.number2;
  }
  exp() {
    return this.number1 ** this.number2;
  }
}

let calculator = new Calculation(4, 4);

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
      number1 = calculator(number1, number1, operation);
      number1 > maxN
        ? (inputScreen.innerHTML = "too Much")
        : calcState(number1);
    }
    if (number2 === "" && operation === "") {
      calcState(number1);
    } else {
      number1 = calculation(number1, number2, operation);
      number1 > maxN
        ? (inputScreen.innerHTML = "too Much")
        : calcState(number1);
    }
  }

  if (clickedBtn.classList.contains("btn-digit")) {
    if (state === false) {
      if (operation === "" && number2 === "" && number1 === "0") {
        number1 = clickedBtn.innerHTML;
        showContent(number1);
        return;
      }
      if (operation === "" && number2 === "" && number1 != "0") {
        number1 = number1 + clickedBtn.innerHTML;
        showContent(number1);
        return;
      } else {
        number2 = number2 + clickedBtn.innerHTML;
        showContent(number2);
      }
    } else {
      number1 = clickedBtn.innerHTML;
      showContent(number1);
      state = false;
    }
  }
});
