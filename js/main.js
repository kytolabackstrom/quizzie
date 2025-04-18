import { initQuiz, nextQuestion, restartQuiz } from './logic.js';
import { elements } from './ui.js';

window.addEventListener('load', () => {
  initQuiz();
  elements.nextButton.addEventListener('click', nextQuestion);
  elements.restartButton.addEventListener('click', restartQuiz);
});
