//Створення об’єкту «Користувач» з властивостями «Прізвище», «Ім’я»
let user = {
   name: "Ivan",
   surname: "Bobrovskiy"
}

console.log("2.3.1");
console.log(user);

//Створення об’єкту «Студент», що містить властивості
//«Спеціальність», «Група» і методи: додавання, змінення і видалення даних 

let student = {
   group: "TR-11",
   spicialize: "122",
   getGroup: function() {
      return this.group;
   },
   setGroup: function(value) {
      this.group = value;
   },
   removeGroup: function() {
      this.group = null;
   },
   getSpecialize: function() {
      return this.spicialize;
   },
   setSpecialize: function(value) {
      this.spicialize = value;
   },
   removeSpecialize: function() {
      this.specialize = null;
   }
}

// Зображення роботи методів створених об'єктів
console.log("2.3.2 - 2.3.3");
console.log(`GROUP: ${student.getGroup()} SPICIALIZE: ${student.getSpecialize()}`)
student.setGroup("TV-34");
student.setSpecialize("121");
console.log(`GROUP: ${student.getGroup()} SPICIALIZE: ${student.getSpecialize()}`)
student.removeGroup();
console.log(`GROUP: ${student.getGroup()} SPICIALIZE: ${student.getSpecialize()}`)
student.setGroup("TV-31");
console.log(`GROUP: ${student.getGroup()} SPICIALIZE: ${student.getSpecialize()}`)

// Додавання в прототип об’єкту «Студент» методу «Показати дані»
console.log("2.3.4");
student.getInfo = function (){
   return `GROUP: ${student.getGroup()} SPICIALIZE: ${student.getSpecialize()}`;
}
console.log(student.getInfo());

//Створення об’єкту «Успішність», що наслідує властивості і методи об’єкту «Студент» і має додаткові властивості 
//«Тест», «Спроба», «Бали» і метод «Розрахунок середнього балу» (за декілька спроб). 
let success = {
   test: "Math",
   tries: 3,
   marks: [6,8,13],
   countAverrageMark: function() {
      if(this.marks.length > 1) {
         let sum = 0;
         this.marks.forEach(mark => {
            sum+=mark;
         });
         sum/=this.marks.length;
         return sum;
      }
   },
   __proto__: student
};


// Зображення роботи з об'єктом «Успішність»
console.log("2.3.5");   
console.log(success);
success.setGroup("TR-11");
console.log(success.getGroup());

// Перевизначення роботи методу getInfo
success.getInfo = function () {
   return `GROUP: ${success.getGroup()} SPICIALIZE: ${success.getSpecialize()} TEST: ${success.test} TRIES: ${success.tries} MARKS: ${success.marks}`;
}
console.log(success.getInfo());

// повторення створених вище об'єктів в класах

// Клас користувача
class User {
   constructor(name,surname) {
      this.name = name;
      this.surname = surname;
   }

   getName() {
      return this.name; 
   }
   
   getSurName() {
      return this.surname; 
   }

   setName(value) {
      this.name = value;
   }
   
   setSurName(value) {
      this.name = value;
   }
}

// Клас студенту
class Student {
   constructor(group, special) {
      this.group = group;
      this.special = special;
   }

   getGroup() {
      return this.group;
   }

   setGroup(value) {
      this.group = value;
   }

   removeGroup() {
      this.group = null;
   }

   getScpecial() {
      return this.scpecial;
   }

   setScpecial(value) {
      this.scpecial = value;
   }

   removeScpecial() {
      this.scpecial = null;
   }
}

// Створення нового екзмепляру класу User
var ivan = new User("Ivan","Bobrovskiy");
console.log(`NAME: ${ivan.name } SURNAME: ${ivan.surname }`);

// Створення нового екзмепляру класу Student
var stepa = new Student("Stepan","Antonov","EP99","178");

// Додавання в прототип об’єкту «Студент» метод «Показати дані»
Student.prototype.getInfo = function() {
   return `NAME: ${this.name } SURNAME: ${this.surname } GROUP: ${this.group } SPECIAL: ${this.special }`
}

console.log(stepa.getInfo());

// Створення класу «Успішність», що наслідує клас Student
class Success extends Student {
   
   constructor(group, special,test,tries,marks) {
      super(group,special);
      this.test = test; 
      this.tries = tries; 
      this.marks = marks; 
   }

   setTest (test) {
      this.test = test; 
   } 

   setTries(value) { 
      this.tries = value; 
   } 
   
   setMarks (value) { 
      this.marks = value; 
   } 
   
   getTest() { 
      return this.test;
   } 
   
   getTries () { 
      return this.tries; 
   } 
   
   getMarks () { 
      return this.marks; 
   } 

   countAverrageMark () {
      if(this.marks.length > 1) {
         let sum = 0;
         this.marks.forEach(mark => {
            sum+=mark;
         });
         sum/=this.marks.length;
         return sum;
      }
   }

   // Перезапис методу виводу інформації про об'єкт класу 
   getInfo = function() {
      return `NAME: ${this.name } SURNAME: ${this.surname } GROUP: ${this.group } SPECIAL: ${this.special }`
   }
}

// Створення нового обєкту класу Success
let kirill = new Success("TR-11","122","WEB",2,[15,16,15]);

console.log("2.3.6");
console.log(kirill.countAverrageMark());