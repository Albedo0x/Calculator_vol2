import { Calculator } from "./calc.mjs";

let calculator = new Calculator({
  selector: "screen",
  number1: "",
  number2: "",
  operation: "",
  state: false,
});

calculator.onLoadClearing();

document.getElementById("main-input").addEventListener("click", (event) => {
  console.log(this);
  let clickedBtn = event.target;

  // Если нажал не на кнопку - ничего не делаем
  if (!clickedBtn.classList.contains("calculator-btn")) {
    return;
  }
  // Если нажал на "C" - очистить экран и переменные
  if (clickedBtn.classList.contains("btn-clear-all")) {
    calculator.onLoadClearing();
  }
  // Если нажал на "MR" - сохранить значение

  if (clickedBtn.classList.contains("btn-save")) {
    localStorage.setItem("savedNumber", calculator.number1);
  }

  // Если нажал на "MC" - взять сохранённое значениеw

  if (clickedBtn.classList.contains("btn-pull")) {
    let pullItem = localStorage.getItem("savedNumber");
    if (calculator.operation === "" && calculator.number2 === "") {
      calculator.show(pullItem);
      calculator.number1 = pullItem;
    }
    if (calculator.operation != "") {
      calculator.show(pullItem);
      calculator.number2 = pullItem;
    }
  }
  // Если нажал на "=" - выполнить рассчёт
  if (clickedBtn.classList.contains("btn-result")) {
    if (calculator.number2 === "" && calculator.operation != "") {
      calculator.number1 = calculator.calculate(calculator.operation);
    }
    if (calculator.number2 === "" && calculator.operation === "") {
      return;
    } else {
      calculator.number1 = calculator.calculate(calculator.operation);
    }
    calculator.onCalcClearing(calculator.number1);
  }
  // Если нажал на знак операции "+,-,/,^,*" - выбрать операцию
  if (clickedBtn.classList.contains("btn-operation")) {
    if (calculator.number1 !== "" && calculator.state === true) {
      calculator.state = false;
    } else {
      return;
    }
    calculator.operation = clickedBtn.innerHTML;
    calculator.show(calculator.operation);
  }
  // Если нажал на цифру - начать набирать число
  if (clickedBtn.classList.contains("btn-digit")) {
    if (calculator.state === false) {
      if (
        calculator.operation === "" &&
        calculator.number2 === "" &&
        calculator.number1 === "0"
      ) {
        calculator.number1 = clickedBtn.innerHTML;
        calculator.show(calculator.number1);
        return;
      }
      if (
        calculator.operation === "" &&
        calculator.number2 === "" &&
        calculator.number1 != "0"
      ) {
        calculator.number1 = calculator.number1 + clickedBtn.innerHTML;
        calculator.show(calculator.number1);
        return;
      } else {
        calculator.number2 = calculator.number2 + clickedBtn.innerHTML;
        calculator.show(calculator.number2);
      }
    } else {
      calculator.number1 = clickedBtn.innerHTML;
      calculator.show(calculator.number1);
      calculator.state = false;
    }
  }
});
