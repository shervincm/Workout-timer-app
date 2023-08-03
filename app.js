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
const roundsContainer = document.querySelector(".title");

const startTimer = () => {
    // Get values from inputs
    let roundsCount = roundsCountInput.value;
    let roundTime = roundTimeInput.value * 60;
    let restTime = restTimeInput.value * 60;
    let time = 10
    let interval;

    if (roundsCountInput.value === "" || roundTimeInput.value === "" || restTimeInput.value === "") {
        alert("Please fill all the fields");
        return;
    } else {
        startStopBtn.innerHTML = "Stop";
        startStopBtn.style.backgroundColor = "#ff0000";
        startStopBtn.onclick= newWorkout;
        const startWorkout = document.querySelector(".title");
        
       interval =  setInterval(() => {
            getReady(startCountdown);
        }, 1000);

        

        const startCountdown = document.querySelector(".title");
        getReady(startCountdown);
        
        
    function getReady(element) {
        let seconds = time % 60;
        element.innerHTML = `
      <div class="inputs-container flex">
        <h4 class='title'>Get Ready in</h4>
        <h2 id='seconds' class='active animateSeconds'>${seconds}</h2>
       </div>
      `;
  
      
      if (time <= 0) {
          clearInterval(interval);
          setTimeout(() => {
              startTraining(startWorkout);
            }, 0);
        }
        time--;

      }
    }

      // start workout
      function startTraining(element) {
        console.log("start training");
        let seconds = roundTime % 60;
        let minutes = Math.floor(roundTime / 60);
        for (let currentRound = 1; currentRound <= roundsCount; currentRound++) {
        element.innerHTML = `
        <div class="inputs-container flex">
          <h4 class='title'>${currentRound}</h4>
          <h2 id='minutes' class='active animateMinutes'>${minutes}</h2>
          <h2 id='seconds' class='active animateSeconds'>${seconds}</h2>
        </div>
        `;
        roundTime--;
        if (roundTime < 0) {
          clearInterval(interval);
          rest();
        }
      }

      interval =  setInterval(() => {
        getReady(startCountdown);
    }, 1000);

    const startCountdown = document.querySelector(".title");
    
      

    }
    rest
    function rest() {
        let seconds = restTime % 60;
        let minutes = Math.floor(restTime / 60);
        roundsContainer.innerHTML = `
        <div class="inputs-container flex">
          <h4 class='title'>Rest</h4>
          <h2 id='minutes' class='active animateMinutes'>${minutes}</h2>
          <h2 id='seconds' class='active animateSeconds'>${seconds}</h2>
        </div>
        `;
        restTime--;
        if (restTime < 0) {
          clearInterval(myInterval);
          startTraining();
        }
      }

};

const newWorkout = () => {
    window.location.reload();
}