var btns = document.querySelectorAll(".button-input");
const parent = document.querySelector(".question-area");
var currentQuestion = localStorage.getItem('currentQuestion') == null ? 0 : localStorage.getItem('currentQuestion');

class Question {
    text;
    answers;
    correctAnswer;
    selectedAnswer = -1;
    type;

    constructor(text, answers,correctAnswer,type) {
        this.text = text;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.type = type;
    }

    SelectAnswer(k) {
        this.selectedAnswer = k;
    }
    
}

const questions = 
[new Question("question1?",["answer1","answer2","answer3","answer4","answer5"],3,"default"),
new Question("question2?",["answer2asdasdasd1","answer2","answer23"],3,"default"),
new Question("question3?",["answer31","answer32"],3,"default"),
new Question("question4?",["answer1","answer2","answer3","answer4"],3,"default"),
new Question("question5?",["answer1","answer2","answer3","answer4","answer56"],3,"default"),
new Question("question6?",["answer1","answer2","answer3","answer4"],3,"default"),
new Question("question7?",["answer1","answer2","answer3","answer4"],3,"default"),
new Question("question8?",["answer1","answer2","answer3","answer4"],3,"default"),
new Question("question9?",["answer1","answer2","answer3","answer4"],3,"checkBox"),
new Question("question10?",["answer1","answer2","answer3","answer4"],3,"checkBox")];
const countOfQuestions = questions.length;

function GenerateQuestion(q) {
    parent.innerHTML = '';
    if(currentQuestion != 0) {
        const leftArrow = document.createElement("button");
        leftArrow.classList.add("arrow");
        leftArrow.classList.add("left-arrow");
        leftArrow.textContent = "<";
        leftArrow.onclick = function() {
            PrevQuestion();
        }
        parent.appendChild(leftArrow);
    }

    if(q.type === "default") {
        GenerateSimpleQuestion(q);
    } else {
        GenerateCheckBoxQuestion(q);
    }
    
    if(currentQuestion != 9) {
        const rightArrow = document.createElement("button");
        rightArrow.classList.add("arrow");
        rightArrow.classList.add("right-arrow");
        rightArrow.textContent = ">";
        rightArrow.onclick = function() {
            NextQuestion();
        }
        parent.appendChild(rightArrow);
    }
}

function GenerateSimpleQuestion(q) {
    const questionBlock = document.createElement("div");
    questionBlock.classList.add("question-block");
    parent.appendChild(questionBlock);

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    questionBlock.appendChild(wrapper);
    
    const qText = document.createElement("div");
    wrapper.classList.add("question-text");
    wrapper.appendChild(qText);

    const qTextLabel = document.createElement("label");
    qTextLabel.textContent = q.text;
    qText.classList.add("question-text");
    qText.appendChild(qTextLabel);

    const answers = document.createElement("div");
    answers.classList.add("question-answers");
    wrapper.appendChild(answers);

    for(let i = 0; i < q.answers.length; i++) {
        var answer = document.createElement("input");
        answer.setAttribute("type","button");
        answer.classList.add("button-input");
        answer.value = q.answers[i];
        answer.onclick = function() {
            SelectAnswer(i);
        }
        answers.appendChild(answer);
    }

    if(q.selectedAnswer > -1) {
        btns = document.querySelectorAll(".button-input");
        var k = q.selectedAnswer;
        for(let i = 0; i < btns.length; i++) {
            if(i != k) {
                btns[i].classList.add("button-input-disabled");
            } else {
                questions[currentQuestion].selectedAnswer = k;
                btns[i].classList.remove("button-input-disabled");
            }
            console.log(i);
        }
    }
}

function GenerateCheckBoxQuestion(q) {
    const questionBlock = document.createElement("div");
    questionBlock.classList.add("question-block");
    parent.appendChild(questionBlock);

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    questionBlock.appendChild(wrapper);
    
    const qText = document.createElement("div");
    wrapper.classList.add("question-text");
    wrapper.appendChild(qText);

    const qTextLabel = document.createElement("label");
    qTextLabel.textContent = q.text;
    qText.classList.add("question-text");
    qText.appendChild(qTextLabel);

    const answers = document.createElement("div");
    answers.classList.add("checkbox-answers");
    wrapper.appendChild(answers);

    for(let i = 0; i < q.answers.length; i++) {
        var answerDiv = document.createElement("div");
        answerDiv.classList.add("checkbox-answer");
        answers.appendChild(answerDiv);

        var answer = document.createElement("input");
        answer.setAttribute("type","button");
        answer.setAttribute("id","checkBox" + i);
        answer.classList.add("checkbox-input");
        answerDiv.appendChild(answer);

        var inputLabel = document.createElement("label");
        inputLabel.textContent = q.answers[i];
        inputLabel.setAttribute("for","checkBox" + i);
        answerDiv.appendChild(inputLabel);
    
        answer.onclick = function() {
            SelectCheckBoxAnswer(i);
        }
    }

    // if(q.selectedAnswer > -1) {
    //     btns = document.querySelectorAll(".button-input");
    //     var k = q.selectedAnswer;
    //     for(let i = 0; i < btns.length; i++) {
    //         if(i != k) {
    //             btns[i].classList.add("button-input-disabled");
    //         } else {
    //             questions[currentQuestion].selectedAnswer = k;
    //             btns[i].classList.remove("button-input-disabled");
    //         }
    //         console.log(i);
    //     }
    // }
}

function PrevQuestion() {
    currentQuestion--;    
    GenerateQuestion(questions[currentQuestion]);   
    localStorage.setItem('currentQuestion',currentQuestion);
}

function NextQuestion() {
    currentQuestion++;
    GenerateQuestion(questions[currentQuestion]);
    localStorage.setItem('currentQuestion',currentQuestion);
}

function SelectAnswer(k) {
    btns = document.querySelectorAll(".button-input");
    if(questions[currentQuestion].selectedAnswer == k) {
        for(let j = 0; j < btns.length; j++) {
            btns[j].classList.remove("button-input-disabled");
        }
        questions[currentQuestion].selectedAnswer = -1;
        return;
    }
    for(let i = 0; i < btns.length; i++) {
        if(i != k) {
            btns[i].classList.add("button-input-disabled");
        } else {
            questions[currentQuestion].selectedAnswer = k;
            localStorage.setItem('questions',questions);
            btns[i].classList.remove("button-input-disabled");
        }
        console.log(i);
    }
}

function SelectCheckBoxAnswer(k) {
    btns = document.querySelectorAll(".checkbox-input");
    if(questions[currentQuestion].selectedAnswer.indexOf(k) != -1) {
        for(let j = 0; j < btns.length; j++) {
            btns[j].classList.remove("checkbox-input-selected");
        }
        questions[currentQuestion].selectedAnswer.remove(k);
        return;
    }
    for(let i = 0; i < btns.length; i++) {
        if(questions[currentQuestion].selectedAnswer.indexOf(i) == -1) {
            btns[i].classList.add("checkbox-input-selected");
        } else {
            questions[currentQuestion].selectedAnswer.add(k);
            localStorage.setItem('questions',questions);
            btns[i].classList.remove("checkbox-input-selected");
        }
        console.log(i);
    }
}


GenerateQuestion(questions[currentQuestion]);