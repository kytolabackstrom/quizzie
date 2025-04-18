export const elements = {
    question: document.getElementById('question'),
    answers: document.getElementById('answers'),
    nextButton: document.getElementById('next-button'),
    restartButton: document.getElementById('restart-button'),
    score: document.getElementById('score')
  };
  
  export function showScore(score) {
    elements.score.textContent = `Poäng: ${score}`;
  }
  
  export function showFinalScore(score, total) {
    elements.question.textContent = `Du fick ${score} av ${total} rätt!`;
    elements.answers.innerHTML = '';
    elements.nextButton.style.display = 'none';
    elements.restartButton.style.display = 'inline-block';
  }
  
  export function showQuestion(question, buttonColors, onClickAnswer) {
    elements.answers.innerHTML = '';
    elements.question.textContent = question.question;
    elements.nextButton.style.display = 'none';
  
    question.answers.forEach((answer, i) => {
      const btn = document.createElement('button');
      btn.textContent = answer;
      btn.classList.add(buttonColors[i % buttonColors.length]);
      btn.onclick = () => onClickAnswer(i, btn);
      elements.answers.appendChild(btn);
    });
  }
  