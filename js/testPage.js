var btns = document.querySelectorAll(".button-input");
const parent = document.querySelector(".question-area");
var currentQuestion = localStorage.getItem('currentQuestion') == null ? 0 : localStorage.getItem('currentQuestion');
console.log(currentQuestion)

class Question {
    text;
    answers;
    correctAnswer;
    selectedAnswer;
    type;

    constructor(text, answers,correctAnswer,type) {
        this.text = text;
        this.answers = answers;
        this.type = type;
        this.correctAnswer = correctAnswer;
        if(type === "default") this.selectedAnswer = -1;
        else if(type === "dropDown") this.selectedAnswer = answers[0];
        else this.selectedAnswer = [];
    }

    SelectAnswer(k) {
        this.selectedAnswer = k;
    }
    
    completed() {
        if(this.selectedAnswer === -1 || this.selectedAnswer.length === 0) return 0;
        if(this.type == "dragAndDrop") {
            for(let i = 0; i < this.selectedAnswer.length; i++) {
                if(this.selectedAnswer[i] == null) return 1;
                if(this.selectedAnswer.length < this.answers.length) return 1;
            }
        }
        return 2;
    }

    result() {
        if(this.type === "default" || this.type === "dropDown") {
            if(this.answers[this.correctAnswer] == this.answers[this.selectedAnswer]) {
                return 1;
            } else return 0;
        } else if(this.type === "checkBox") {
            var res = 0;
            this.selectedAnswer.forEach(answerID => {
                if(this.correctAnswer.indexOf(answerID) > -1) res += 1/this.correctAnswer.length;
                else res -= 1/this.correctAnswer.length;
            });
            return res < 0 ? 0 : res; 
        } else if(this.type === "dragAndDrop") {
            var res = 0;
            for (let i = 0; i < this.correctAnswer.length; i++) {
                const answer = this.correctAnswer[i];
                if(answer === this.selectedAnswer[i]) {
                    res += 1/this.correctAnswer.length;
                }
            }
            return res;
        }
    }

}

const questions = 
[new Question("question1?",["answer1","answer2","answer3","answer4","answer5"],3,"default"),
// new Question("question2?",["answer2asdasdasd1","answer2","answer23"],3,"default"),
// new Question("question3?",["answer31","answer32"],3,"default"),
// new Question("question4?",["answer1","answer2","answer3","answer4"],3,"default"),
// new Question("question5?",["answer1","answer2","answer3","answer4","answer56"],3,"default"),
// new Question("question6?",["answer1","answer2","answer3","answer4"],3,"default"),
// new Question("question7?",["answer1","answer2","answer3","answer4"],3,"default"),
// new Question("question8?",["answer1","answer2","answer3","answer4"],3,"default"),
// new Question("question9?",["answer1","answer2","answer3","answer4"],3,"checkBox"),
new Question("question10?",["answer1","answer2","answer3","answer4"],[0,2,3],"checkBox"),
new Question("questioasdajshdkajshdlkjashdlkjashdn12?",
["flex;","column;","center;","flex-end;","asdasfdasfas","askdapsdhakjshlkajlkjashdlkjhda sdgasjdkhgajgdasjkdasgjhsdjhagdjhagsjdgh"],
"center;","dropDown"),
new Question(".container {\n display: &cell% flex-direction: &cell%  justify-content: &cell% align-items: &cell% }",
["flex;","column;","center;","flex-end;"],
["flex;","column;","center;","flex-end;"],"dragAndDrop")
];
// ];
const countOfQuestions = questions.length;

function GenerateQuestion() {
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

    if(currentQuestion == countOfQuestions) {
        GenerateTestConfirmMenu();
    } else {
        q = questions[currentQuestion];
        if(q.type === "default") {
            GenerateSimpleQuestion(q);
        } else if(q.type === "checkBox") {
            GenerateCheckBoxQuestion(q);
        } else if(q.type === "dragAndDrop") {
            GenrateDragNDropQuestion(q);
        } else if(q.type === "dropDown") {
            GenerateDropDownQuestion(q);
        }
    }    
    
    if(currentQuestion < countOfQuestions) {
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

    var answersArr = [];

    for(let i = 0; i < q.answers.length; i++) {
        var answer = document.createElement("input");
        answer.setAttribute("type","button");
        answer.classList.add("button-input");
        answer.classList.add("button-input-disabled");
        if(q.selectedAnswer > -1) {
            if(i == q.selectedAnswer) {
                answer.classList.remove("button-input-disabled");
            }
        }
        answer.value = q.answers[i];
        answer.onclick = function() {
            SelectAnswer(i);
        }
        answersArr.push(answer);
    }

    for(let i = answersArr.length-1; i >= 0; i--) {
        answers.appendChild(answersArr[i]);
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

    var answersArr = [];
    for(let i = 0; i < q.answers.length; i++) {
        var answerDiv = document.createElement("div");
        answerDiv.classList.add("checkbox-answer");

        var answer = document.createElement("input");
        answer.setAttribute("type","button");
        answer.setAttribute("id","checkBox" + i);
        answer.classList.add("checkbox-input");
        if(questions[currentQuestion].selectedAnswer.indexOf(i) != -1) {
            answer.classList.add("checkbox-input-selected");
        }
        
        answer.onclick = function() {
            SelectCheckBoxAnswer(i);
        }
        answerDiv.appendChild(answer);
        var inputLabel = document.createElement("label");
        inputLabel.textContent = q.answers[i];
        
        inputLabel.setAttribute("for","checkBox" + i);
        inputLabel.classList.add("checkBox-Label");
        answerDiv.appendChild(inputLabel); 
        
        answersArr.push(answerDiv);
    }

    // for(let i = 0; i < answersArr.length; i++) {
    //     answers.appendChild(answersArr[i]);
    // }

    for(let i = answersArr.length-1; i >= 0; i--) {
        answers.appendChild(answersArr[i]);
    }

}

var card;

const dragStart = function () {
    setTimeout(() => {
        this.classList.add('cell-hide');
        card = this;
    }, 0);
};

const dragEnd = function () {
    this.classList.remove('cell-hide');
    card = null;
};

const dragOver = function (evt) {
    evt.preventDefault();
};

const dragEnter = function (evt) {
    evt.preventDefault();
    this.classList.add('cell-hovered');
}

const dragLeave = function () {
    this.classList.remove('cell-hovered');
};

function GenrateDragNDropQuestion(q) {
    const questionBlock = document.createElement("div");
    questionBlock.classList.add("question-block");
    parent.appendChild(questionBlock);

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    questionBlock.appendChild(wrapper);

    const dragNdropQ = document.createElement("div");
    dragNdropQ.classList.add("dragndrop-question");
    wrapper.appendChild(dragNdropQ);

    var questionText = q.text.split("&cell%");
    console.log(questionText);  

    // generation question text and cells, cell in question marks as &cell%
    for(let i = 0; i < questionText.length; i++) {
        var text = questionText[i];
        var lastTextDiv;
        if(i === questionText.length-1) {
            const qRow = document.createElement("div");
            qRow.classList.add("dragndrop-question-text");
            dragNdropQ.appendChild(qRow);
            qRow.textContent = text;
        } else {
            if(text.includes("\n")) {
                var rows = text.split("\n");
                rows.forEach(row => {
                    const qRow = document.createElement("div");
                    qRow.classList.add("dragndrop-question-text");
                    qRow.textContent = row;
                    dragNdropQ.appendChild(qRow);
                    lastTextDiv = qRow;
                })
                const qCell = document.createElement("div");
                qCell.classList.add("answer-cell");
                qCell.classList.add("question-cell");
                lastTextDiv.appendChild(qCell);
            } else {
                const qRow = document.createElement("div");
                qRow.classList.add("dragndrop-question-text");
                dragNdropQ.appendChild(qRow);
                qRow.textContent = text;
                const qCell = document.createElement("div");
                qCell.classList.add("answer-cell");
                qCell.classList.add("question-cell");
                qRow.appendChild(qCell);
            }
        }
    }

    const dragNdropA = document.createElement("div");
    dragNdropA.classList.add("dragndrop-answers");
    wrapper.appendChild(dragNdropA);

    for(let i = 0; i < q.answers.length; i++) {
        const qCell = document.createElement("div");
        qCell.classList.add("answer-cell");
        dragNdropA.appendChild(qCell);
    }

    var qCells = document.querySelectorAll(".question-cell");
    var aCells = dragNdropA.querySelectorAll(".answer-cell");
    
    for(let i = 0; i < q.answers.length; i++) {
        var answer = document.createElement("input");
        answer.classList.add("dragndrop-answer");
        answer.setAttribute("draggable","true");
        answer.setAttribute("type","button");
        answer.value = q.answers[i];
        answer.addEventListener('dragstart', dragStart);
        answer.addEventListener('dragend', dragEnd);
        if(q.selectedAnswer.includes(answer.value)) {
            console.log(q.selectedAnswer.indexOf(answer.value))
            qCells[q.selectedAnswer.indexOf(answer.value)].append(answer);
        } else {
            aCells[i].appendChild(answer);
        }
    }

    var cells = document.querySelectorAll(".answer-cell");
    cells.forEach(cell => {
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('dragenter', dragEnter);
        cell.addEventListener('dragleave', dragLeave);
        cell.addEventListener('drop', () => {
            if(cell.firstChild) {
                var card2 = cell.firstChild;
                card.parentNode.append(card2);
                card.parentNode.classList.remove('cell-hovered');
            }
            cell.append(card);
            cell.classList.remove('cell-hovered');
            var qCells = document.querySelectorAll(".question-cell");
            var savedAnswers = [];
            for(let i = 0; i < qCells.length; i++) {
                if(qCells[i].firstChild) {
                    savedAnswers[i] = qCells[i].firstChild.value;
                }
            }
            q.selectedAnswer = savedAnswers;
            console.log("saved: " + q.selectedAnswer);
        });
    });
}

function GenerateDropDownQuestion(q) {
    const questionBlock = document.createElement("div");
    questionBlock.classList.add("question-block");
    parent.appendChild(questionBlock);

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    questionBlock.appendChild(wrapper);

    const dropdownQ = document.createElement("div");
    dropdownQ.classList.add("dropdown-question");
    dropdownQ.textContent = q.text;
    wrapper.appendChild(dropdownQ);
    
    const dropdownM = document.createElement("div");
    dropdownM.classList.add("dropdown-select-menu");
    wrapper.appendChild(dropdownM);
    
    const dropdownS = document.createElement("div");
    dropdownS.classList.add("dropdown-selected");
    dropdownM.appendChild(dropdownS);

    const selectedAnswer = document.createElement("input");
    selectedAnswer.classList.add("dropdown-answer");
    selectedAnswer.classList.add("dropdown-answer-selected");
    selectedAnswer.setAttribute("type","button");
    selectedAnswer.value = q.selectedAnswer;
    dropdownS.appendChild(selectedAnswer);

    const dropdownA = document.createElement("div");
    dropdownA.classList.add("dropdown-answers");
    dropdownA.classList.add("dropdown-hide");
    dropdownM.appendChild(dropdownA);

    q.answers.forEach(qAnswer => {
        if(qAnswer != selectedAnswer.value) {
            const answer = document.createElement("input");
            answer.classList.add("dropdown-answer");
            answer.setAttribute("type","button");
            answer.value = qAnswer;
            dropdownA.appendChild(answer);
        }
    });

    const dropmenu = document.querySelectorAll(".dropdown-answer");
    var maxWidth = 200;
    dropmenu.forEach(selectedElem => {
        selectedElem.onclick = function () {
            var selectedField = document.querySelector(".dropdown-selected");
            var unselectedElem = selectedField.firstElementChild;
            var answersField = document.querySelector(".dropdown-answers");
            
            if(selectedElem.classList.contains("dropdown-answer-selected")) {
                if(answersField.classList.contains("dropdown-hide")) {
                    answersField.classList.remove("dropdown-hide");
                } else {
                    answersField.classList.add("dropdown-hide");
                }
            }
            if(selectedElem != unselectedElem) {
                selectedElem.classList.add("dropdown-answer-selected");
                unselectedElem.classList.remove("dropdown-answer-selected");
                answersField.prepend(unselectedElem);
                selectedField.append(selectedElem);
                answersField.classList.add("dropdown-hide");
                q.selectedAnswer = selectedElem.value;
            }
        };
        if(selectedElem.getBoundingClientRect().width > maxWidth) {
            maxWidth = selectedElem.getBoundingClientRect().width;
        }
    });
    
}

function GenerateTestConfirmMenu() {
    var isFinished = true;
    var completed = 0;
    var color = "#48dbfb";
    questions.forEach(question => {
        switch(question.completed()) {
            case 0: {
                isFinished = false;
                color = "#ff6b6b";
                break;
            } 
            case 1: {
                console.log("dgargdrop not full comp");
                color = "#feca57";
                break
            }
            case 2: {
                completed++;
                break;
            }
        }
        if(question.completed() == 0) {
        }
    });
    
    const confirmBlock = document.createElement("div");
    confirmBlock.classList.add("confrim-test-block");
    parent.appendChild(confirmBlock);

    
    const testcounter = document.createElement("div");
    testcounter.classList.add("test-counter");
    testcounter.textContent = completed + "/" + countOfQuestions;
    testcounter.style.backgroundColor = color;
    confirmBlock.appendChild(testcounter);

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    confirmBlock.appendChild(wrapper);

    const text = document.createElement("div");
    text.classList.add("text-content");
    if(!isFinished) {
        text.textContent = "You will lose points if you do not choose an answer to all of the questions! You can go back or finish the test.";
    } else if(color === "#feca57") {
        text.textContent = "Looks like you forgot to finish the drag n drop test, if you do not select all the answers, you will lose points. You can go back or finish the test.";
    } else {
        text.textContent = "If you are sure of your answers, click on the finish button to see the result.";
    }
    wrapper.appendChild(text);


    const finishButtonBlock = document.createElement("div");
    finishButtonBlock.classList.add("finish-button-block");
    wrapper.appendChild(finishButtonBlock);

    const finishButton = document.createElement("input");
    finishButton.classList.add("finish-button");
    finishButton.value = "Finish the test";
    finishButton.setAttribute("type","button");
    finishButton.style.backgroundColor = color;

    var TestResult = 0;
    finishButton.onclick = (()=> {
        questions.forEach(q => {
            TestResult+=q.result();
        });
        localStorage.setItem("last-result",TestResult);
        window.document.location = './resultsPage.html';
    });
    finishButtonBlock.appendChild(finishButton);

    wrapper.appendChild(finishButtonBlock);
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
    const answer = questions[currentQuestion].selectedAnswer;
    if(answer != k) {
        for(let i = 0; i < btns.length; i++) {
            var btn = btns[i];
            if(questions[currentQuestion].answers[k] == btn.value) {
                btn.classList.remove("button-input-disabled");
            } else {
                btn.classList.add("button-input-disabled");
            }
        }
        questions[currentQuestion].selectedAnswer = k;
        return;
    } 
    questions[currentQuestion].selectedAnswer = -1;
    for(let i = 0; i < btns.length; i++) {
        btns[i].classList.add("button-input-disabled");
    }

}

function SelectCheckBoxAnswer(k) {
    btns = document.querySelectorAll(".checkbox-input");
    const answersArr = questions[currentQuestion].selectedAnswer;
    if(answersArr.indexOf(k) == -1) {
        answersArr.push(k);
        var labels = document.querySelectorAll(".checkBox-Label");
        for(let i = 0; i < labels.length; i++) {
            var label = labels[i];
            console.log(label.textContent);
            if(questions[currentQuestion].answers[k] == label.textContent) {
                console.log(answersArr[k] + " - " + label.textContent);
                btns[i].classList.add("checkbox-input-selected");
            }
        }
    } else {
        answersArr.splice(
            answersArr.indexOf(k),1);
        var labels = document.querySelectorAll(".checkBox-Label");
        for(let i = 0; i < labels.length; i++) {
            var label = labels[i];
            console.log(label.textContent);
            if(questions[currentQuestion].answers[k] == label.textContent) {
                console.log(answersArr[k] + " - " + label.textContent);
                btns[i].classList.remove("checkbox-input-selected");
            }
        }
    }
}

// GenrateDragNDropQuestion(questions[10]);
GenerateQuestion();
// GenerateDropDownQuestion();
// GenerateTestConfirmMenu();