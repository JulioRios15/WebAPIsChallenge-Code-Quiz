const createLiEls = (answersMap, answerCallback) => {
    var liEls = [];

    answersMap.forEach(item => {
        var liEl = document.createElement('li');
        liEl.textContent = item;
        liEl.id = 'question-li';
        liEl.onclick = answerCallback;

        liEls.push(liEl);
    });

    return liEls;    
}

export const createQuizQuestionWithChoices = (childToAppend,question, answers, answerCallback) => {
    //map the answers for looping
    const answersMap = new Map(Object.entries(answers));

    //create main elements
    var quizQuestionContainerEl = document.createElement('div');
    var questionEl = document.createElement('h2');
    var ulEl = document.createElement('ul');
    var answersLiEls = createLiEls(answersMap, answerCallback);


    //setting ids
    quizQuestionContainerEl.id = "quiz-question-container";

    //setting text context
    questionEl.textContent = question;

    //Appending elements
    quizQuestionContainerEl.appendChild(questionEl);
    quizQuestionContainerEl.appendChild(ulEl);
    answersLiEls.forEach(item => {
        ulEl.appendChild(item);
    });


    childToAppend.appendChild(quizQuestionContainerEl);  
}

export const createAnswerNotification = (chidToAppend, text, color) => {
    var answerNotificationContainerEl = document.createElement('div');
    var pEl = document.createElement('p');

    answerNotificationContainerEl.id = 'answer-notification';

    pEl.textContent = text;

    // answerNotificationContainerEl.setAttribute('style', `
    //     background-color: var(--success);
    // `);

    pEl.setAttribute('style', `
        font-size: 1.6rem;
        font-weight: 500;
        color: var(--${color});
    `);

    answerNotificationContainerEl.appendChild(pEl);
    chidToAppend.appendChild(answerNotificationContainerEl);
}
