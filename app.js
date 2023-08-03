{
    const myTime = setInterval(myTimer, 1000);
    function myTimer() {
        const d = new Date();
        const displayTime = d.toLocaleTimeString();
        document.getElementById('displayTime').innerHTML = displayTime;
    }
}

// Get Elements from the DOM
const body = document.querySelector("body");

// Get inputs
const roundsCountInput = document.getElementById("rounds");
const roundTimeInput = document.getElementById("roundTime");
const restTimeInput = document.getElementById("restTime");
const startStopBtn = document.getElementById("start");

// Get container for rounds and rests
const roundsContainer = document.querySelector(".rounds-container");

const startTimer = () => {
    if (roundsCountInput.value === "" || roundTimeInput.value === "" || restTimeInput.value === "") {
        alert("Please fill all the fields");
        return;
    }
}