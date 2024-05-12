import { sortQuestions } from './sort.js';
import { showResult } from './results.js';
import { handleKeyboardEvents } from './keyboardEvents.js';

const questionContainer = document.getElementById("question-container");
const buttonContainer = document.getElementById("button-container");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Fetch questions from JSON file
fetch("/questions/test.json")
  .then(response => response.json())
  .then(data => {
    questions = sortQuestions(data.sections, data.sortMethod);
    displayQuestion(questions[currentQuestionIndex]);
    handleKeyboardEvents(questions, currentQuestionIndex, nextButton);
  })
  .catch(err => console.error(err));

// Display question and choices
function displayQuestion(question) {
  questionContainer.innerHTML = `
    <h2>${question.questionCont}</h2>
    <ul>
      ${question.questionOptions.map(option => `
        <li class="selectable-option">
          <input type="radio" id="${option}" name="choice" value="${option}" style="display: none;">
          <label class="radio-label" for="${option}">
            ${option}
          </label>
        </li>
      `).join("")}
    </ul>
  `;

  // Remove existing event listeners for number buttons
  document.body.removeEventListener("keypress", handleNumberKeyPress);

  // Add event listener for number buttons
  document.body.addEventListener("keypress", handleNumberKeyPress);
}

// Event listener for number buttons
function handleNumberKeyPress(event) {
  const number = parseInt(event.key);
  if (!isNaN(number) && number > 0 && number <= questions[currentQuestionIndex].questionOptions.length) {
    // Select the corresponding option
    const optionIndex = number - 1;
    const radioInput = document.getElementById(questions[currentQuestionIndex].questionOptions[optionIndex]);
    if (radioInput) {
      radioInput.checked = true;
    }
  }
}

// Event listener for next button click
nextButton.addEventListener("click", () => {
  const selectedOption = document.querySelector('input[type="radio"]:checked');

  // Check if an option is selected
  if (!selectedOption) {
    alert("Please select an option...");
    return;
  }

  // Check if selected option is correct
  if (selectedOption.value === questions[currentQuestionIndex].questionOptions[questions[currentQuestionIndex].questionAnswer]) {
    score++;
  }

  // Move to the next question or show the result
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(questions[currentQuestionIndex]);
  } else {
    showResult(score, questions.length);
    questionContainer.style.display = "none"; // Hide question container when the test is over
    buttonContainer.style.display = "none"; // Optionally hide button container
  }
});

// Event listener for previous button click
prevButton.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(questions[currentQuestionIndex]);
  }
});