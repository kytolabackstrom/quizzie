import { questions } from './questions.js';

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  const questionElement = document.getElementById('question');
  const answersElement = document.getElementById('answers');
  const nextButton = document.getElementById('next-button');

  answered = false;
  nextButton.style.display = 'none';
  questionElement.textContent = questions[currentQuestionIndex].question;
  answersElement.innerHTML = '';

  questions[currentQuestionIndex].answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.onclick = () => checkAnswer(index, button);
    answersElement.appendChild(button);
  });
}

function checkAnswer(selectedIndex, clickedButton) {
  if (answered) return;
  answered = true;

  const currentQuestion = questions[currentQuestionIndex];
  const allButtons = document.querySelectorAll('#answers button');

  if (selectedIndex === currentQuestion.correct) {
    clickedButton.classList.add('correct');
    score++;
  } else {
    clickedButton.classList.add('wrong');
    allButtons[currentQuestion.correct].classList.add('correct');
  }

  document.getElementById('score').textContent = 'Poäng: ' + score;
  document.getElementById('next-button').style.display = 'inline-block';
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  document.getElementById('question').textContent = 'Du fick ' + score + ' av ' + questions.length + ' rätt!';
  document.getElementById('answers').innerHTML = '';
  document.getElementById('next-button').style.display = 'none';
}

window.addEventListener('load', () => {
  loadQuestion();

  const nextButton = document.getElementById('next-button');
  nextButton.addEventListener('click', nextQuestion);
});



