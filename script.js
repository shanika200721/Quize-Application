let currentQuestionIndex = 0;
let score = 0;

// Load questions from questions.js
function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('question-text').textContent = question.question;
  document.getElementById('question-number').textContent = currentQuestionIndex + 1;
  document.getElementById('total-questions').textContent = questions.length;

  const optionsContainer = document.getElementById('quizForm');
  optionsContainer.innerHTML = ''; // Clear previous options

  // Clear previous content
  document.getElementById('question-content').innerHTML = '';

  // Add image if the question has one
  if (question.image) {
    const imageElement = document.createElement('img');
    imageElement.src = question.image;
    imageElement.alt = "Scenario Image";
    imageElement.className = 'scenario-image';
    document.getElementById('question-content').appendChild(imageElement);
  }

  if (question.Options[0].startsWith('image')) {
    // Image-based question
    question.Options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.className = 'image-option';
      optionElement.innerHTML = `
        <input type="radio" id="option${index + 1}" name="answer" value="${option}">
        <label for="option${index + 1}">
          <img src="${option}.JPG" alt="${option}">
        </label>
      `;
      optionsContainer.appendChild(optionElement);
    });
  } else if (question.audio) {
    // Audio-based question
    const audioElement = document.createElement('audio');
    audioElement.id = 'scenarioAudio';
    audioElement.controls = true;
    audioElement.innerHTML = `
      <source src="${question.audio}" type="audio/mpeg">
      Your browser does not support the audio element.
    `;
    document.getElementById('question-content').appendChild(audioElement);

    question.Options.forEach((option, index) => {
      const optionElement = document.createElement('label');
      optionElement.className = 'audio-option';
      optionElement.innerHTML = `
        <input type="radio" name="answer" value="${option}"> ${option}
      `;
      optionsContainer.appendChild(optionElement);
    });
  } else {
    // Text-based question
    question.Options.forEach((option, index) => {
      const optionElement = document.createElement('label');
      optionElement.innerHTML = `
        <input type="radio" name="answer" value="${option}"> ${option}
      `;
      optionsContainer.appendChild(optionElement);
    });
  }
}

// Next question
function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
}

// Previous question
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

// Submit answer
function submitAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (!selectedAnswer) {
    alert("Please select an answer!");
    return;
  }

  const question = questions[currentQuestionIndex];
  if (selectedAnswer.value === question.answer) {
    score++;
  }

  if (currentQuestionIndex < questions.length - 1) {
    nextQuestion();
  } else {
    document.querySelector('.quiz-section').style.display = 'none';
    document.getElementById('finalDialog').style.display = 'block';
    document.getElementById('final-score').textContent = score;
    document.getElementById('total-questions-final').textContent = questions.length;
  }
}

// Start quiz
function startQuiz() {
  document.querySelector('.home').classList.remove('active');
  document.getElementById('instructionsDialog').style.display = 'block';
}

// Back to home page
function backToHomePage() {
  document.getElementById('instructionsDialog').style.display = 'none';
  document.querySelector('.home').classList.add('active');
}

// Continue to quiz
function continueToQuiz() {
  document.getElementById('instructionsDialog').style.display = 'none';
  document.querySelector('.quiz-section').style.display = 'block';
  document.querySelector('.quiz-section').classList.add('active');
  loadQuestion();
}

// Exit quiz
function exitQuiz() {
  // Reset the quiz
  currentQuestionIndex = 0;
  score = 0;
  document.querySelector('.home').style.display = 'block';
  document.querySelector('.quiz-section').style.display = 'none';
  document.querySelector('#finalDialog').style.display = 'none';
}