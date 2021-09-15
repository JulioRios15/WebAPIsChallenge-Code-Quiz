import { getCurrentTime } from "../quiz/quiz.js";

export const createQuizHeader = (childToAppend)=> {
    //create main elements
    var quizHeaderContainerEl = document.createElement('div');  
    var highScoreEl = document.createElement('p');
    var timerEl = document.createElement('p');
    
    //set quiz header id
    quizHeaderContainerEl.id = "quiz-header";
    highScoreEl.id = "view-high-score";
    timerEl.id = "timer";

    //set elemetn text context
    highScoreEl.textContent = "View High Scores";
    timerEl.textContent = `Time: ${getCurrentTime()}`;

    //appending elements
    quizHeaderContainerEl.appendChild(highScoreEl);
    quizHeaderContainerEl.appendChild(timerEl);

    childToAppend.appendChild(quizHeaderContainerEl);

    //styles
    // quizHeaderContainerEl.setAttribute('style', `
    //     display: flex;
    //     justify-content: space-between;
    //     align-items: center;
    //     width: 100%;
    //     padding: 1rem;
    // `);

    // highScoreEl.setAttribute('style', `
    //     color: purple; 
    //     padding: .5rem;
    // `);

    // timerEl.setAttribute('style', `
    //     padding: .5rem;
    // `);


}