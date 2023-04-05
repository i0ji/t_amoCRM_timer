const input = document.getElementById('timeInput');
const timer = document.getElementById('timeDisplay');
const button = document.getElementById('timeButton');
const label = document.getElementById('label');
timer.innerHTML = '00:00:00';
let interval;

function countdownTimer() {}

countdownTimer.timeSplit = function (seconds) {
    return {
        hours: (seconds / 3600) | 0,
        minutes: ((seconds / 60) | 0) % 60,
        seconds: (seconds % 60) | 0
    };
};

countdownTimer.addZero = function(time) {
    let hours = time.hours < 10 ? '0' + time.hours : time.hours;
    let minutes = time.minutes < 10 ? '0' + time.minutes : time.minutes;
    let seconds = time.seconds < 10 ? '0' + time.seconds : time.seconds;
    return hours + ':' + minutes + ':' + seconds;
};

countdownTimer.format = function (seconds) {
    return countdownTimer.addZero(countdownTimer.timeSplit(seconds));
};

function startTimer() {
    if (input.value > 0) {
        input.value--;
        button.textContent = 'Stop';
        button.style.background = '#FB957B';
        timer.innerHTML = countdownTimer.format(input.value);
        clearInterval(interval)
        interval = setInterval(startTimer, 1000);
        label.style.display = 'none';
    }
}

function stopTimer() {
    clearInterval(interval);
    label.style.display = 'inline';
    button.textContent = 'Reset';
    button.style.background = '#797BE8';
}

function resetTimer() {
    clearInterval(interval);
    timer.innerHTML = '00:00:00';
    input.value = '';
    button.textContent = 'Start';
    label.style.display = 'inline';
    button.style.background = '#797BE8';
}

let currentFunctionIndex = 0;

const functions = [
    () => startTimer(),
    () => stopTimer(),
    () => resetTimer(),
];

button.addEventListener('click', () => {

    if (input.value < 0) {
        input.value = '0';
        timer.innerHTML = '0';
    }
    const currentFunction = functions[currentFunctionIndex];
    currentFunction();
    currentFunctionIndex = (currentFunctionIndex + 1) % functions.length;
})