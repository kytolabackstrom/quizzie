// === 1. KONFIGURATION & INIT ===
const numberOfQuestions = 3;
const buttonColors = ['btn-orange', 'btn-lilac', 'btn-turquoise', 'btn-lemon'];
const fanfar = new Audio('sounds/fanfar.mp3');
const fail = new Audio('sounds/fail.mp3');


let allQuestions = [];
let usedQuestions = [];
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// === 2. DOM-ELEMENT ===
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const scoreElement = document.getElementById('score');

// === 3. HJÄLPFUNKTIONER ===

// Fisher-Yates shuffle
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}


function displayFinalScore() {
  
  if (score === questions.length) {
    questionElement.textContent = `Grattis, du fick alla rätt!`;
    fanfar.play();
  }
  else if (score === 0) {
    questionElement.textContent = `Du fick tyvärr inga rätt`;
    fail.play();
  }
  else {
    questionElement.textContent = `Du fick ${score} av ${questions.length} rätt!`;
  }

  answersElement.innerHTML = '';
  nextButton.style.display = 'none';
  restartButton.style.display = 'inline-block';
  document.getElementById('progress-indicator').textContent = '';

}




// === 4. LADDA FRÅGOR ===

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

// === 5. QUIZLOGIK ===

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

  document.getElementById('progress-indicator').textContent = `Fråga ${currentQuestionIndex + 1} av ${questions.length}`;
}

function checkAnswer(selectedIndex, clickedButton) {
  if (answered) return;
  answered = true;

  const currentQuestion = questions[currentQuestionIndex];
  const allButtons = document.querySelectorAll('#answers button');

  allButtons.forEach((btn, index) => {
    btn.disabled = true; // Inaktivera alla efter svar

    if (index === selectedIndex && index === currentQuestion.correct) {
      btn.classList.add('correct');
      score++;
    } else if (index === selectedIndex && index !== currentQuestion.correct) {
      btn.classList.add('wrong');
    } else if (index === currentQuestion.correct) {
      btn.classList.add('correct');
    } else {
      btn.classList.add('dimmed');
    }
  });

  if (currentQuestionIndex === questions.length - 1) {
    nextButton.textContent = 'Resultat';
  } else {
    nextButton.textContent = 'Nästa fråga';
  }
  
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
  restartButton.style.display = 'none';
  loadNextSetOfQuestions();
}

// === 6. INITIERA ===

window.addEventListener('load', () => {
  loadQuestions();
  nextButton.addEventListener('click', nextQuestion);
  restartButton.addEventListener('click', restartQuiz);
});
