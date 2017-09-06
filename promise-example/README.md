## example on how promises work in JavaScript using Node JS CLI.


[index.js](https://github.com/suadhuskic/suadhuskic.github.io/blob/master/promise-example/index.js)

 ```js
 var readlineSync = require('readline-sync');

 const questions = [
   {
     string: "What is your name?",
     answer: "",
     required: true,
   },
   {
     string: "How old are you?",
     answer: "",
     required: true,
   },
   {
     string: "What is your favorite sport?",
     answer: "",
     required: false,
   }
 ];

 ///where promises come in.
 const AskQuestions = function(questions) {
   return new Promise(function(resolve, reject) {

     questions.forEach( (question, index, array) => {
       //format question to.
       let newQuestion = question.string;
       if(question.required) {
         newQuestion += "(required)";
       }
       //now ask user.
       let answer = readlineSync.question(newQuestion);

       //if its required and they didnt give us an answer; keep asking them.
       while(question.required && answer.length === 0) {
         answer = readlineSync.question(newQuestion);
       }
       //update our object.
       question['answer'] = answer;

       //if its the last index; resolve it.
       if(index === parseInt(array.length - 1, 10)) {
         resolve();
       }
     });
   })
 }

 //ONLY WHEN THE RESOLVE FUNCTION GETS CALLED ABOVE WILL THIS CODE GET CALLED.
 AskQuestions(questions).then(function() {
   console.log("=========================================================");
   console.log("Thank you for submitting your answers. Here they are: ");
   console.log("=========================================================");
   questions.map( (question) => {
     console.log(question.string + " - " +question.answer);
   })
 });
 ```
 ----

 - we ask the user each question. if the question is required; we keep asking the user until they give us an answer.

 Output:
 ```js
 suadhuskic (master *) promise-example $ node index.js
 What is your name?(required)
 What is your name?(required)
 What is your name?(required)suad
 How old are you?(required)
 How old are you?(required)
 How old are you?(required)27
 What is your favorite sport?
 =========================================================
 Thank you for submitting your answers. Here they are:
 =========================================================
 What is your name? - suad
 How old are you? - 27
 What is your favorite sport? -
 ```
