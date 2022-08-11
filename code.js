//Global variables

// APIs
const baseURL = "https://jservice.kenzie.academy/api/clues";
const categoryURL = "https://jservice.kenzie.academy/api/categories";

// DOMs
const questionDiv = document.getElementById("question");
const textArea = document.getElementById("text");

const answerBtn = document.getElementById("answer");
const announcement = document.getElementById("announce");
const points = document.getElementById("score");


// Placeholders
let questionList = [];
let text = "";
let correctAnswer = "";
let score = 0;


// Gets random question and answers from questionList.
function getQuestion() {
    console.log(questionList);
    let rdmQuestionId = Math.floor(Math.random() * (questionList.length));
    console.log(`Random Question Id: ${rdmQuestionId}`);
    let question = questionList[rdmQuestionId].question;
    correctAnswer = questionList[rdmQuestionId].answer;
    console.log(`Question: ${question}`);
    console.log(`Answer: ${correctAnswer}`);
    questionDiv.innerHTML = question;
}


// Get all clues
function getClues() {
    fetch(baseURL)
        .then((response) => response.json())
        .then((data) => {
            let cluesData = data;
            // Gets random catagory ID
            let rdmId = Math.floor(Math.random() * (cluesData.clues.length))
            let categoryId = cluesData.clues[rdmId].category.id;
            //console.log(cluesData);
            //console.log(categoryId);


            const clueIdCategory = `https://jservice.kenzie.academy/api/clues?category=${categoryId}`
            // Adds list of question from a random catagory into questionList array.
            fetch(clueIdCategory)
                .then((response) => response.json())
                .then((data) => {
                    questionList = data.clues;
                    getQuestion();
                })
        });


}
getClues();

// Check answer
function answerCheck(userInput) {
    let = correctMessage = "Correct! You scored 1 point!";
    let incorrectMessage = "Game Over! Score set to 0.";

    //console.log(`User Anwser in answerCheck: ${userInput}`);
    //console.log(`Correct Anwser in answerCheck: ${correctAnswer}`);
    if(userInput.toLowerCase() === correctAnswer.toLowerCase()) {
        score++;
        //console.log(correctMessage);
        console.log(score);
        announcement.innerHTML = correctMessage;
    } else if(userInput.toLowerCase() !== correctAnswer.toLowerCase()) {
        score = 0;
        console.log(incorrectMessage);
        console.log(score);
        announcement.innerHTML = incorrectMessage;
    } else {
        let blankAnswer = "Please type answer.";
        announcement.innerHTML = blankAnswer;
    }
    points.innerHTML = `Score: ${score}`;
}

function scoreZero() {
    score = 0;
    points.innerHTML = `Score: ${score}`;
}
//Event listeners
answerBtn.addEventListener("click", function getValueInput() {
    
        let text = textArea.value;
        console.log(`User answer: ${text}`);
        //text = "";
        answerCheck(text);
        getQuestion();
});