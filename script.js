import { questions } from './questions.js';

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  const questionElement = document.getElementById('question');
  const answersElement = document.getElementById('answers');
  const nextButton = document.getElementById('next-button');

  // Återställ tillstånd
  answered = false;
  nextButton.style.display = 'none';
  questionElement.textContent = questions[currentQuestionIndex].question;
  answersElement.innerHTML = '';

  // Skapa svarsknappar
  questions[currentQuestionIndex].answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.onclick = () => checkAnswer(index, button);
    answersElement.appendChild(button);
  });
}

function checkAnswer(selectedIndex, clickedButton) {
  if (answered) return; // Förhindra dubbelklick
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

  document.getElementById('score').textContent = 'Poäng: ' + score;  // Bytte till vanlig stringkonkatenering
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
  document.getElementById('question').textContent = 'Du fick ' + score + ' av ' + questions.length + ' rätt!';  // Bytte till vanlig stringkonkatenering
  document.getElementById('answers').innerHTML = '';
  document.getElementById('next-button').style.display = 'none';
}

// Lägg till detta för att säkerställa att loadQuestion körs när allt har laddats
window.onload = loadQuestion;
