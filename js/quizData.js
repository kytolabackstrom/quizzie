let allQuestions = [];
let usedQuestions = [];

export async function fetchQuestions() {
  const response = await fetch('questions.json');
  allQuestions = await response.json();
  usedQuestions = [];
}

export function getNewQuestionSet(amount) {
  const available = allQuestions.filter(q => !usedQuestions.includes(q));
  let selected;

  if (available.length < amount) {
    usedQuestions = [];
    selected = shuffle([...allQuestions]).slice(0, amount);
  } else {
    selected = shuffle([...available]).slice(0, amount);
  }

  usedQuestions = usedQuestions.concat(selected);
  return selected;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
