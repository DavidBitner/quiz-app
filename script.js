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
let random_answers;
let questions;

async function generateQuestions() {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple`
    );

    if (!response.ok) {
      throw new Error("Problem getting questions data");
    }

    const data = await response.json();

    return data.results;
  } catch (error) {
    console.log(error);
  }
}

// Shuffle array function
function shuffle(array) {
  let current_index = array.length,
    random_index;

  // While there remain elements to shuffle...
  while (0 !== current_index) {
    // Pick a remaining element...
    random_index = Math.floor(Math.random() * current_index);
    current_index--;

    // And swap it with the current element.
    [array[current_index], array[random_index]] = [
      array[random_index],
      array[current_index],
    ];
  }

  return array;
}

// Function to change answers order
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
  question_title.innerHTML = questions[c_quest].question;
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
start_btn.addEventListener("click", async function () {
  questions = await generateQuestions();
  start_screen.style.animation = "opacity_to_zero 2s forwards";
  start_screen.style.zIndex = "0";
  question_screen.style.zIndex = "1";
  question_screen.style.animation = "opacity_to_hundred 2s forwards";
  populate_random_answers();
  change_question(cur_question);
});

// Next/finish btn
next_btn.addEventListener("click", function () {
  check_right_answer();
  cur_question++;
  if (cur_question == questions.length) {
    cur_question = 0;
    question_screen.style.zIndex = "0";
    question_screen.style.animation = "opacity_to_zero 2s forwards";
    end_screen.style.zIndex = "1";
    end_screen.style.animation = "opacity_to_hundred 2s forwards";
    correct_result.innerHTML = `${correct} right answers`;
    wrong_result.innerHTML = `${wrong} wrong answers`;
    quiz_result.innerHTML = correct > wrong ? "CONGRATULATIONS" : "TRY AGAIN";
    if (correct > wrong) {
      quiz_result.innerHTML = "CONGRATULATIONS :D";
      end_screen.style.boxShadow = "1px 1px 10px green";
      end_screen.style.border = "2px solid green";
    } else {
      quiz_result.innerHTML = "TRY AGAIN :(";
      end_screen.style.boxShadow = "1px 1px 10px red";
      end_screen.style.border = "2px solid red";
    }
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
  end_screen.style.zIndex = "0";
  end_screen.style.animation = "opacity_to_zero 2s forwards";
  start_screen.style.zIndex = "1";
  start_screen.style.animation = "opacity_to_hundred 2s forwards";
  next_btn.innerHTML = "NEXT";
  correct = 0;
  wrong = 0;
});
