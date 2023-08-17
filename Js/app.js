const currentTheme = localStorage.getItem('calculator_theme');
const wrapper = document.querySelector('.calculator__switch');
const btns = document.querySelectorAll('.calculator__theme-check');
const calculatorScreenEl = document.querySelector('.calculator__input');
const calculatorHistoryEl = document.querySelector('.calculator__history');
const calculatorKeys = document.querySelectorAll('.calculator__button');
const calculatorEqualsButton = document.querySelector('.calculator__button--equals');
let previousValue = '';

function applyTheme(theme) {
  document.documentElement.classList.remove('theme--1', 'theme--2', 'theme--3');
  if (theme) {
    document.documentElement.classList.add(theme);
  } else {
    document.documentElement.classList.add('theme--1');
    btns[0].checked = true;
  }
}

function evaluateOperation() {
  const inputTrimmed = calculatorScreenEl.value.trim();
  if (inputTrimmed === '') return;
  
  calculatorHistoryEl.textContent = inputTrimmed;

  try {
    calculatorScreenEl.value = eval(inputTrimmed);
    setScreenAttributeValue();
  } catch (error) {
    console.log(error);
    alert(error.message);
    setScreenAttributeValue();
  }
}

function setScreenAttributeValue() {
  calculatorScreenEl.setAttribute('value', calculatorScreenEl.value);
}

function resetHandler() {
  calculatorHistoryEl.textContent = '';
  calculatorScreenEl.value = '';
}

function getValue(e) {
  const value = e.target.dataset.value;

  if (!value) return;

  switch (value) {
    case '=':
      evaluateOperation();
      break;
    case 'DEL':
      calculatorScreenEl.value = calculatorScreenEl.value.slice(0, -1);
      setScreenAttributeValue();
      break;
    case 'RESET':
      resetHandler();
      break;
    default:
      calculatorScreenEl.value += value;
      previousValue = calculatorScreenEl.value;
      setScreenAttributeValue();
      break;
  }
}

btns.forEach((btn) => {
  if (btn.id === currentTheme) {
    btn.checked = true;
  }
});

applyTheme(currentTheme);
document.documentElement.classList.add(currentTheme);

wrapper.addEventListener('click', function (e) {
  const btn = e.target.closest('.calculator__theme-check');

  if (!btn || !btn.classList.contains('calculator__theme-check')) return;

  const { theme } = btn.dataset;

  applyTheme(theme);
  localStorage.setItem('calculator_theme', theme);
});

calculatorKeys.forEach((key) => {
  key.addEventListener('click', getValue);
});
