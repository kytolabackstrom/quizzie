let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let allQuestions = [];  // Här sparar vi alla frågor från 'questions.json'
let usedQuestions = []; // Här sparar vi de frågor som redan valts under omgången
const buttonColors = ['btn-orange', 'btn-lilac', 'btn-turquoise', 'btn-lemon'];

const numberOfQuestions = 3;

// Ladda alla frågor från JSON-filen och förbered för quizet
async function loadQuestions() {
  try {
    const response = await fetch('questions.json');
    allQuestions = await response.json();
    usedQuestions = [];  // Töm tidigare valda frågor
    loadNextSetOfQuestions(); // Ladda de första frågorna för quizet
  } catch (error) {
    console.error("Kunde inte ladda frågorna:", error);
  }
}

// Funktion för att slumpa om frågorna när de valda inte räcker
function loadNextSetOfQuestions() {
  if (allQuestions.length - usedQuestions.length < numberOfQuestions) {
    // Om det finns färre än numberOfQuestions frågor kvar som inte valts, slumpa om alla frågor
    usedQuestions = [];  // Töm de valda frågorna så att vi kan börja om
    questions = allQuestions.sort(() => Math.random() - 0.5).slice(0, numberOfQuestions);  // Välj nya slumpade frågor
  } else {
    // Annars, välj 5 nya frågorna som inte har använts tidigare
    let availableQuestions = allQuestions.filter(q => !usedQuestions.includes(q));
    questions = availableQuestions.sort(() => Math.random() - 0.5).slice(0, numberOfQuestions);
  }

  // Lägg till de valda frågorna till usedQuestions
  usedQuestions = usedQuestions.concat(questions);

  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

// Ladda en fråga
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
    button.classList.add(buttonColors[index % buttonColors.length]); // Lägg till färgklass
    button.onclick = () => checkAnswer(index, button);
    answersElement.appendChild(button);
  });
}

// Kontrollera om svaret är korrekt
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

// Gå till nästa fråga
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
}

// Visa slutresultat
function showFinalScore() {
  document.getElementById('question').textContent = 'Du fick ' + score + ' av ' + questions.length + ' rätt!';
  document.getElementById('answers').innerHTML = '';
  document.getElementById('next-button').style.display = 'none';
  document.getElementById('restart-button').style.display = 'inline-block';
}

// Starta om quizet
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById('score').textContent = 'Poäng: 0';
  document.getElementById('restart-button').style.display = 'none';
  
  loadNextSetOfQuestions(); // Ladda en ny uppsättning frågor (med nya slumpade)
}

window.addEventListener('load', () => {
  loadQuestions();

  document.getElementById('next-button').addEventListener('click', nextQuestion);
  document.getElementById('restart-button').addEventListener('click', restartQuiz);
});
