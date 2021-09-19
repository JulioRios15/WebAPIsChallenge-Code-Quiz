import { createQuizHeader } from '../elements/quizHeader.js';
import { createQuizMenu, removeQuizMenu } from '../elements/quizMenu.js';
import { createQuizQuestionWithChoices, createAnswerNotification } from '../elements/quizContent.js';
import { getQuizQuestions, getQuestionAtIndex, getCorrectAnswerAtIndex} from '../quiz/quizData.js';
import {createHighScoreForm, createHighScoreList, rerenderHighScoreList} from '../elements/highScores.js';

import {
    getContent,
    getHeader,
    getHighScoreForm,
    getHighScoreList,
    getQuizQuestion,
    getAnswerNotification,
    getQuizMenu,
    getQuizHeader
} from '../elements/elementsHelpers.js';


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
var bquizEnded = false;
var bHighScoreDisplayed = false;
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
        getContent(),
        currentQuestion.question, 
        currentQuestion.answers, 
        validateQuestion
    );
}

const removeQuizQuestion = () => {
    const content = getContent();
    const question = getQuizQuestion();

    if(content && question) {
        content.removeChild(question);   
    };    
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
    const content = getContent();
    const question = getQuizQuestion();

    if (question && content) createAnswerNotification(content, text, color);

    answerNotificationIntervalId = setTimeout(()=> {
        removeAnswerNotification();
        nextQuestion();
    }, 600);
}

const removeAnswerNotification = () => {
    const content = getContent();
    const answerNotification = getAnswerNotification();

    if(content && answerNotification){
        content.removeChild(answerNotification);
    }    
}

// called when the last question is answered
const handleQuizEnd = () => {
    if(!bquizEnded){
        clearTimer();
        removeQuizQuestion();
        showHighScoreForm(); 
    }
    bquizEnded = true;
}


/*------------------------------------High Scores-------------------------------------------------*/
//called on submit button pressed
const saveHighScore = (username, score) => {

    const records = getLocalStoredHighScores();
    const userRecord = {"username": username, "score": score};

    if(userRecord.username === ""){
        alert("please enter a username!");
        return;
    }

    if(records != null){
        const newRecords = [...records, userRecord];
        const sortedRecords = sortHighScores(newRecords);
        localStorage.setItem('high-scores',JSON.stringify(sortedRecords));
    }else{
        localStorage.setItem('high-scores', JSON.stringify([userRecord]));
    }
    //remove HighScoreForm after saving
    removeHighScoreForm();
    ShowHighScoreList();
}

const sortHighScores = (values) => {
    return values.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
}

const clearHighScores = () => {
    clearLocalStoredHighScores();
    rerenderHighScoreList();  
}

const clearLocalStoredHighScores = () => {
    localStorage.removeItem('high-scores');
}

const getLocalStoredHighScores = () => {
    return JSON.parse(localStorage.getItem("high-scores"));
}

const showHighScoreForm = () => {
    createHighScoreForm(getContent(), calculateScore(), saveHighScore);
}

const removeHighScoreForm = () => {
    const content = getContent();
    const form = getHighScoreForm();

    if(content && form){
        content.removeChild(form);
    }   
}

const ShowHighScoreList = () => {
    if(bHighScoreDisplayed || !bquizEnded) return;

    createHighScoreList(getContent(),restartQuiz ,clearHighScores);

    bHighScoreDisplayed = true;
}

const removeHighScoreList = () => {
    const content = getContent();
    const list = getHighScoreList();

    if(content && list){
        content.removeChild(list);
    }  
}

const calculateScore  = () => {
    return currentTime * correctAnswers;
}




/*------------------------------------Quiz Main---------------------------------------------------*/


export const initialize = () => {
    questionIndex = 0;
    correctAnswers = 0;
    currentTime = 0;
    bCanAnswer = true;
    bquizEnded = true;
    bHighScoreDisplayed = false;

    removeAllWidgets();
    createQuizHeader(getHeader(), ShowHighScoreList);//temp remove all widgets, show high score
    createQuizMenu(getContent(), startQuiz);
}

// called when start quiz button is clicked
export const startQuiz = () => {
    if(bHighScoreDisplayed){
        removeHighScoreList();
    }
    bquizEnded = false;
    removeQuizMenu();
    startTimer();
    resetTime();
    updateTimerEl();
    createQuizQuestion();

    setInterval(()=>{
        console.log(`quiz ended: ${bquizEnded}`);
    },100);

}


const removeAllWidgets = () => {
    const content = getContent();
    const header = getHeader();

     content.innerHTML = "";
     header.innerHTML = "";
}

const restartQuiz = () => {
    //location.reload();
    initialize();
}