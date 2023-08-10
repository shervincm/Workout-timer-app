// display current time
// const myTime = setInterval(myTimer, 1000);

// function myTimer() {
//   const d = new Date();
//   const displayTime = d.toLocaleTimeString();
//   document.getElementById('displayTime').innerHTML = displayTime;
// }

// Get Elements from the DOM
const body = document.querySelector("body");

// Get inputs
const roundsCountInput = document.getElementById("rounds");
const roundTimeInput = document.getElementById("roundTime");
const restTimeInput = document.getElementById("restTime");

const startStopBtn = document.getElementById("start");
const roundsContainer = document.querySelector(".title");

// Get audio alerts
const getReadyAlert = document.getElementById("getReady");
const roundStartAlert = document.getElementById("roundStart");
const restAlert = document.getElementById("restRound");
const workoutCompleteAlert = document.getElementById("endWorkout");

let interval;
let restTime;
let currentRound = 1;
let isPaused = false; // Track if the countdown is paused

const startTimer = () => {
  if (roundsCountInput.value === "" || roundTimeInput.value === "" || restTimeInput.value === "") {
    alert("Please fill all the fields");
    return;
  }

  let roundsCount = parseInt(roundsCountInput.value);
  let roundTime = roundTimeInput.value * 60;
  restTime = restTimeInput.value * 60;
  let time = 5;

  startStopBtn.innerHTML = "Pause";
  startStopBtn.style.backgroundColor = "#ff0000";
  startStopBtn.onclick = toggleTimer; // Use toggleTimer function to start/stop the countdown

  const startWorkout = document.querySelector(".title");

  const startCountdown = document.querySelector(".title");
  getReady(startCountdown);

  interval = setInterval(() => {
    if (!isPaused) { // Only decrement the time if not paused
      getReady(startCountdown);
    }
  }, 1000);
  

  function setAlert(alert) {
       alert.play();
       setTimeout(() => {
          alert.pause();
          alert.currentTime = 0;
        }, 2900);
  }

  setAlert(getReadyAlert);

  function getReady(element) {
    let seconds = time % 60;
    element.innerHTML = `
      <div class="inputs-container flex">
        <h4 class='title'>Get Ready in</h4>
        <h2 id='seconds' class='active animateSeconds'>${seconds}</h2>
      </div>
    `;

    time--;

    if (time < 0) {
      clearInterval(interval);
      setTimeout(() => {
        currentRound = 1;
        startTraining(startWorkout);
      }, 0);
    }
  }

  function startTraining(element) {
    setAlert(roundStartAlert);
    let seconds = roundTime % 60;
    let minutes = Math.floor(roundTime / 60);
    element.innerHTML = `
      <div class="inputs-container flex">
        <h4 class='title'>Round ${currentRound}</h4>
        <h2 id='minutes' class='active animateMinutes'>${minutes}</h2>
        <h2 id='seconds' class='active animateSeconds'>${seconds}</h2>
      </div>
    `;
  
    const updateRoundTime = () => {
      if (!isPaused) {
        let seconds = roundTime % 60;
        let minutes = Math.floor(roundTime / 60);
        element.innerHTML = `
        <div class="inputs-container flex">
        <h4 class='title'>Round ${currentRound}</h4>
        ${minutes > 0 ? `<h2 id='minutes' class='active animateMinutes'>${minutes}</h2>` : ''}
        <h2 id='seconds' class='active animateSeconds'>${seconds}</h2>
      </div>
    `;
  
        if (roundTime <= 0) {
          clearInterval(interval);
          if (currentRound === roundsCount) {
            newWorkout();
          } else {
            rest(element);
          }
          return;
        }
  
        roundTime--;
      }
    };
  
    updateRoundTime(); // Update the countdown display immediately
    
  
    interval = setInterval(updateRoundTime, 1000); // Start the countdown interval
  }

  function rest(element) {
    setAlert(restAlert);
    let seconds = restTime % 60;
    let minutes = Math.floor(restTime / 60);
    element.innerHTML = `
    <div class="inputs-container flex">
    <h4 class='title'>Rest</h4>
    ${minutes > 0 ? `<h2 id='minutes' class='active animateMinutes'>${minutes}</h2>` : ''}
    <h2 id='seconds' class='active animateSeconds'>${seconds}</h2>
  </div>
`;
  
    interval = setInterval(() => {
      if (!isPaused) { // Only decrement the time if not paused
        seconds--;
        if (seconds < 0) {
          minutes--;
          seconds = 59;
        }
        element.innerHTML = `
        <div class="inputs-container flex">
        <h4 class='title'>Rest</h4>
        ${minutes > 0 ? `<h2 id='minutes' class='active animateMinutes'>${minutes}</h2>` : ''}
        <h2 id='seconds' class='active animateSeconds'>${seconds}</h2>
      </div>
    `;
    
        if (minutes <= 0 && seconds <= 0) {
          clearInterval(interval);
          if (currentRound < roundsCount) {
            currentRound++;
            roundTime = roundTimeInput.value * 60; // Reset roundTime to original value
            restTime = restTimeInput.value * 60; // Reset restTime to original value
            startTraining(element);
          } 
        }
      }
    }, 1000);
  }
};

const toggleTimer = () => {
  if (isPaused) {
    isPaused = false; // Resume the countdown    
    startStopBtn.innerHTML = "Pause";
    startStopBtn.style.backgroundColor = "#ff0000";
  } else {
    isPaused = true; // Pause the countdown
    startStopBtn.innerHTML = "Resume";
    startStopBtn.style.backgroundColor = "#008000";
  }
};

const newWorkout = () => {
  // Reset input fields
  roundsCountInput.value = "";
  roundTimeInput.value = "";
  restTimeInput.value = "";

  // Reset start/stop button
  startStopBtn.innerHTML = "Start";
  startStopBtn.style.backgroundColor = "#008000";
  startStopBtn.onclick = startTimer;

  // Reset workout status message
  roundsContainer.innerHTML = "Workout Complete!";
  
  setAlert(workoutCompleteAlert);
};

// Function to play audio alert
function setAlert(alert) {
  alert.play();
  setTimeout(() => {
    alert.pause();
    alert.currentTime = 0;
  }, 2900);
}

const resetWorkout = () => {
  window.location.reload();
};