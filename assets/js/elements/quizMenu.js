export const createMenu = (startButtonCallback) => {
    //create main elements
    var divEl = document.createElement('div');
    var h1El = document.createElement("h1");
    var pEl = document. createElement("p");
    var btnEl = document.createElement("button");

    //Define text content
    h1El.textContent = "Coding Quiz Challenge";
    pEl.textContent = ` Try to answer the following aviation question within the time limit.
                        Keep in mind that the incorrect answer will penalize your score/time
                        by ten secconds.`;
    btnEl.textContent = "Start Quiz";

    //Styles
    divEl.setAttribute('style', `
    padding: 1rem;
    text-align: center;
    `);
    
    
    //Appending Elements
    divEl.appendChild(h1El);
    divEl.appendChild(h1El);
    divEl.appendChild(pEl);
    divEl.appendChild(btnEl);

    //binding
    btnEl.addEventListener("click", startButtonCallback);

    return divEl;
}