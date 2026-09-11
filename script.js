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
let operatorSymbol = null;
let resultDisplayed = false;

/*---------------------
-------- HELPER FUNCTIONS -------
----------------------*/
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error";
  }
  return a / b;
}

function clearEl(element) {
  element.textContent = "";
}
function getSymbol(type) {
  switch (type) {
    case "div":
      return "÷";
    case "add":
      return "+";
    case "sub":
      return "-";
    case "multiply":
      return "×";
    default:
      return "";
  }
}
function resetAll() {
  firstInput = null;
  secondInput = null;
  operatorType = null;
  operatorSymbol = null;
  resultDisplayed = false;
  clearEl(calculationDisplay);
  clearEl(calculatorInput);
}
function operate(operator, a, b) {
  let res;

  if (operator === "div") {
    res = divide(a, b);
  } else if (operator === "multiply") {
    res = multiply(a, b);
  } else if (operator === "sub") {
    res = subtract(a, b);
  } else if (operator === "add") {
    res = add(a, b);
  }

  if (res === "Error") {
    return "Error";
  }

  return Math.round(res * 1e8) / 1e8;
}

clearEl(calculatorInput);
clearEl(calculationDisplay);
numberKeys.forEach((numberKey) => {
  numberKey.addEventListener("click", () => {
    let numberInput = numberKey.dataset.btn;
    if (calculatorInput.textContent === "Error") {
      resetAll();
    }
    if (resultDisplayed) {
      calculatorInput.textContent = numberInput;
      resultDisplayed = false;
    } else if (calculatorInput.textContent === "0") {
      calculatorInput.textContent = numberInput;
    } else {
      calculatorInput.textContent += numberInput;
    }
  });
});

operatorKeys.forEach((operatorKey) => {
  operatorKey.addEventListener("click", () => {
    if (calculatorInput.textContent === "" && firstInput === null) return;
    if (calculatorInput.textContent === "Error") return;
    if (resultDisplayed && calculatorInput.textContent === String(firstInput)) {
      operatorType = operatorKey.dataset.btn;
      operatorSymbol = getSymbol(operatorType);
      calculationDisplay.textContent = `${firstInput}${operatorSymbol}`;
      return;
    }
    if (firstInput !== null && operatorType !== null && !resultDisplayed) {
      secondInput = Number(calculatorInput.textContent);
      let result = operate(operatorType, firstInput, secondInput);
      if (result === "Error") {
        calculatorInput.textContent = "Error";
        firstInput = null;
        secondInput = null;
        resultDisplayed = true;
        return;
      }
      firstInput = result;
      calculatorInput.textContent = firstInput;
      secondInput = null;
      resultDisplayed = false;
    } else {
      firstInput = Number(calculatorInput.textContent);
    }

    operatorType = operatorKey.dataset.btn;
    operatorSymbol = getSymbol(operatorType);
    calculationDisplay.textContent = `${firstInput}${operatorSymbol}`;
    resultDisplayed = true;
  });
});

equalKey.addEventListener("click", () => {
  if (calculatorInput.textContent === "" || operatorType === null) return;

  secondInput = Number(calculatorInput.textContent);
  let result = operate(operatorType, firstInput, secondInput);
  if (result === "Error") {
    calculatorInput.textContent = "Error";
    firstInput = null;
    secondInput = null;
    resultDisplayed = true;
    return;
  }
  operatorSymbol = getSymbol(operatorType);
  calculationDisplay.textContent = `${firstInput} ${operatorSymbol} ${secondInput}=`;
  firstInput = result;
  operatorType = null;
  calculatorInput.textContent = firstInput;
  secondInput = null;
  resultDisplayed = true;
});

clearKey.addEventListener("click", () => {
  resetAll();
});

backKey.addEventListener("click", () => {
  if (calculatorInput.textContent === "Error") {
    resetAll();
    return;
  }
  const back = calculatorInput.textContent.slice(0, -1);
  calculatorInput.textContent = back;
});
dotKey.addEventListener("click", () => {
  if (calculatorInput.textContent === "Error") {
    resetAll();
    calculatorInput.textContent = "0.";
  }
  if (!calculatorInput.textContent.includes(".")) {
    if (resultDisplayed) {
      calculatorInput.textContent = "0.";
      resultDisplayed = false;
    } else {
      if (calculatorInput.textContent === "") {
        calculatorInput.textContent += "0.";
      } else {
        calculatorInput.textContent += ".";
      }
    }
  }
});
/*---------------------
-------- KEYBOARD SUPPORT -------
----------------------*/
window.addEventListener("keydown", (e) => {
  // Numbers 0-9
  if (e.key >= "0" && e.key <= "9") {
    const numBtn = document.querySelector(`.key-num[data-btn="${e.key}"]`);
    if (numBtn) numBtn.click();
  }
  if (e.key === "+") {
    document.querySelector('.key-op[data-btn="add"]')?.click();
  }
  if (e.key === "-") {
    document.querySelector('.key-op[data-btn="sub"]')?.click();
  }
  if (e.key === "*") {
    document.querySelector('.key-op[data-btn="multiply"]')?.click();
  }
  if (e.key === "/") {
    e.preventDefault();
    document.querySelector('.key-op[data-btn="div"]')?.click();
  }
  if (e.key === ".") {
    dotKey.click();
  }
  if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    equalKey.click();
  }
  if (e.key === "Backspace") {
    backKey.click();
  }
  if (e.key === "Escape" || e.key.toLowerCase() === "c") {
    clearKey.click();
  }
});
