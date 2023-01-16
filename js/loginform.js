const btn = document.querySelector(".formSubmit");
const FName = document.getElementById("name");
const FSurname = document.getElementById("surname");
const FGroup = document.getElementById("group");
const Fields = [FName,FSurname,FGroup];


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
   localStorage.setItem("user-name",document.getElementById("name").value);
   localStorage.setItem("user-surname",document.getElementById("surname").value);
   localStorage.setItem("user-group",document.getElementById("group").value);
   localStorage.setItem("count-of-tries",1);
   localStorage.setItem("currentQuestion",0);
   window.document.location = './testPage.html';
}

document.querySelector(".formSubmit").onclick = (() => {
   startTest();
});