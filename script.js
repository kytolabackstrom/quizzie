let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let allQuestions = [];
let usedQuestions = [];

const buttonColors = ['btn-orange', 'btn-lilac', 'btn-turquoise', 'btn-lemon'];
const numberOfQuestions = 3;

// ✅ Punkt 3: Cacha alla DOM-element en gång
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const scoreElement = document.getElementById('score');

// ✅ Punkt 4: Separat funktion för att visa poäng
function displayScore() {
  scoreElement.textContent = `Poäng: ${score}`;
}

// ✅ Punkt 4: Separat funktion för att visa slutresultat
function displayFinalScore() {
  questionElement.textContent = `Du fick ${score} av ${questions.length} rätt!`;
  answersElement.innerHTML = '';
  nextButton.style.display = 'none';
  restartButton.style.display = 'inline-block';
}

// ✅ Punkt 1: const där det inte ändras
async function loadQuestions() {
  try {
    const response = await fetch('questions.json');
    allQuestions = await response.json();
    usedQuestions = [];
    loadNextSetOfQuestions();
  } catch (error) {
    console.error("Kunde inte ladda frågorna:", error);
  }
}

function loadNextSetOfQuestions() {
  const availableQuestions = allQuestions.filter(q => !usedQuestions.includes(q));

  if (availableQuestions.length < numberOfQuestions) {
    usedQuestions = [];
    questions = shuffleArray(allQuestions).slice(0, numberOfQuestions);
  } else {
    questions = shuffleArray(availableQuestions).slice(0, numberOfQuestions);
  }

  usedQuestions = usedQuestions.concat(questions);
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

// Fisher-Yates shuffle
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function loadQuestion() {
  answered = false;
  nextButton.style.display = 'none';

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  answersElement.innerHTML = '';

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.classList.add(buttonColors[index % buttonColors.length]);
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

  displayScore();
  nextButton.style.display = 'inline-block';
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    displayFinalScore();
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  displayScore();
  restartButton.style.display = 'none';
  loadNextSetOfQuestions();
}

window.addEventListener('load', () => {
  loadQuestions();
  nextButton.addEventListener('click', nextQuestion);
  restartButton.addEventListener('click', restartQuiz);
});
