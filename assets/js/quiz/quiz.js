import { createQuizHeader } from '../elements/quizHeader.js';
import { createQuizMenu, removeQuizMenu } from '../elements/quizMenu.js';
import { createQuizQuestionWithChoices } from '../elements/quizContent.js';
import { getQuizQuestions, getQuestionAtIndex, getCorrectAnswerAtIndex} from '../quiz/quizData.js';



/*--------------------------------------Time Handling--------------------------------------------*/
let currentTime = 0;
const quizTime = 60;

export const getCurrentTime = () => currentTime;

const resetTime = () => currentTime = quizTime;

var timerIntervalId;

const updateTime = (qty = 1) => {
    
    const timeAfter = getCurrentTime() - qty;

    if(getCurrentTime() >= 1 && timeAfter > 0){
        currentTime = currentTime - qty;
    }else{
        currentTime = 0;
        handleTimerEnd();
    }

    updateTimerEl();
}

const updateTimerEl = () => {
    var timer = document.getElementById('timer');
    timer.textContent = `Time: ${getCurrentTime()}`;
}

const startTimer = () => {
    timerIntervalId = setInterval(() => {
        updateTime();
    }, 1000);
}

const clearTimer = ()=> {
    clearInterval(timerIntervalId);
    
}

const handleTimerEnd = () => {
    clearTimer();
}


/*------------------------------------Quiz Questions---------------------------------------------*/
const quizData = getQuizQuestions();
const numOfQuestions = quizData.length;
var questionIndex = 0;


const validateQuestion = (e) => {
    const choice = e.target.innerHTML;
    const correctAnswer = getCorrectAnswerAtIndex(questionIndex);

    (choice === correctAnswer)? handleCorrectAnswer() : handleIncorretAnswer();  
}

const handleCorrectAnswer = () => {
    nextQuestion();
}

const handleIncorretAnswer = () => {
    updateTime(10);
    nextQuestion();
}



const createQuizQuestion = () => {
    //get Current question
    const currentQuestion = getQuestionAtIndex(questionIndex);

    createQuizQuestionWithChoices(
        document.getElementById('content'),
        currentQuestion.question, 
        currentQuestion.answers, 
        validateQuestion
    );
}

const removeQuizQuestion = () => {
    const content = document.getElementById('content');
    const question = document.getElementById('quiz-question-container');

    content.removeChild(question);
}

const nextQuestion = () => {
    removeQuizQuestion();

    if(questionIndex < numOfQuestions -1) {
        questionIndex++;
        createQuizQuestion();

    }else{
        handleQuizEnd();
    }
}

// called when the last question is answered
const handleQuizEnd = () => {
    clearTimer();
}



/*------------------------------------Quiz Main--------------------------------------------------*/


const initialize = () => {
    resetTime();
    questionIndex = 0;
    updateTimerEl();
    createQuizQuestion();
}

// called when start quiz button is clicked
export const startQuiz = () => {
    const header = document.getElementById('header');
    initialize();
    startTimer();
}