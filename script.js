/*---------------------
-------- TEXT -------
----------------------*/
const calculatorInput = document.querySelector(".calculation-input");
const calculationDisplay = document.querySelector(".calculation");
/*---------------------
-------- KEYS -------
----------------------*/
const numberKeys = document.querySelectorAll(".key-num");
const operatorKeys = document.querySelectorAll(".key-op");
const clearKey = document.querySelector(".key-clear");
const backKey = document.querySelector(".key-back");
const dotKey = document.querySelector(".key-dot");
const equalKey = document.querySelector(".key-eq");
/*---------------------
-------- STATES -------
----------------------*/
let firstInput = null;
let secondInput = null;
let operatorType = null;
let resultDisplayed = false;
/*---------------------
-------- HELPER FUNCTIONS -------
----------------------*/
function clearEl(element) {
  element.textContent = "";
}
function getResult(a, b) {
  if (operatorType === "div") {
    return a / b;
  } else if (operatorType === "multiply") {
    return a * b;
  } else if (operatorType === "sub") {
    return a - b;
  } else if (operatorType === "add") {
    return a + b;
  }
}
clearEl(calculatorInput);
numberKeys.forEach((numberKey) => {
  numberKey.addEventListener("click", () => {
    let numberInput = numberKey.dataset.btn;
    if (resultDisplayed) {
      calculatorInput.textContent = numberInput;
      resultDisplayed = false;
    } else {
      calculatorInput.textContent += numberInput;
    }
  });
});

operatorKeys.forEach((operatorKey) => {
  operatorKey.addEventListener("click", () => {
    if (firstInput !== null && operatorType !== null) {
      secondInput = Number(calculatorInput.textContent);
      let result = Number(getResult(firstInput, secondInput));
      firstInput = result;
      secondInput = null;
      calculatorInput.textContent = firstInput;
      resultDisplayed = true;
    } else {
      firstInput = Number(calculatorInput.textContent);
      clearEl(calculatorInput);
    }
    operatorType = operatorKey.dataset.btn;
  });
});
equalKey.addEventListener("click", () => {
  if (calculatorInput.textContent === "" || operatorType === null) return;
  secondInput = Number(calculatorInput.textContent);
  let result = Number(getResult(firstInput, secondInput));
  firstInput = result;
  secondInput = null;
  operatorType = null;
  calculatorInput.textContent = firstInput;
  resultDisplayed = true;
});
clearKey.addEventListener("click", () => {
  firstInput = null;
  secondInput = null;
  operatorType = null;
  clearEl(calculatorInput);
  resultDisplayed = false;
});
backKey.addEventListener("click", () => {
  const back = calculatorInput.textContent.slice(0, -1);
  calculatorInput.textContent = back;
});
