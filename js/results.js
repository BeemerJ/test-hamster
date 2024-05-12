export function showResult(score, totalQuestions) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<h2>Your Score: ${score}/${totalQuestions}</h2>`;
}