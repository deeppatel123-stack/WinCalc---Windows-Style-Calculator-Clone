const display = document.getElementById("display");
let currentInput = "";
let resetDisplay = false;

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    button.classList.add("clicked");
    setTimeout(() => button.classList.remove("clicked"), 100);

    if (!isNaN(value) || value === ".") {
      if (resetDisplay) {
        currentInput = "";
        resetDisplay = false;
      }
      if (value === "." && currentInput.includes(".")) return;
      currentInput += value;
      display.innerText = currentInput;
    } else if (value === "C" || value === "CE") {
      currentInput = "";
      display.innerText = "0";
    } else if (value === "back") {
      currentInput = currentInput.slice(0, -1);
      display.innerText = currentInput || "0";
    } else if (value === "=") {
      try {
        currentInput = eval(currentInput.replace("×", "*").replace("÷", "/")).toString();
        display.innerText = currentInput;
        resetDisplay = true;
      } catch {
        display.innerText = "Error";
        currentInput = "";
      }
    } else if (value === "+/-") {
      currentInput = (parseFloat(currentInput) * -1).toString();
      display.innerText = currentInput;
    } else if (value === "x²") {
      currentInput = (parseFloat(currentInput) ** 2).toString();
      display.innerText = currentInput;
    } else if (value === "√") {
      currentInput = Math.sqrt(parseFloat(currentInput)).toString();
      display.innerText = currentInput;
    } else if (value === "1/x") {
      currentInput = (1 / parseFloat(currentInput)).toString();
      display.innerText = currentInput;
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (!resetDisplay) {
        currentInput += value;
        display.innerText = currentInput;
      }
    }
  });
});
