"use strict";

// Variables
const year = document.querySelector("#year");
const today = new Date();

// Copyright year
year.innerHTML = today.getFullYear();
