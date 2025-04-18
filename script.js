let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

async function loadQuestions() {
  try {
    const response = await fetch('questions.json');
    const allQuestions = await response.json();
    
    // Slumpa och välj ut 5 frågor
    questions = allQuestions.sort(() => Math.random() - 0.5).slice(0, 5);

    loadQuestion(); // Kör första frågan direkt efter laddning
  } catch (error) {
    console.error("Kunde inte ladda frågorna:", error);
  }
}

function shuffleQuestions() {
  // Slumpa om frågorna (den här är egentligen inte längre nödvändig
  // eftersom vi redan har slumpat när vi valde 5 frågor i loadQuestions)
  questions = questions.sort(() => Math.random() - 0.5);
}

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
  document.getElementById('restart-button').style.display = 'inline-block';
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById('score').textContent = 'Poäng: 0';
  document.getElementById('restart-button').style.display = 'none';
  
  loadQuestions(); // Ladda om frågorna och slumpa på nytt
}

window.addEventListener('load', () => {
  loadQuestions();

  document.getElementById('next-button').addEventListener('click', nextQuestion);
  document.getElementById('restart-button').addEventListener('click', restartQuiz);
});
