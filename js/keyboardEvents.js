// Event listener for Enter key press

export function handleKeyboardEvents(questions, currentQuestionIndex, nextButton) {
  document.body.addEventListener("keypress", (event) => {
    // Check if the pressed key is Enter
    if (event.key === "Enter") {
      // Trigger click on the next button
      nextButton.click();
    } else {
      // Check if the pressed key is a number
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
  })
};
