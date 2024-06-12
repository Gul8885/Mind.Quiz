const startbtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitbtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const Continuebtn = document.querySelector('.Continue-btn');
const quizsection = document.querySelector('.quiz-section');
const quizbox = document.querySelector('.quiz-box');
const resultbox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomebtn = document.querySelector('.gohome-btn');








startbtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');

}

exitbtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');

}

Continuebtn.onclick = () => {
    quizsection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizbox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();

   
}

tryAgainBtn.onclick = () => {
    quizbox.classList.add('active');
    nextBtn.classList.remove('active');

    resultbox.classList.remove('active');

    questionCount = 0;
     questionNumb = 1;
     userScore = 0;
     showQuestions(questionCount);
     questionCounter(questionNumb);

     headerScore();

}

goHomebtn.onclick = () => {
    quizsection.classList.remove('active');
    nextBtn.classList.remove('active');

    resultbox.classList.remove('active');

    questionCount = 0;
     questionNumb = 1;
     userScore = 0;
     showQuestions(questionCount);
     questionCounter(questionNumb);

     headerScore();

}


let questionCount = 0;
let questionNumb = 1;
let userScore = 0;


const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');

    }
    else {
        showResultBox();
    }

}

const optionList = document.querySelector('.option-list');


//geting questions and option form array

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag =`<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;


    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }


}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let alloptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else{
        answer.classList.add('incorrect');


        //if answer incorrect, auto selected correct answer
        for (let i = 0; i < alloptions; i++) {
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class', 'option correct');
            }

        }

    }

    // if user has selected, disabled all options
    for (let i = 0; i < alloptions; i++) {
        optionList.children[i].classList.add('disabled');
       
    }

    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizbox.classList.remove('active');
    resultbox.classList.add('active');
    
    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;
    const circularPogress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressendValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
           progressStartValue++;
           //console.log(progressStartValue);
           progressValue.textContent = `${progressStartValue}%`;
           circularPogress.style.background = `conic-gradient(blue ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;
           if (progressStartValue == progressendValue) {
            clearInterval(progress);

           }

    },speed);


}

