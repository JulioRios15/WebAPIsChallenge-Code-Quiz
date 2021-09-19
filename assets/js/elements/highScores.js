import {getHighScoreListUl, getHeader} from './elementsHelpers.js';

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
    labelEl.textContent = "Username";
    submitBtnEl.textContent = 'Submit';

    submitBtnEl.onclick = () => {
        submitCallback(inputEl.value, score);
    }

    inputEl.addEventListener('keyup', ()=> {
        if(event.keyCode === 13){
            event.preventDefault();
            submitBtnEl.click();
        }
    })


    //appending
    highScoreFormContainerEl.appendChild(h2El);
    highScoreFormContainerEl.appendChild(messageEl);
    highScoreFormContainerEl.appendChild(formContainerEl);

    formContainerEl.appendChild(labelEl);
    formContainerEl.appendChild(inputEl);
    formContainerEl.appendChild(submitBtnEl);

    childToAppend.appendChild(highScoreFormContainerEl);
}

const createHighScoreLis = () => {
    var liEls = [];
    const highScores = JSON.parse(localStorage.getItem('high-scores')); 
    const liID = "high-score-li";

    if(highScores){
        highScores.forEach(item => {
            var liEl = document.createElement('li');
            liEl.textContent = `${item.username} - ${item.score}`;
            liEl.id = liID;
    
            liEls.push(liEl);
        });
    }else{
        var liEl = document.createElement('li');
            liEl.textContent = "No high scores have been saved yet";
            liEl.id = liID;
            liEls.push(liEl);
    }



    return liEls;    
}

export const createHighScoreList = (childToAppend, goBackCallback, clearHighScoreCallback) => {
    
    //creating elements
    var highScoreListContainerEl = document.createElement('div');
    var highScoreListTitleEl = document.createElement('h2');
    var highScoreUlEl = document.createElement('ul');
    var highScoreLiEls = createHighScoreLis();
    var buttonsContainerEl = document.createElement('div');
    var goBackButton = document.createElement('button'); 
    var clearHighScoreButton = document.createElement('button'); 

    //IDs
    highScoreListContainerEl.id = "high-score-list-container";
    buttonsContainerEl.id = 'high-score-btn-container';
    highScoreUlEl.id = 'high-score-list-ul';

    //TextContent
    highScoreListTitleEl.textContent = "High Scores";
    goBackButton.textContent = "Go Back";
    clearHighScoreButton.textContent = "Clear High Scores";

    //Buttons on Click
    goBackButton.onclick = goBackCallback;
    clearHighScoreButton.onclick = clearHighScoreCallback;

    //appending
    highScoreListContainerEl.appendChild(highScoreListTitleEl);
    highScoreListContainerEl.appendChild(highScoreUlEl);

    highScoreLiEls.forEach((element) => {
        highScoreUlEl.appendChild(element);
    });

    highScoreListContainerEl.appendChild(buttonsContainerEl);
    buttonsContainerEl.appendChild(goBackButton);
    buttonsContainerEl.appendChild(clearHighScoreButton);

    childToAppend.appendChild(highScoreListContainerEl);
     
}

export const rerenderHighScoreList = () => {

    var ulEl = getHighScoreListUl();
    
    ulEl.innerHTML = "";

     var emptyListEl = document.createElement('li');
     emptyListEl.textContent = "Cleared";
     emptyListEl.setAttribute('style', "text-align: center;")

    ulEl.appendChild(emptyListEl);
}
