import {createMenu} from './elements/quizMenu.js';

var body = document.body;

var header = document.getElementById('header');
var content = document.getElementById('content');


var quizMenu = createMenu(function(){
    //TODO: Start Quiz
});

content.appendChild(quizMenu);






