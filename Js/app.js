const currentTheme = localStorage.getItem("calculator_theme");
const wrapper = document.querySelector(".calculator__switch");
const btns = document.querySelectorAll(".calculator__theme-check");

const calculatorScreenEl = document.querySelector(".calculator__input");
const calculatorHistoryEl = document.querySelector(".calculator__history");
const calculatorKeys = document.querySelectorAll(".calculator__button");
const calculatorEqualsButton = document.querySelector(
  ".calculator__button--equals"
);

let previousValue = "";

if (currentTheme == "theme--1") {
  document.documentElement.classList.toggle("theme--1");
} else if (currentTheme == "theme--2") {
  document.documentElement.classList.toggle("theme--2");
} else if (currentTheme == "theme--3") {
  document.documentElement.classList.toggle("theme--3");
}

document.documentElement.classList.add(currentTheme);

btns.forEach((btn) => {
  if (btn.id === currentTheme) {
    btn.checked = true;
  }
});

wrapper.addEventListener("click", function (e) {
  const btn = e.target.closest(".calculator__theme-check");

  if (!btn.classList.contains("calculator__theme-check")) return;

  document.documentElement.classList = "";

  const { theme } = btn.dataset;

  document.documentElement.classList.toggle(theme);

  localStorage.setItem("calculator_theme", theme);
});

const evalauteOperation = function () {
  if (calculatorScreenEl.value.trim() === "") return;
  calculatorHistoryEl.textContent = calculatorScreenEl.value;

  try {
    calculatorScreenEl.value = eval(calculatorScreenEl.value);
    setScreenAttributeValue();
  } catch (error) {
    console.log(error);
    alert(error.message);
    setScreenAttributeValue();
  }
};

const setScreenAttributeValue = function () {
  calculatorScreenEl.setAttribute("value", calculatorScreenEl.value);
};

const resetHandler = function () {
  calculatorHistoryEl.textContent = "";
  calculatorScreenEl.value = "";
};

const getValue = function (e) {
  const { value } = e.target.dataset;

  if (!value) return;

  switch (value) {
    case "=":
      evalauteOperation();
      break;
    case "DEL":
      calculatorScreenEl.value = calculatorScreenEl.value.slice(0, -1);
      setScreenAttributeValue();
      break;
    case "RESET":
      resetHandler();
      break;
    default:
      calculatorScreenEl.value += value;
      previousValue = calculatorScreenEl.value;
      setScreenAttributeValue();
      break;
  }
};

calculatorKeys.forEach((key) => {
  key.addEventListener("click", getValue);
});
