export const createHighScoreForm = (childToAppend, score, submitCallback) => {
    var highScoreFormContainerEl = document.createElement('div');
    var h2El = document.createElement('h2');
    var messageEl = document.createElement('p');
    var formContainerEl = document.createElement('div');
    var labelEl = document.createElement('label');
    var inputEl = document.createElement('input');
    var submitBtnEl = document.createElement('button');

    highScoreFormContainerEl.id = "high-score-form-container";
    formContainerEl.id = 'form-container';

    h2El.textContent = 'All Done!';
    messageEl.textContent = `your final score is ${score}`;
    labelEl.textContent = "username: ";
    submitBtnEl.textContent = 'Submit';

    submitBtnEl.onclick = () => {
        submitCallback(inputEl.value, score);
    }


    //appending
    highScoreFormContainerEl.appendChild(h2El);
    highScoreFormContainerEl.appendChild(messageEl);
    highScoreFormContainerEl.appendChild(formContainerEl);

    formContainerEl.appendChild(labelEl);
    formContainerEl.appendChild(inputEl);
    formContainerEl.appendChild(submitBtnEl);

    childToAppend.appendChild(highScoreFormContainerEl);
}

export const createHighScoreList = () => {
    
}