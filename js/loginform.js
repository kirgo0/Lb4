// Отримання полів, в які користувач записує свої дані для початку тесту
const btn = document.querySelector(".formSubmit");
const FName = document.getElementById("name");
const FSurname = document.getElementById("surname");
const FGroup = document.getElementById("group");
const Fields = [FName,FSurname,FGroup];

/* Перевірка валідності форми:
в залежності від наповнення форми, колір кнопки старту змінюється,
якщо деякі поля не заповнені, кнопка має сірий колір і не є доступною,
якщо всі поля форми заповнені, але не відповідають формату, кнопка стає жовтою і все ще не є доступною,
відкривається кнопка лише коли всі поля заповнені правильно
*/
document.addEventListener('input', e => {
   if(checkFormValid()) {
      btn.disabled = false;
      // в 
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

// функція для перевірки форми на валідність
function checkFormValid() {
   for(let i = 0; i < Fields.length; i++) {
      var input = Fields[i];
      if(input.value == "") return false;
   }
   return true;
}

// функція для початку тесту
function startTest() {
   // збереження введених користувачем даних в локальному сховищі 
   localStorage.setItem("user-name",document.getElementById("name").value);
   localStorage.setItem("user-surname",document.getElementById("surname").value);
   localStorage.setItem("user-group",document.getElementById("group").value);
   localStorage.setItem("count-of-tries",1);
   localStorage.setItem("currentQuestion",0);
   // перехід на сторінку з тестом
   window.document.location = './testPage.html';
}

document.querySelector(".formSubmit").onclick = (() => {
   startTest();
});