let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

// Function to format time
function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

// Function to update the display
function updateDisplay() {
    const currentTime = new Date().getTime();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Start/Stop button event listener
startStopBtn.addEventListener('click', function() {
    if (!running) {
        startTime = new Date().getTime() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Stop';
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
    }
    running = !running;
});

// Reset button event listener
resetBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    running = false;
    startStopBtn.textContent = 'Start';
    elapsedTime = 0;
    display.textContent = '00:00.000';
    lapsContainer.innerHTML = '';
});

// Lap button event listener
lapBtn.addEventListener('click', function() {
    if (running) {
        const lapTime = document.createElement('div');
        lapTime.className = 'lap';
        lapTime.textContent = `Lap: ${formatTime(elapsedTime)}`;
        lapsContainer.appendChild(lapTime);
    }
});
