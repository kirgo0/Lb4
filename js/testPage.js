var btns = document.querySelectorAll(".button-input");
const parent = document.querySelector(".question-area");
var currentQuestion = localStorage.getItem('currentQuestion') == null ? 0 : localStorage.getItem('currentQuestion');
var TOKEN = "1858844290:AAG4xVcUFcD6nNnKqz1biKvcGrhwNCsOHMk";
var CHAT_ID = "-519873227";

// клас для збереження питань, їх відповідей, обраних користувачем відповідей і типу запитання
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

    // метод для обирання користувачем питання
    SelectAnswer(k) {
        this.selectedAnswer = k;
    }
    // метод, що перевіряє, чи є питання тесту пройденим, 
    // якщо у тесті не обрано відповідей, повертається значення 0, 
    // якщо обрано хоча б одну відповідь з декількох можливих, повертається значення 1 (drag n drop)
    // якщо обрано всі можливі відповді повертається значення 1
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

    // функція перевіряє, чи є обрані користувачем відповіді правильними
    // обробка відповідей залежить від типу питання
    result() {
        if(this.type === "default") {
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
        } else {
            if(this.selectedAnswer === this.correctAnswer) {
                return 1;
            } else return 0;
        }
    }

}

// масив запитань, що генеруються під час проходження тесту
const questions = 
[new Question("What the box-sizing property does?",
["sets the width for the block",
"sets how the total width and height of an element is calculated",
"sets the width and height for the block",
"increases the size of the box depending on the parent"],
1,
"default"),
new Question("how is padding different from mardin?",
["padding adds indentation inside and margin inside",
"padding adds indents at the bottom of the block, and margins at the top and bottom","padding adds indents inside the block and margins outside the block","padding reduces the indent set by the margin"],
2,
"default"),
new Question("which parameters allow you to set the minimum width and height of the block?",
["width-min",
"width",
"min-witdh",
"min-height"],
[1,3],
"checkBox"),  
new Question("which parameter is responsible for block positioning on the z-axis?",
["index","zindex;","z-axis","z-index"],
3,"default"),
new Question("Fill in the missing cells so that the resulting code posits the inner elements in the middle from the bottom, stacking all the elements\n.container {\n display: &cell% flex-direction: &cell%  justify-content: &cell% align-items: &cell% }",
["column;","flex-end;","flex;","center;"],
["flex;","column;","center;","flex-end;"],
"dragAndDrop"),
new Question("Among the list, select the option that allows you to take the item out of the document flow",
["position: static;","position: relative;","position: top;","z-index: 4;","pos: absolute;","position: absolute;"],
"position: absolute;",
"dropDown"),
new Question("Which parameter allows you to center the block, if necessary",
["display: grid;",
"display: flex",
"display: ceneter;",
"position: absolute;"],
[0,1,3],
"checkBox"),  
new Question("arrange the properties of the block in such a way that it occupies the entire height and width of the screen, and the blocks inside it are positioned on the top\n.container {\n display: &cell% width: &cell%  height: &cell% justify-content: &cell% }",
["100vw;","flex;","100vh;","flex-start;"],
["flex;","100vw;","100vh;","flex-start;"],"dragAndDrop"),
new Question("Choose the right option to create the header so that it always stays at the top of the site when you scroll",
["header { position: relative; top: 0; }",
"header { position: absolute; bottom: 0; }","header { position: sticky; top: 0;}","header { display: flex; margin-top: 0; }"],
1,
"default"),
new Question("Adding which parameter allows you to remove an item from the document flow?",
["display: hidden",
"content: none","display: none","z-index: -1"],
2,
"default")
];

// метод, що відсортовує масив питань у випадковому порядку
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

shuffle(questions);

const countOfQuestions = questions.length;

// метод для генерації запитання на сторінці користувача
function GenerateQuestion() {
    parent.innerHTML = '';
    // перевірка лівої межі, якщо користувач знаходиться на другому або більше тесті,
    // в нього з'являється можливість повернутись назад, натиснувши на стрілочку вліво 
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

    // перевірка на перехід користувача з останнього запитання вперед
    // якщо користувач дійшов до останнього запитання він отримує можливість завершити тест
    if(currentQuestion == countOfQuestions) {
        GenerateTestConfirmMenu();
    } else {
        // вибір методу генерації запитання в залежності від його типу
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
    // перевірка правої межі, аналогічно до лівої межі
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


/* Далі описані такі методи як:
GenerateSimpleQuestion() - звичайне запитання (radio)
GenerateCheckBoxQuestion() - з використанням чекбоксів (checkBox)
GenrateDragNDropQuestion() - запитання з можливістю переміщення відповідей (Drag And Drop)
GenerateDropDownQuestion() - запитання з вибіром відповіді з випадаючого списку (Drop down menu)

Всі вони працюють аналогічно один одному, маючи лише різні способи генерації відповідей.
Для прикладу розглянему лише перший тип - звичайний
*/
function GenerateSimpleQuestion(q) {
    // Генерація батькіського блоку 
    const questionBlock = document.createElement("div");
    // Надання йому стильового класу "question-block"
    questionBlock.classList.add("question-block");
    // додання блоку, до головного блоку сторінки 
    parent.appendChild(questionBlock);

    // Генерація блоку, що відповідає за позіціонування елементів в середині блоку запитання
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    questionBlock.appendChild(wrapper);
    
    // Генерація блоку, що буде записувати в собі запитання 
    const qText = document.createElement("div");
    qText.classList.add("question-text");
    wrapper.appendChild(qText);

    // Генерація запитання 
    const qTextLabel = document.createElement("label");
    // Надання текстовому значенню блоку, значення з об'єкту запитання
    qTextLabel.textContent = q.text;
    qText.classList.add("question-text");
    qText.appendChild(qTextLabel);

    // Генерація блоку з відповіддями 
    const answers = document.createElement("div");
    answers.classList.add("question-answers");
    wrapper.appendChild(answers);

    // Масив для збереження відповідей, що дасть можливість генерувати відповіді у випадковому порядку
    var answersArr = [];

    // Генерація відповідей
    for(let i = 0; i < q.answers.length; i++) {
        var answer = document.createElement("input");
        answer.setAttribute("type","button");
        answer.classList.add("button-input");
        answer.classList.add("button-input-disabled");
        // Надання кожній з кнопок властивостей радіо, оскільки для покращення зовнішнього вигляду тесту, 
        // було використанно звичайні кнопки, а не input[type=radio], функціонал радіо був створений власноруч
        if(q.selectedAnswer > -1) {
            if(i == q.selectedAnswer) {
                answer.classList.remove("button-input-disabled");
            }
        }
        answer.value = q.answers[i];
        answer.onclick = function() {
            SelectAnswer(i);
        }
        // Додання відповіді в масив відповідей
        answersArr.push(answer);
    }

    // додання всіх відповідей на сторінку, для прикладу, всі відповіді додаються навпаки
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

    for(let i = answersArr.length-1; i >= 0; i--) {
        answers.appendChild(answersArr[i]);
    }

}

// Функціонал Drag And Drop запитань

// змінна, що зберігає поточну, обрану користувачем картку (блок drag and drop)
var card;

// функція для обробки події: початку взаємодії з drag and drop елементом  
const dragStart = function () {
    setTimeout(() => {
        this.classList.add('cell-hide');
        card = this;
    }, 0);
};

// функція для обробки події: закінчення взаємодії з drag and drop елементом  
const dragEnd = function () {
    this.classList.remove('cell-hide');
    card = null;
};

// функція для обробки події: винесення елементу drag and drop з клітинки, в якій він зберігався  
const dragOver = function (evt) {
    evt.preventDefault();
};

// функція для обробки події: внесення елементу drag and drop в нову клітинку
const dragEnter = function (evt) {
    evt.preventDefault();
    this.classList.add('cell-hovered');
}

// функція для обробки події: винесення елементу drag and drop з клітинки, в якій він зберігався  
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

    // генерація клітинок і запитань, які будуть заповнювати ці клітинки
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
    
    // генерація об'єктів відповідей, і надання кожному з них обробники подій початку і закінчення drag and drop 
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
    // надання всім згенерованим клітинкам оброників подій початку і закінчення drag and drop
    var cells = document.querySelectorAll(".answer-cell");
    cells.forEach(cell => {
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('dragenter', dragEnter);
        cell.addEventListener('dragleave', dragLeave);
        // Переіврка можливості обміну двох елементів місцями:
        // Якщо ми відпускаємо один елемент поверх іншого, відбувається обмін двох елементів
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

// Метод для генерації меню підтвердження завершення тесту
function GenerateTestConfirmMenu() {
    // змінна що відповідає за стан тесту, якщо хоч одине з завдань тетсу залишилось без відповіді змінна стає false 
    var isFinished = true;
    var completed = 0;
    // змінна, що надає колір кнопці в залежності від стану тесту
    var color = "#48dbfb";
    questions.forEach(question => {
        switch(question.completed()) {
            case 0: {
                // якщо користувач не обрав відповідть в одному з запитань, колір змінюється на червоний 
                isFinished = false;
                color = "#ff6b6b";
                break;
            } 
            case 1: {
                // якщо користувач не обрав завершив виконання drag and drop тесту, колір змінюється на жовтий 
                console.log("dgargdrop not full comp");
                color = "#feca57";
                break
            }
            case 2: {
                // якщо користувач обрав всі можливі варіанти відповідей, колір залишається синім (звичайне значення) 
                completed++;
                break;
            }
        }
    });
    
    const confirmBlock = document.createElement("div");
    confirmBlock.classList.add("confrim-test-block");
    parent.appendChild(confirmBlock);

    // Генерація блоку, що виводить інформацію про те, скільки запитань з загальгої кількості користувач завершив
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
    // три варіанти тексту, що отримає користувач, при незавершенні тесту, при неповному завершенні і при повному завершенні
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

    // створення кнопки завершення тесту
    var TestResult = 0;
    finishButton.onclick = (()=> {
        questions.forEach(q => {
            TestResult+=q.result();
        });
        localStorage.setItem("last-result",TestResult);
        // відправка даних про тест на поштову скриньку
        fetch('/results', {
            method: 'POST',
            body: JSON.stringify({
                name: localStorage.getItem("user-name"),
                surname: localStorage.getItem("user-surname"),
                group: localStorage.getItem("user-group"),
                points: TestResult
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // відправка даних в телеграм канал
        axios.post(`https://api.telegram.org/bot${ TOKEN }/sendMessage`,{
            chat_id: CHAT_ID,
            parse_mode: "html",
            text: `Hello ${localStorage.getItem("user-name")} ${localStorage.getItem("user-surname")} ${localStorage.getItem("user-group")},
You have just completed the test in web.quiz.com,
Your result is: ${TestResult}/10`
        });
        // виведення повідомлення користувачу, про те, що всі дані були успішно відправлені
        alert("Your test result was saved!");
        // переїід на сторінку перегляду результатів тесту
        window.document.location = './resultsPage.html';
    });
    finishButtonBlock.appendChild(finishButton);

    wrapper.appendChild(finishButtonBlock);
}

// функція для переходу на минуле питання тесту
function PrevQuestion() {
    // зменшує значення лічильнику для масиву запитань 
    currentQuestion--;  
    // генерація запитання з масиву  
    GenerateQuestion(questions[currentQuestion]);   
    // збереження номеру поточного запитання в локальному сховищі
    localStorage.setItem('currentQuestion',currentQuestion);
}

// функція для переходу на наступне питання тесту (аналогічно до минулого)
function NextQuestion() {
    currentQuestion++;
    GenerateQuestion(questions[currentQuestion]);
    localStorage.setItem('currentQuestion',currentQuestion);
}

// метод, що реалізує функціонал вибору відповіді Radio з використанням звичайних кнопок
function SelectAnswer(k) {
    // отримання масиву кнопок, доступних на сторінці
    btns = document.querySelectorAll(".button-input");
    const answer = questions[currentQuestion].selectedAnswer;
    if(answer != k) {
        // надання кожній з кнопок функціоналу вибору і відміни вибору, з використанням стилей 
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

// метод, що реалізує функціонал вибору відповіді CheckBox з використанням звичайних кнопок
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

// Виклик функції для початку роботи тесту
GenerateQuestion();