
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let timerId = null;

startButton.addEventListener('click', () => {
  timerId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
    startButton.disabled = true;
});

stopButton.addEventListener("click", () => {
  clearInterval(timerId);
});


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};