localStorage.removeItem("currentQuestion");

// Отримання полів для наповнення їх даними з сторінки тесту і логіну 
const SField = document.querySelector(".user-surname");
const NField = document.querySelector(".user-name");
const GField = document.querySelector(".user-group");
const RField = document.querySelector(".last-result");
const CField = document.querySelector(".count-of-tries");

// Отимання даних з локального сховища
SField.textContent = localStorage.getItem("user-surname");
NField.textContent = localStorage.getItem("user-name");
GField.textContent = localStorage.getItem("user-group");
CField.textContent = "Count of tries: " + localStorage.getItem("count-of-tries");

// Перерахування і округлення результату тесту в балах і відсотках,
// для подальшого коректного відображення на сторінці
var lastTryPoints = Math.round(localStorage.getItem("last-result") * 10) / 10;
RField.textContent = lastTryPoints;
var lastTryPerc = 100 / 10 * lastTryPoints;
document.querySelector(".pie").style.setProperty("--p", lastTryPerc);

// обір кольору для кругової діаграми
var pieColor = "#48dbfb";

if(lastTryPerc < 25) {
   pieColor = "#ff6b6b";
} else if (lastTryPerc <= 50) {
   pieColor = "#feca57";
} else if (lastTryPerc <= 75) {
   pieColor = "#1dd1a1";
}

document.querySelector(".pie").style.setProperty("--c", pieColor);

// створення функціоналу для кнопки повторної спроби проходження тесту 
const button = document.querySelector(".tryagain-button");
console.log(button)
button.onclick = (() => {
   var count = localStorage.getItem("count-of-tries");
   count++;
   localStorage.setItem("count-of-tries",count);
   window.document.location = './testPage.html';
});