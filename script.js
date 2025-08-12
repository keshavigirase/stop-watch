let [seconds, minutes, hours] = [0, 0, 0];
let interval = null;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const beep = new Audio("beep.mp3");

function updateDisplay() {
  const h = hours.toString().padStart(2, "0");
  const m = minutes.toString().padStart(2, "0");
  const s = seconds.toString().padStart(2, "0");
  display.innerText = `${h}:${m}:${s}`;
}

function start() {
  if (interval) return;

  interval = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    updateDisplay();
  }, 1000);

  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  lapBtn.disabled = false;
  
}

function pause() {
  clearInterval(interval);
  interval = null;

  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function reset() {
  clearInterval(interval);
  interval = null;
  [seconds, minutes, hours] = [0, 0, 0];
  updateDisplay();
  laps.innerHTML = "";

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
}

function lap() {
  const li = document.createElement("li");
  li.textContent = `Lap ${laps.children.length + 1}: ${display.textContent}`;
  laps.appendChild(li);
}