import { createQuizHeader } from '../elements/quizHeader.js';
import { createQuizMenu, removeQuizMenu } from '../elements/quizMenu.js'

let currentTime = 0;
const quizTime = 60;

export const getCurrentTime = () => currentTime;

const resetTime = () => currentTime = quizTime;

const updateTime = () => {
    if(getCurrentTime() >= 1){
        currentTime--;
    }
    if(getCurrentTime() <= 0){
        handleTimerEnd();
    }
}

const updateTimerEl = () => {
    var timer = document.getElementById('timer');
    timer.textContent = `Time: ${getCurrentTime()}`;
}

const startTimer = () => {
    setInterval(() => {
        updateTime();
        updateTimerEl();
    }, 1000);
}

const handleTimerEnd = () => {

}

const initialize = () => {
    resetTime();
    updateTimerEl();
}

// called when start quiz button is clicked
export const startQuiz = () => {
    const header = document.getElementById('header');
    initialize();
    startTimer();
}