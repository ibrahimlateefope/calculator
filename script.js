function add(a, b) {
  return a + b;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}
function subtract(a, b) {
  return a - b;
}
let input = "";
let firstInput;
let secondInput;
let operationType;
const calculationInput = document.querySelector(".calculation-input");
const equalEl = document.querySelector(".key-eq");
const clearEl = document.querySelector(".key-clear");
Array.from(document.querySelectorAll(".key-num")).forEach((keyNum) => {
  calculationInput.textContent = "";
  keyNum.addEventListener("click", () => {
    input = keyNum.dataset.btn;
    calculationInput.textContent += input;
  });
});

Array.from(document.querySelectorAll(".key-op")).forEach((operation) => {
  operation.addEventListener("click", () => {
    firstInput = parseInt(calculationInput.textContent);
    calculationInput.textContent = "";
    const dataBtn = operation.dataset.btn;
    operationType = dataBtn;
    console.log(operationType);
  });
});

equalEl.addEventListener("click", () => {
  secondInput = parseInt(calculationInput.textContent);
  let result;
  if (operationType === "div") {
    result = divide(firstInput, secondInput).toFixed(1);
  } else if (operationType === "add") {
    result = add(firstInput, secondInput).toFixed(1);
  } else if (operationType === "multiply") {
    result = multiply(firstInput, secondInput).toFixed(1);
  } else if (operationType === "sub") {
    result = subtract(firstInput, secondInput).toFixed(1);
  }
clearEl.click()
  calculationInput.textContent = result;
  
});

clearEl.addEventListener("click", () => {
  input = "";
  firstInput = 0;
  secondInput = 0;
  operationType = "";
  calculationInput.textContent = "";
});
