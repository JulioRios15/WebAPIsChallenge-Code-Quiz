const quizQuestions = [
    {
        question: "Which is the agency that promote safty in civil aeronautics?",
        answers: {
            a: "EASA",
            b: "FAA",
            c: "NASA",
            d: "NTSB",
        },
        correctAnswer: "b"
    },
    {
        question: "Who is the matufacturer of the A321 Aircraft?",
        answers: {
            a: "Boeing",
            b: "Mc Donald Doughlas",
            c: "Airbus",
            d: "Embraer",
        },
        correctAnswer: "c"
    },
    {
        question: "What does FAA stand for?",
        answers: {
            a: "Federal Avionics Administration",
            b: "Federal Aeronatics Administration",
            c: "Fedex Aircraft Administration",
            d: "Federal Aviation Administration",
        },
        correctAnswer: "d"
    },
    {
        question: "Altitude in aviation in measured in?",
        answers: {
            a: "Feet",
            b: "Meters",
            c: "Kilometers",
            d: "Centimeters",
        },
        correctAnswer: "a"
    },

]

export const getQuizQuestions = () => quizQuestions;

export const getQuestionAtIndex = (index) => quizQuestions[index];

export const getCorrectAnswerAtIndex = (index) => {
    const question = getQuestionAtIndex(index);

    switch (question.correctAnswer) {
        case 'a':
            return question.answers.a;    
        case 'b':
            return question.answers.b;    
        case 'c':
            return question.answers.c;    
        case 'd':
            return question.answers.d;    
    }

}