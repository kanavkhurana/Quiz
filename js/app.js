/* 
What is the difference between 
var myObject = function(){
    
}

and 

function myObject(){
    
}

while declaring objects?

*/

/*
var questionsArray = 
[{"question": "What is the capital of Denmark", 
"anwer" : "Copenhagen"},
.....
];

function Capital(question, answer){
    this.question = question;
    this.answer = answer;
}
/*
Iulia - What is a pull request?

*/
/*
Could we have used some methods as part of the object, currently only using properties?
*/
var capitalArray = [{
    "question": "What is the Capital of India?",
    "answer": ["New Delhi", "Delhi"]
}, {
    "question": "What is the Capital of Germany?",
    "answer": ["Berlin"]
}, {
    "question": "What is the Capital of Italy?",
    "answer": ["Rome"]
}, {
    "question": "What is the Capital of Czech Republic?",
    "answer": ["Prague"]
}, {
    "question": "What is the Capital of New Zealand?",
    "answer": ["Auckland"]
}];

//Pointer to the current question
var currentQuestion = 0;

var marksPerQuestion = 10;

//var questionsAnsweredCorrectly = [];
//var questionsAnsweredIncorrectly = [];

$(document).ready(function() {

    //alert('Whats up!');
    capitalArray = randomizeQuestionOrder(capitalArray);

    //Add a 'serial number' property to the capitalArray object
    $.each(capitalArray, function(index, value) {
        value["sNo"] = index + 1;
    });

    //Verify that the order is correct
    //console.log(JSON.stringify(capitalArray));


    //Display the first question
    //$('.question').html('Question '+ (currentQuestion+1) + ': ' + capitalArray[currentQuestion]["question"]);
    displayQuestion(0);

    //Attach a click handler to the 'Go' button
    //Need to unbind before binding?
    $('.submitQuestion').click(processAnswer);

});

function randomizeQuestionOrder(o) {

    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function processAnswer() {
    var questionAnsweredCorrectly = false;
    //alert('I was called');
    var answer = $("#answer").val();
    //Remove all leading and trailing spaces
    answer = answer.replace(/\s+$/, '');
    answer = answer.toUpperCase();

    //Extract the 'answer' array for the relevant 'question'
    var answerArray = capitalArray[currentQuestion]["answer"];

    $.each(answerArray, function(index, value) {
        //go through each option to check if match found
        //Correct answer found
        if (answer === value.toUpperCase()) {
            //questionsAnsweredCorrectly.push(currentQuestion);
            questionAnsweredCorrectly = true;

            //Increment 'currentScore' span
            $("#currentScore").html(parseInt($("#currentScore").html()) + parseInt(marksPerQuestion));

            //Increase progress bar
            progressCorrect();

            //to break out of the loop
            return false;
        }
    });
    //Incorrect answer
    if (!questionAnsweredCorrectly) {
        //Increase progress bar
        progressIncorrect();
    }

    //Increment 'totalScore' span
    $("#totalScore").html(parseInt($("#totalScore").html()) + parseInt(marksPerQuestion));

    //Clear 'answer' text box
    $("#answer").val('');

    //Increment pointer
    currentQuestion++;

    //Show next question only if they exist
    if (currentQuestion == capitalArray.length) {
        //Display summary page
        //console.log('Summary page to be displayed now!');
        $('.content').fadeOut(function() {});

    } else {
        displayQuestion(currentQuestion);
    }

}

function displayQuestion(index) {
    $('.question').html('Question ' + (index + 1) + ': ' + capitalArray[index]["question"]);
}

function progressCorrect() {
    jQuery("#circle" + (currentQuestion + 1)).animate({
        backgroundColor: "#38F279",
        color: "#BF9A84"
    }, 1500);

    //Not to animate in case of last circle
    if ($("#line" + (currentQuestion + 1)).length > 0) {
        jQuery("#line" + (currentQuestion + 1)).animate({
            backgroundColor: "#177DA6"
        }, 1500);
    }
}

function progressIncorrect() {
    jQuery("#circle" + (currentQuestion + 1)).animate({
        backgroundColor: "#A63F52",
        color: "#BF9A84"
    }, 1500);

    //Not to animate in case of last circle
    if ($("#line" + (currentQuestion + 1)).length > 0) {
        jQuery("#line" + (currentQuestion + 1)).animate({
            backgroundColor: "#177DA6"
        }, 1500);
    }
}
