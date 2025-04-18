import { numberOfQuestions, buttonColors } from './config.js';
import { fetchQuestions, getNewQuestionSet } from './quizData.js';
import { elements, showQuestion, showScore, showFinalScore } from './ui.js';

let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;

export async function initQuiz() {
  await fetchQuestions();
  startNewRound();
}

export function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showFinalScore(score, questions.length);
  }
}

export function restartQuiz() {
  elements.restartButton.style.display = 'none';
  startNewRound();
}

// --- Privat (ej exporterat) ---

function startNewRound() {
  questions = getNewQuestionSet(numberOfQuestions);
  currentIndex = 0;
  score = 0;
  showScore(score);
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  showQuestion(questions[currentIndex], buttonColors, checkAnswer);
}

function checkAnswer(index, btn) {
  if (answered) return;
  answered = true;

  const current = questions[currentIndex];
  const allButtons = document.querySelectorAll('#answers button');

  if (index === current.correct) {
    btn.classList.add('correct');
    score++;
  } else {
    btn.classList.add('wrong');
    allButtons[current.correct].classList.add('correct');
  }

  showScore(score);
  elements.nextButton.style.display = 'inline-block';
}
