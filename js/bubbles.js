/* 
Файл скритпу, що генерує на сторінці анімований задній фон з бульбашок
кількість бульбашок залежить від розміру екрану і обраховується якожного разу, 
при зміні користувачем ширини екрану. 
Швидкість бульбашки залежіть від згенерованого в скрипті числа, що записується в неї як атрибут стилю
*/

const startScreenWidth = screen.width;

function generateBg() {
   const bg = document.querySelector(".bubbles");
   var deleted = bg.lastChild;
   while(deleted) {
      bg.removeChild(deleted);
      deleted = bg.lastChild;
   }
   var width = screen.width;
   // alert(width);
   var bubbleW = 20; 
   var prevK = 0;
   for(var i = 0; i < width/(bubbleW*3); i++) {
      const bubble = document.createElement("span");
      var k = Math.floor((Math.random()+1)*width/(bubbleW*3));
      while(Math.abs(k - prevK) < 5) {
         k = Math.floor((Math.random()+1)*width/(bubbleW*3));
      }
      prevK = k;
      bubble.setAttribute("style","--i:"+ prevK);
      bg.appendChild(bubble);
   }
}

generateBg();
window.addEventListener('resize',(event) => {
   generateBg();
})
