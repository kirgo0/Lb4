const startScreenWidth = screen.width;
const btn = document.querySelector(".formSubmit");
const FName = document.getElementById("name");
const FSurname = document.getElementById("surname");
const FGroup = document.getElementById("group");
const Fields = [FName,FSurname,FGroup];

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

document.addEventListener('input', e => {
   if(checkFormValid()) {
      btn.disabled = false;
      for(let i = 0; i < Fields.length; i++) {
         var input = Fields[i];
         if(!input.checkValidity()) {
            btn.classList.add("orange-button");
            btn.disabled = true;
            return;
         }
         btn.classList.remove("orange-button");
      }
   }
   else {
      btn.disabled = true;
      btn.classList.remove("orange-button");
   }
 })

function checkFormValid() {
   for(let i = 0; i < Fields.length; i++) {
      var input = Fields[i];
      if(input.value == "") return false;
   }
   return true;
}

function startTest() {
   Fname.value,
        url = 'http://path_to_your_html_files/next.html?name=' + encodeURIComponent(b);

    document.location.href = url;
}

generateBg();
window.addEventListener('resize',(event) => {
   generateBg();
})