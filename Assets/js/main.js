

// const global vars html selectors
const startBtn = document.querySelector('#start-btn');
const readyNow = document.querySelector('#ready');
const nextBtn = document.querySelector('#next-btn');
const highScoreTitleEl = document.querySelector('#high-score-title');

// mutable global vars - used to "target" html elements
let timerSecEl = document.querySelector('#timer');
let scoreEl = document.querySelector('#score');
let answersEl = document.querySelector('#answer-buttons');
let questionEl = document.querySelector('#question');
let highScoreEl = document.querySelector('#high-score');


// mutable global vars

let timerLeft = 200;
let score = 0;
let currQuestionIdx = 0;
let hasAnsweredCurrQuestion = false;
let gameFinished = false;
let timerInterval;


// * start game function
const startGame = () => {
  // TODO: could make this into a seperate func
  startBtn.classList.add('hidden');
  readyNow.classList.add('hidden');

  timerInterval = setInterval(() => {
    timerLeft--;
    timerSecEl.textContent = timerLeft;
    if (timerLeft < 1) {
      endGame(true);
    }
  }, 1000);

  runNextQuestion()

};

startBtn.addEventListener('click', startGame);

// *function to end the game
const endGame = (didTimeOut) => {
  gameFinished = true;

  if (didTimeOut) {
    console.log('Times up !')
  };
  cleanAnswers();
  clearInterval(timerInterval);

  const initials = prompt("Type your intials to save score") || "unknown";

  const yourHighScore = { score: score, initials: initials }

  //get existing high scores
  const localHighScores = JSON.parse(localStorage.getItem('scores')) || [];

  // combine with new score and sort
  const finalHighScores = localHighScores.concat([yourHighScore]).sort((a, b) => b.score - a.score)

  //TODO: try to check if current score is high score and congratulate user
  
  // if (yourHighScore > localHighScores) {
  //   console.log('Congrates You have the highest score');
  // };

  // save new high scores
  localStorage.setItem('scores', JSON.stringify(finalHighScores));

  // display new high scores
  finalHighScores.forEach((highScore) => {
    let scoreEl = document.createElement('li')
    scoreEl.innerText = highScore.initials + " : " + highScore.score
    highScoreEl.appendChild(scoreEl)
  })

  highScoreEl.classList.remove('hidden');
  highScoreTitleEl.classList.remove('hidden');

}

  // * a func that randomly sorts through questions each time the game starts
const runNextQuestion = () => {

  const theQuestion = questionList[currQuestionIdx]

  questionEl.innerHTML = theQuestion.question;

  questionEl.classList.remove('hidden');
  answersEl.classList.remove('hidden');
  // the piece of code below randomizes the questions 
  theQuestion.answers.sort(() => Math.random() - .5).forEach(makeAnswerOptions)

}

// * a func to handle answers - creates them and how to handle them etc
const makeAnswerOptions = (answer) => {

  const theQuestion = questionList[currQuestionIdx]

  let btnEl = document.createElement('button')
  btnEl.innerText = answer
  btnEl.classList.add('btn')

  btnEl.addEventListener('click', () => {

    // only proceed if unanswered
    if (!hasAnsweredCurrQuestion) {
      hasAnsweredCurrQuestion = true;
    } else {
      return; // finishes the func here - instead of proceeding
    }

    if (answer === theQuestion.correctAnswer) {
      score += 100;
      scoreEl.textContent = score;
      btnEl.classList.add('success-btn')
    } else {
      timerLeft -= 15;
      timerSecEl.textContent = timerLeft;
      timerSecEl.classList.add('fail')
      setTimeout(() => {
        timerSecEl.classList.remove('fail');
      }, 2000)
      btnEl.classList.add('fail-btn');
    }

    // 2 seconds after answer
    setTimeout(() => {

      if (gameFinished) {
        return
      };

      currQuestionIdx++
      if (currQuestionIdx === questionList.length) {
        // done
        endGame()

      } else {
        //next question
        cleanAnswers()
        runNextQuestion()

      }
    }, 2000)

  });
  answersEl.appendChild(btnEl);

}

// * func to clear answers
const cleanAnswers = () => {
  while (answersEl.firstChild) {
    answersEl.removeChild(answersEl.firstChild)
  }
  questionEl.classList.add('hidden');
  answersEl.classList.add('hidden');
  hasAnsweredCurrQuestion = false;
}




// * an array with objects, which are questions
const questionList = [
  {
    question: 'Which of the following is a way to create an object in JavaScript?',
    answers: ['object.create()', 'new Object()', '{}', 'All of the above'],
    correctAnswer: 'All of the above'
  },
  {
    question: 'What is the syntax for defining a function in JavaScript?',
    answers: ['function myFunction()', 'def myFunction()', 'function: myFunction', 'None of the above'],
    correctAnswer: 'function myFunction()'
  },
  {
    question: 'Which of the following is a way to select an element with the ID "my-element" in JavaScript?',
    answers: ['document.querySelectorAll("#my-element")', 'document.getElementById("my-element")', '#my-element', 'None of the above'],
    correctAnswer: 'document.getElementById("my-element")'
  },
  {
    question: 'What is the syntax for defining a class in JavaScript?',
    answers: ['class MyClass', 'function MyClass', 'class: MyClass', 'None of the above'],
    correctAnswer: 'class MyClass'
  },
  {
    question: 'What is the syntax for defining a constant in JavaScript?',
    answers: ['const myConst', 'let myConst', 'var myConst', 'final myConst'],
    correctAnswer: 'const myConst'
  },
  {
    question: 'What is the symbol for the logical NOT operator in JavaScript?',
    answers: ['!', 'not'],
    correctAnswer: '!'
  },
  {
    question: 'Which of the following is a looping construct in JavaScript?',
    answers: ['for', 'if', 'continue'],
    correctAnswer: 'for'
  },
  {
    question: 'What is the syntax for defining an object property in JavaScript?',
    answers: ['object.property = value', 'object(property) = value'],
    correctAnswer: 'object.property = value'
  },
  {
    question: 'Which of the following is a way to create an array in JavaScript?',
    answers: ['array.create()', 'new Array()'],
    correctAnswer: 'new Array()'
  },
  {
    question: 'Which of the following is a primitive data type in JavaScript?',
    answers: ['string', 'number', 'boolean', 'all of above'],
    correctAnswer: 'all of above'
  },
  {
    question: ' How great of an Instructor is Gary?',
    answers: ['a little', 'very much', 'somewhat',],
    correctAnswer: 'very much'
  }
].sort(() => Math.random() - .5);

