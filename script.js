let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];
let lapTimestamps = [];
let interval;

// Display current date and time on page load
updateDateTime();

function startStop() {
    if (isRunning) {
        clearInterval(interval);
    } else {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateTime, 100);
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(interval);
    isRunning = false;
    elapsedTime = 0;
    lapTimes = [];
    lapTimestamps = [];
    updateDisplay();
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const currentTimestamp = Date.now();
        lapTimestamps.push(currentTimestamp);

        // Calculate the time taken for the current lap
        const lapDifference = lapTimestamps.length > 1
            ? currentTimestamp - lapTimestamps[lapTimestamps.length - 2]
            : 0;

        lapTimes.push({
            lap: lapTime,
            difference: formatTime(lapDifference)
        });
        
        updateDisplay();
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('stopwatch').textContent = formatTime(elapsedTime);
    document.getElementById('lapTimes').innerHTML = lapTimes.map((lap, index) => 
        `${index + 1} &emsp;&emsp; ${lap.lap} &emsp;&emsp; ${lap.difference}`
    ).join('<br>');
}

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}.${(milliseconds < 10 ? '0' : '')}${milliseconds}`;
}

function updateDateTime() {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString();
    document.getElementById('datetime').textContent = formattedDateTime;
}

// Update current date and time every second
setInterval(updateDateTime, 1000);

