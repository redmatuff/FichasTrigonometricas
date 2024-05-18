const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const solInfo = document.querySelector('.solution-info');
const solExitBtn = document.querySelector('.sol-exit-btn');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const nextBtn = document.querySelector('.next-btn');




startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');


}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');

}



continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions (0);
    questionCounter (1);
    headerScore();

}
tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();

}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
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



nextBtn.onclick = () => {
    solInfo.classList.add('active');
    main.classList.add('active');
    showSolutionVideo(questionCount);

   
}
solExitBtn.onclick = () =>{
    solInfo.classList.remove('active');
    main.classList.remove('active');

    if (questionCount < questions.length -1 ){
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        


        nextBtn.classList.remove('active');
    }
    else{
        showResultBox();
    }


}

const optionList = document.querySelector('.option-list');
const questionVideo=document.querySelector('.question-video');

function showSolutionVideo(index) {
    const solutionVideoElement = document.querySelector('.sol-question-video');
    solutionVideoElement.src = questions[index].solVideoSrc;
  }

  

function showQuestions(index){
    const questionText=document.querySelector('.question-text');
    
    questionText.textContent=`${questions[index].numb}. ${questions[index].question}`;
    const videoElement = document.querySelector('.question-video');
    videoElement.src = `${questions[index].videoSrc}`;



    let optionTag=`<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;
    
    optionList.innerHTML = optionTag;
    
    const option = document.querySelectorAll('.option');
    for (let i =0; i < option.length; i++) {
        option[i].setAttribute('onclick','optionSelected(this)');
    }

    
}
function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer){
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else {
        answer.classList.add('incorrect');


        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
            optionList.children[i].setAttribute('class','option correct');
            }
        }
    }

    for (let i = 0; i < allOptions; i++){
        optionList.children[i].classList.add('disable');
    }

    nextBtn.classList.add('active');
}



function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `Questão ${index} de ${questions.length} `;
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Pontuação: ${userScore} / ${questions.length}`;
}


function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent =`Ponuação: ${userScore} de ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length)*100;
    let speed = 10;

    let progress = setInterval(() => { 
        progressStartValue++;
        
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background =`conic-gradient(#c40094 ${progressStartValue*3.6}deg, rgba(255,255,255,.1) 0deg)`;

        if (progressStartValue >= progressEndValue) {
            clearInterval(progress);
        }
    }, speed);

}