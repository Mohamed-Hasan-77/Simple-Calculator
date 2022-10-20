class Calculator {
  constructor(top_screen, bottom_screen) {
    this.top_screen = top_screen;
    this.bottom_screen = bottom_screen;
    this.clear();
  }
  clear() {
    this.top = ``;
    this.bottom = ``;
    this.operation = undefined;
  }
  delete() {
    this.bottom = this.bottom.toString().slice(0, -1);
  }
  addNumber(number) {
    if (number === `.` && this.bottom.includes(`.`)) return;
    this.bottom = this.bottom.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.bottom === ``) return;
    if (this.top !== ``) {
      this.compute();
    }
    this.operation = operation;
    this.top = this.bottom;
    this.bottom = ``;
  }
  compute() {
    let computaion;
    const topRes = parseFloat(this.top);
    const bottomRes = parseFloat(this.bottom);
    switch (this.operation) {
      case `+`:
        computaion = topRes + bottomRes;
        break;
      case `-`:
        computaion = topRes - bottomRes;
        break;
      case `*`:
        computaion = topRes * bottomRes;
        break;
      case `/`:
        computaion = topRes / bottomRes;
        break;
      default:
        return;
    }
    this.bottom = computaion;
    this.operation = undefined;
    this.top = ``;
  }
  updateDisplay() {
    this.bottom_screen.innerText = this.bottom;
    this.top_screen.innerText = this.top;
  }
}

let numbers = document.querySelectorAll(`[data-number]`);
let operations = document.querySelectorAll(`[data-operation]`);
let equal = document.querySelector(`[data-equals]`);
let del = document.querySelector(`[data-delete]`);
let clearAll = document.querySelector(`[data-clear]`);
let top_screen = document.querySelector(`[data-top]`);
let bottom_screen = document.querySelector(`[data-bottom]`);

let claculator = new Calculator(top_screen, bottom_screen);

numbers.forEach((button) => {
  button.addEventListener(`click`, () => {
    claculator.addNumber(button.innerText);
    claculator.updateDisplay();
  });
});

operations.forEach((button) => {
  button.addEventListener(`click`, () => {
    claculator.chooseOperation(button.innerText);
    claculator.updateDisplay();
  });
});

clearAll.addEventListener(`click`, () => {
  claculator.clear();
  claculator.updateDisplay();
});

equal.addEventListener(`click`, () => {
  claculator.compute();
  claculator.updateDisplay();
});
del.addEventListener(`click`, () => {
  claculator.delete();
  claculator.updateDisplay();
});
