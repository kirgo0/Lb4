localStorage.removeItem("currentQuestion");

const SField = document.querySelector(".user-surname");
const NField = document.querySelector(".user-name");
const GField = document.querySelector(".user-group");
const RField = document.querySelector(".last-result");
const CField = document.querySelector(".count-of-tries");

SField.textContent = localStorage.getItem("user-surname");
NField.textContent = localStorage.getItem("user-name");
GField.textContent = localStorage.getItem("user-group");
CField.textContent = "Count of tries: " + localStorage.getItem("count-of-tries");


var lastTryPoints = Math.round(localStorage.getItem("last-result") * 10) / 10;;
RField.textContent = lastTryPoints;
var lastTryPerc = 100 / 4 * lastTryPoints;
document.querySelector(".pie").style.setProperty("--p", lastTryPerc);

var pieColor = "#48dbfb";

if(lastTryPerc < 25) {
   pieColor = "#ff6b6b";
} else if (lastTryPerc <= 50) {
   pieColor = "#feca57";
} else if (lastTryPerc <= 75) {
   pieColor = "#1dd1a1";
}

document.querySelector(".pie").style.setProperty("--c", pieColor);

const button = document.querySelector(".tryagain-button");
console.log(button)
button.onclick = (() => {
   var count = localStorage.getItem("count-of-tries");
   count++;
   localStorage.setItem("count-of-tries",count);
   window.document.location = './testPage.html';
});
// alert(localStorage.getItem("user-name"));
// alert(localStorage.getItem("user-surname"));
// alert(localStorage.getItem("user-group"));
// alert(localStorage.getItem("last-result"))