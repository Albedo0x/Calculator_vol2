// Описание основного класса

export class Calculator {
  constructor(options) {
    this.$screen = document.getElementById(options.selector);
    this.number1 = options.number1;
    this.number2 = options.number2;
    this.operation = options.operation;
    this.state = options.state;
  }

  show(info) {
    this.$screen.innerHTML = info;
  }

  onLoadClearing() {
    this.$screen.innerHTML = "0";
    this.number1 = "0";
    this.number2 = "";
    this.operation = "";
    this.state = false;
  }

  onCalcClearing(info) {
    this.show(info);
    this.state = true;
    this.number2 = "";
    this.operation = "";
  }

  calculate(operation) {
    switch (operation) {
      case "+":
        this.number1 = +(+this.number1 + +this.number2).toFixed(3);
        return this.number1;
      case "-":
        this.number1 = +(+this.number1 - +this.number2).toFixed(3);
        return this.number1;
      case "*":
        this.number1 = +(+this.number1 * +this.number2).toFixed(3);
        return this.number1;
      case "÷":
        this.number1 = +(+this.number1 / +this.number2).toFixed(3);
        return this.number1;
      case "^":
        this.number1 = +((+this.number1) ** +this.number2).toFixed(3);
        return this.number1;
    }
  }
}
