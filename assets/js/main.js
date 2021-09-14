import { startQuiz } from './quiz/quiz.js';
import { createQuizMenu, removeQuizMenu } from './elements/quizMenu.js';
import { createQuizHeader } from './elements/quizHeader.js';

var body = document.body;

var header = document.getElementById('header');
var content = document.getElementById('content');

createQuizHeader(header);
createQuizMenu(content, ()=> {
    // callback when start quiz button is clicked
    removeQuizMenu();
    startQuiz();
});







