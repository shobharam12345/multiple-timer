// script.js
document.getElementById("addTimer").addEventListener("click", addTimer);

function addTimer() {
  const timersContainer = document.getElementById("timers");

  // Create Timer Div
  const timerDiv = document.createElement("div");
  timerDiv.classList.add("timer");

  // Timer Display
  const timerDisplay = document.createElement("span");
  timerDisplay.textContent = "00:00:00";
  timerDisplay.className = "timer-display";

  // Lock Button
  const lockBtn = document.createElement("span");
  lockBtn.className = "lock-btn";
  lockBtn.textContent = "🔓";
  lockBtn.addEventListener("click", () => toggleLock(timerDiv, lockBtn));

  // Controls
  const controlsDiv = document.createElement("div");
  controlsDiv.className = "controls";

  const startBtn = document.createElement("button");
  startBtn.textContent = "Start";
  startBtn.addEventListener("click", () => startTimer(timerDiv));

  const stopBtn = document.createElement("button");
  stopBtn.textContent = "Stop";
  stopBtn.addEventListener("click", () => stopTimer(timerDiv));

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset";
  resetBtn.addEventListener("click", () => resetTimer(timerDiv));

  controlsDiv.append(startBtn, stopBtn, resetBtn);
  timerDiv.append(timerDisplay, controlsDiv, lockBtn);
  timersContainer.appendChild(timerDiv);

  // Initialize Timer Data
  timerDiv.timer = {
    time: 0,
    interval: null,
    isLocked: false,
  };
}

function toggleLock(timerDiv, lockBtn) {
  const timer = timerDiv.timer;
  timer.isLocked = !timer.isLocked;
  if (timer.isLocked) {
    lockBtn.textContent = "🔒";
    timerDiv.classList.add("locked");
  } else {
    lockBtn.textContent = "🔓";
    timerDiv.classList.remove("locked");
  }
}

function startTimer(timerDiv) {
  const timer = timerDiv.timer;
  if (timer.isLocked || timer.interval) return;
  timer.interval = setInterval(() => {
    timer.time++;
    updateDisplay(timerDiv);
  }, 1000);
}

function stopTimer(timerDiv) {
  const timer = timerDiv.timer;
  if (timer.isLocked || !timer.interval) return;
  clearInterval(timer.interval);
  timer.interval = null;
}

function resetTimer(timerDiv) {
  const timer = timerDiv.timer;
  if (timer.isLocked) return;
  clearInterval(timer.interval);
  timer.interval = null;
  timer.time = 0;
  updateDisplay(timerDiv);
}

function updateDisplay(timerDiv) {
  const timer = timerDiv.timer;
  const hours = Math.floor(timer.time / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((timer.time % 3600) / 60).toString().padStart(2, "0");
  const seconds = (timer.time % 60).toString().padStart(2, "0");
  timerDiv.querySelector(".timer-display").textContent = `${hours}:${minutes}:${seconds}`;
}
