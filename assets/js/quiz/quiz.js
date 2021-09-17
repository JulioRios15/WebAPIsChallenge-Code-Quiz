import { createQuizHeader } from '../elements/quizHeader.js';
import { createQuizMenu, removeQuizMenu } from '../elements/quizMenu.js';
import { createQuizQuestionWithChoices, createAnswerNotification } from '../elements/quizContent.js';
import { getQuizQuestions, getQuestionAtIndex, getCorrectAnswerAtIndex} from '../quiz/quizData.js';
import {createHighScoreForm, createHighScoreList} from '../elements/highScores.js';


/*--------------------------------------Time Handling--------------------------------------------*/
let currentTime = 0;
const quizTime = 5;

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
        handleQuizEnd();
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

//called when time reaches 0
const handleTimerEnd = () => {
    console.log('handle timer end');
    clearTimer();
}


/*------------------------------------Quiz Questions---------------------------------------------*/
const quizData = getQuizQuestions();
const numOfQuestions = quizData.length;
var questionIndex = 0;
var correctAnswers = 0;
var bCanAnswer = true;
var answerNotificationIntervalId;

const lastQuestion = () => (questionIndex === numOfQuestions -1) ? true : false

// called when user pressed any answer option
const validateQuestion = (e) => {
    if(!bCanAnswer) return;

    bCanAnswer = false;

    if(lastQuestion()) clearTimer();

    const choice = e.target.innerHTML;
    const correctAnswer = getCorrectAnswerAtIndex(questionIndex);
    (choice === correctAnswer)? handleCorrectAnswer() : handleIncorretAnswer();  
}

const handleCorrectAnswer = async () => {
    correctAnswers++;
    showAnswerNotification('Correct', 'success');
}

const handleIncorretAnswer = async () => {
    updateTime(10);
    showAnswerNotification('Wrong!', 'danger');
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

    if(questionIndex < numOfQuestions -1 && currentTime != 0) {
        questionIndex++;
        bCanAnswer = true;
        createQuizQuestion();

    }else{
        handleQuizEnd();
    }
}

const showAnswerNotification = (text, color) => {
    const content = document.getElementById('content');
    const question = document.getElementById('quiz-question-container');

    if (question) createAnswerNotification(content, text, color);

    answerNotificationIntervalId = setTimeout(()=> {
        removeAnswerNotification();
        nextQuestion();
    }, 600);
}

const removeAnswerNotification = () => {
    const content = document.getElementById('content');
    const answerNotification = document.getElementById('answer-notification');

    content.removeChild(answerNotification);
}

// called when the last question is answered
const handleQuizEnd = () => {
    clearTimer();
    removeQuizQuestion();
    showHighScoreForm(); 
}


/*------------------------------------High Scores-------------------------------------------------*/
//called on submit button pressed
const saveHighScore = (username, score) => {
    const records = getLocalStoredHighScores();
    const userRecord = {"username": username, "score": score};

    if(records != null){
        const newRecords = [...records, userRecord];
        localStorage.setItem('high-scores',JSON.stringify(newRecords));
    }else{
        localStorage.setItem('high-scores', JSON.stringify([userRecord]));
    }
    //remove HighScoreForm after saving
    removeHighScoreForm();
}

const clearHighScores = () => {

}

const getLocalStoredHighScores = () => {
    return JSON.parse(localStorage.getItem("high-scores"));
}

const showHighScoreForm = () => {
    createHighScoreForm(document.getElementById('content'), calculateScore(), saveHighScore);
}

const removeHighScoreForm = () => {
    const content = document.getElementById('content');
    const form = document.getElementById('high-score-form-container');

    content.removeChild(form);
}

const calculateScore  = () => {
    return currentTime * correctAnswers;
}




/*------------------------------------Quiz Main---------------------------------------------------*/


const initialize = () => {
    questionIndex = 0;
    correctAnswers = 0;

    resetTime();
    updateTimerEl();
    createQuizQuestion();
}

// called when start quiz button is clicked
export const startQuiz = () => {
    const header = document.getElementById('header');
    initialize();
    startTimer();
}

const restartQuiz = () => {
    location.reload();
}