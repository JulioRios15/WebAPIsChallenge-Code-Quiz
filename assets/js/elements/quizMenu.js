export const createQuizMenu = (childToAppend, startButtonCallback) => {
    //create main elements
    var quizMenuContainerEl = document.createElement('div');
    var h1El = document.createElement("h1");
    var pEl = document. createElement("p");
    var btnEl = document.createElement("button");

    //asign id to QuizMenu
    quizMenuContainerEl.id = "quiz-menu";

    //Define text content
    h1El.textContent = "Coding Quiz Challenge";
    pEl.textContent = ` Try to answer the following aviation question within the time limit.
                        Keep in mind that the incorrect answer will penalize your score/time
                        by ten secconds.`;
    btnEl.textContent = "Start Quiz";

    //Styles
    quizMenuContainerEl.setAttribute('style', `
    padding: 1rem;
    text-align: center;
    `);
    
    
    //Appending Elements
    quizMenuContainerEl.appendChild(h1El);
    quizMenuContainerEl.appendChild(h1El);
    quizMenuContainerEl.appendChild(pEl);
    quizMenuContainerEl.appendChild(btnEl);

    //binding
    btnEl.addEventListener("click", startButtonCallback);

    //
    childToAppend.appendChild(quizMenuContainerEl);
}

export const removeQuizMenu = () => {
    const content = document.getElementById('content');
    const quizMenu = document.getElementById("quiz-menu");

    content.removeChild(quizMenu);
}