const questions = [
  {
    question: "Vilket land har Eiffeltornet?",
    answers: ["Spanien", "Frankrike", "Italien", "Tyskland"],
    correct: 1
  },
  {
    question: "Var ligger pyramiderna?",
    answers: ["Egypten", "Grekland", "Indien", "Japan"],
    correct: 0
  },
  {
    question: "Vilket land är känt för sina kängurus?",
    answers: ["Australien", "USA", "Kanada", "Sydafrika"],
    correct: 0
  }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  const questionElement = document.getElementById('question');
  const answersElement = document.getElementById('answers');
  const nextButton = document.getElementById('next-button');
  
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  
  answersElement.innerHTML = '';
  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.onclick = () => checkAnswer(index);
    answersElement.appendChild(button);
  });

  nextButton.style.display = 'none';
}

function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedIndex === currentQuestion.correct) {
    score++;
  }
  document.getElementById('score').textContent = Poäng: ${score};
  document.getElementById('next-button').style.display = 'block';
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    document.getElementById('question').textContent = Du fick ${score} av ${questions.length} rätt!;
    document.getElementById('answers').innerHTML = '';
    document.getElementById('next-button').style.display = 'none';
  }
}

loadQuestion();
