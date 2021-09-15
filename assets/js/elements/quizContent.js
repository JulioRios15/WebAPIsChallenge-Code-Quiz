const createLiEls = (answersMap, answerCallback) => {
    var liEls = [];

    answersMap.forEach(item => {
        var liEl = document.createElement('li');
        liEl.textContent = item;
        liEl.onclick = answerCallback;

        liEls.push(liEl);
    });

    return liEls;    
}

export const createQuizQuestionWithChoices = (childToAppend,question, answers, answerCallback) => {
    //map the answers for looping
    const answersMap = new Map(Object.entries(answers));

    //create main elements
    var quizQuestionContainer = document.createElement('div');
    var questionEl = document.createElement('p');
    var ulEl = document.createElement('ul');
    var answersLiEls = createLiEls(answersMap, answerCallback);


    //setting ids
    quizQuestionContainer.id = "quiz-question-container";

    //setting text context
    questionEl.textContent = question;

    //Styles

    //Appending elements
    quizQuestionContainer.appendChild(questionEl);
    quizQuestionContainer.appendChild(ulEl);
    answersLiEls.forEach(item => {
        ulEl.appendChild(item);
    });


    childToAppend.appendChild(quizQuestionContainer);  
}
