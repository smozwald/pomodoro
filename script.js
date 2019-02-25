"use strict";

//Create html for operations buttons
const operations = ["start", "pause", "reset", "switch"];
const operationDiv = document.getElementById("operations");
let operationSpan = [];
let btn;
let t;

for (let i = 0; i < operations.length; i++) {
    operationSpan[i] = document.createElement("span");
    operationSpan[i].classList.add("operation");
    btn = document.createElement("button");
    btn.classList.add("operator");
    btn.setAttribute("id", operations[i]);
    t = document.createTextNode(operations[i]);
    btn.appendChild(t);
    operationSpan[i].appendChild(btn);
    operationDiv.appendChild(operationSpan[i]);
}

//Define functions for start, pause, reset and switch timer.
const countdown = document.querySelector("#countdown");
const sessType = document.querySelector("#type");
const sessTime = document.querySelector("#session");
const breakTime = document.querySelector("#break");
let timer;
let timerRan = false;

//Start countdown
function startTimer() {
    timerRan = true;
    let timerVal = countdown.innerText.split(':');
    let mins = parseInt(timerVal[0]);
    let seconds = parseInt(timerVal[1]);
    timer = setInterval(function() {
        if (seconds == 0) {
            mins--;
            seconds = 59;
        } else {
            seconds--;
        }

    countdown.innerText = mins.toString() + ":" + seconds.toString();
    if (seconds == 0 & mins == 0) {
        switchTimer();
        clearInterval();
    }

    }, 1000);
}

//Pause timer.
function pauseTimer() {
    clearInterval(timer);
}

//Reset timer to current types beginning.
function resetTimer() {
    timerRan = false;
    clearInterval(timer);
    let txt = sessType.innerText;
    if (txt == "Session") {
        let minsNeeded = sessTime.querySelector(".length").innerText;
        countdown.innerText = minsNeeded + ":00";
    } else {
        let minsNeeded = breakTime.querySelector(".length").innerText;
        countdown.innerText = minsNeeded + ":00";
    }
}

//Reset timer to other types beginning.
function switchTimer() {
    timerRan = false;
    clearInterval(timer);
    let txt = sessType.innerText;
    if (txt == "Session") {
        sessType.innerText = "Break";
    } else {
        sessType.innerText = "Session";
    }
    resetTimer();
}

//Change time using + and - on modifier buttons.
//Listen for button presses for up and down class

const maxTime = 60;
const minTime = 1;
const modButtons = document.querySelectorAll(".up, .down");

//Inputs from button press listener, know which element to change and which way.
function timeChange(el, dir) {
    let child = el.querySelector(".length");
    let currNum = parseInt(child.innerHTML);
    if (dir == "up") {
        if ((currNum + 1) > maxTime) {
            currNum = maxTime;
        } else { 
            currNum++;
        }
    } else {
        if ((currNum - 1) < minTime) {
            currNum = minTime;
        } else { 
            currNum--;
        }
    }
    if (timerRan == false) {
        if (el.id == sessType.innerText.toLowerCase()) {
            countdown.innerText = currNum + ":00";
        }
    }
    child.innerHTML = currNum.toString();
}

for (let i = 0; i < modButtons.length; i++) {
    modButtons[i].addEventListener("click", function(e) {
        let dir = e.target.className;
        let el = e.target.parentNode.parentNode;
        timeChange(el, dir);
    });
}

//Listen for clicks on operation buttons

const opButtons = document.querySelectorAll(".operator")


for (let i = 0; i < opButtons.length; i++) {
    opButtons[i].addEventListener("click", function(e) {
        let btn = e.target.id;
        if (btn == "start") {
            startTimer();
        }else
        if (btn == "pause") {
            pauseTimer();
        }else
        if (btn == "reset") {
            resetTimer();
        }else
        if (btn == "switch") {
            switchTimer();
        }
    });
}