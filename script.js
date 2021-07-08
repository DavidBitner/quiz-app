"use strict";

// Variables
const start_screen = document.querySelector("#start-screen");
const question_screen = document.querySelector("#question-screen");
const end_screen = document.querySelector("#end-screen");

const start_btn = document.querySelector("#btn-start");
const next_btn = document.querySelector("#btn-next");
const prev_btn = document.querySelector("#btn-prev");
const restart_btn = document.querySelector("#btn-restart");

const question_title = document.querySelector("#question-title");
const answers = document.getElementsByClassName("answer");

const end_title = document.querySelector("#end-title");
const correct_result = document.querySelector("#correct-result");
const wrong_result = document.querySelector("#wrong-result");
const quiz_result = document.querySelector("#quiz-result");

// Questions
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

// Copyright year
const year = document.querySelector("#year");
const today = new Date();
year.innerHTML = today.getFullYear();
