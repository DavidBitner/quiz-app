"use strict";

// Variables
const start_screen = document.querySelector("#start-screen");
const question_screen = document.querySelector("#question-screen");
const end_screen = document.querySelector("#end-screen");

const start_btn = document.querySelector("#btn-start");
const next_btn = document.querySelector("#btn-next");
const restart_btn = document.querySelector("#btn-restart");

const question_title = document.querySelector("#question-title");
const answers = document.getElementsByClassName("answer");
const radio_btns = document.querySelectorAll(`input[name="radio"]`);

const correct_result = document.querySelector("#correct-result");
const wrong_result = document.querySelector("#wrong-result");
const quiz_result = document.querySelector("#quiz-result");

let cur_question = 0;

let correct = 0;
let wrong = 0;

// Copyright year
const year = document.querySelector("#year");
const today = new Date();
year.innerHTML = today.getFullYear();

// Questions
let random_answers = [];
const questions = [
  {
    q_title: "Area 51 is located in which US state?",
    correct_answer: "Nevada",
    incorrect_answers: ["Arizona", "New Mexico", "Utah"],
  },
  {
    q_title: "Which sign of the zodiac is represented by the Crab?",
    correct_answer: "Cancer",
    incorrect_answers: ["Libra", "Virgo", "Sagittarius"],
  },
  {
    q_title: "Which American president appears on a one dollar bill?",
    correct_answer: "George Washington",
    incorrect_answers: [
      "Thomas Jefferson",
      "Abraham Lincoln",
      "Benjamin Franklin",
    ],
  },
  {
    q_title: "How many colors are there in a rainbow?",
    correct_answer: "7",
    incorrect_answers: ["6", "8", "9"],
  },
  {
    q_title: "What is the name of Poland in Polish?",
    correct_answer: "Polska",
    incorrect_answers: ["Pupcia", "Polszka", "Poland"],
  },
  {
    q_title: "What do the letters of the fast food chain KFC stand for?",
    correct_answer: "Kentucky Fried Chicken",
    incorrect_answers: [
      "Kentucky Fresh Cheese",
      "Kibbled Freaky Cow",
      "Kiwi Food Cut",
    ],
  },
  {
    q_title: "How many dogs years are in 1 human year?",
    correct_answer: "7",
    incorrect_answers: ["4", "5", "6"],
  },
  {
    q_title:
      "The drug cartel run by Pablo Escobar originated in which South American city?",
    correct_answer: "Medellin",
    incorrect_answers: ["Bogota", "Quito", "Cali"],
  },
  {
    q_title: "How many people have stood on the moon?",
    correct_answer: "12",
    incorrect_answers: ["8", "10", "14"],
  },
  {
    q_title: "How many km does Earth travel in a day?",
    correct_answer: "2600000 km",
    incorrect_answers: ["26 km", "260 km", "260000 km"],
  },
];

// Shuffle array function
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// Populate random answers
function populate_random_answers() {
  random_answers = [];
  for (const dict of questions) {
    let a = [dict.correct_answer, ...dict.incorrect_answers];
    shuffle(a);
    random_answers.push(a);
  }
}

// Change question function
function change_question(c_quest) {
  question_title.innerHTML = questions[c_quest].q_title;
  let iterator = 0;
  for (const answer of answers) {
    answer.innerHTML = random_answers[c_quest][iterator];
    iterator++;
  }
  next_btn.style.pointerEvents = "none";
}

// Check right answer
function check_right_answer() {
  let selected_answer;
  for (const radio_btn of radio_btns) {
    if (radio_btn.checked) {
      const label_selected = document.querySelector(
        `label[for="${radio_btn.id}"]`
      );
      selected_answer = label_selected.textContent;
      radio_btn.checked = false;
    }
  }
  if (selected_answer == questions[cur_question].correct_answer) {
    correct++;
  } else {
    wrong++;
  }
}

// Events
// Start quiz
start_btn.addEventListener("click", function () {
  start_screen.style.display = "none";
  question_screen.style.display = "inline";
  populate_random_answers();
  change_question(cur_question);
});

// Next/finish btn
next_btn.addEventListener("click", function () {
  check_right_answer();
  cur_question++;
  if (cur_question == questions.length) {
    cur_question = 0;
    question_screen.style.display = "none";
    end_screen.style.display = "inline";
    correct_result.innerHTML = `${correct} right answers`;
    wrong_result.innerHTML = `${wrong} wrong answers`;
    quiz_result.innerHTML = correct > wrong ? "CONGRATULATIONS" : "TRY AGAIN";
  } else {
    change_question(cur_question);
    if (cur_question == questions.length - 1) {
      next_btn.innerHTML = "FINISH";
    }
  }
});

// Event to enable next button after a radio button is selected
for (const radio_btn of radio_btns) {
  radio_btn.addEventListener("click", function () {
    next_btn.style.pointerEvents = "auto";
  });
}


// Restart quiz
restart_btn.addEventListener("click", function () {
  end_screen.style.display = "none";
  start_screen.style.display = "inline";
  next_btn.innerHTML = "NEXT";
  correct = 0;
  wrong = 0;
});
