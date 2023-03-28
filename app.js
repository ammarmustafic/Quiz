function shuffle(num) {
  for (let i = 0; i < num; i++) {
    let first = Math.floor(Math.random() * questions.length);
    let second = Math.floor(Math.random() * questions.length);

    let something = questions[first];
    questions[first] = questions[second];
    questions[second] = something;
  }
  console.log(questions);
}
let countdown;

const feedback = document.getElementById("feedback");

let correctCount = 0;
let incorrectCount = 0;

function updateScore() {
  const correctDisplay = document.querySelector(
    ".score.correct-score .score-value"
  );
  const incorrectDisplay = document.querySelector(
    ".score.incorrect-score .score-value"
  );
  correctDisplay.innerText = `${correctCount}`;
  incorrectDisplay.innerText = `${incorrectCount}`;
}

function checkAnswer(selectedAnswer, correctAnswer) {
  clearInterval(countdown);
  if (selectedAnswer === correctAnswer) {
    feedback.innerText = "Well done! Your answer is correct!";
    feedback.classList.add("correct");
    feedback.classList.remove("incorrect");
    correctCount++;
  } else {
    feedback.innerText = "Sorry, your answer is incorrect.";
    feedback.classList.add("incorrect");
    feedback.classList.remove("correct");
    incorrectCount++;
  }
  updateScore();
}

let nextButton = document.getElementById("next-button");

function showQuestion(index) {
  const currentQuestion = questions[index];
  question.innerText = currentQuestion.question;
  answer1.innerText = currentQuestion.answers[0];
  answer2.innerText = currentQuestion.answers[1];
  answer3.innerText = currentQuestion.answers[2];
  answer4.innerText = currentQuestion.answers[3];

  feedback.innerText = "";

  if (currentQuestion.answered) {
    answer1.disabled = true;
    answer2.disabled = true;
    answer3.disabled = true;
    answer4.disabled = true;
  } else {
    answer1.disabled = false;
    answer2.disabled = false;
    answer3.disabled = false;
    answer4.disabled = false;

    let timer = 30;
    let timerDisplay = document.getElementById("timer"); // select the timer display element
    timerDisplay.innerText = `Time left: ${timer} seconds`; // update the initial display
    countdown = setInterval(() => {
      timer--;
      timerDisplay.innerText = `Time left: ${timer} seconds`; // update the display with the remaining time
      if (timer === 0) {
        clearInterval(countdown);
        if (!currentQuestion.answered) {
          currentQuestion.answered = true;
          checkAnswer(null, currentQuestion.correct_answer);
        }
      }
    }, 1000);

    answer1.onclick = () => {
      clearInterval(countdown);
      if (!currentQuestion.answered) {
        currentQuestion.answered = true;
        checkAnswer(0, currentQuestion.correct_answer);
      }
    };

    answer2.onclick = () => {
      clearInterval(countdown);
      if (!currentQuestion.answered) {
        currentQuestion.answered = true;
        checkAnswer(1, currentQuestion.correct_answer);
      }
    };

    answer3.onclick = () => {
      clearInterval(countdown);
      if (!currentQuestion.answered) {
        currentQuestion.answered = true;
        checkAnswer(2, currentQuestion.correct_answer);
      }
    };

    answer4.onclick = () => {
      clearInterval(countdown);
      if (!currentQuestion.answered) {
        currentQuestion.answered = true;
        checkAnswer(3, currentQuestion.correct_answer);
      }
    };
  }
}

let questionContainer = document.getElementById("question-container");

function displayQuestions() {
  shuffle(100);
  let currentQuestionIndex = 0;
  let timer = 30;
  let countdownInterval;

  function startCountdown() {
    countdownInterval = setInterval(() => {
      let timerDisplay = document.getElementById("timer");
      timer--;
      timerDisplay.innerText = `Time left: ${timer} seconds`;
      if (timer === 0) {
        clearInterval(countdownInterval);
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          timer = 30;
          showQuestion(currentQuestionIndex);
          startCountdown();
        } else {
          currentQuestionIndex = 0;
          shuffle(100);
          showQuestion(currentQuestionIndex);
          updateScore();
        }
      }
    }, 1000);
  }

  showQuestion(currentQuestionIndex);
  startCountdown();

  nextButton.addEventListener("click", () => {
    clearInterval(countdownInterval);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      timer = 30;
      showQuestion(currentQuestionIndex);
      startCountdown();
    } else {
      currentQuestionIndex = 0;
      shuffle(100);
      showQuestion(currentQuestionIndex);
      updateScore();
      startCountdown();
    }
  });
}
displayQuestions();
