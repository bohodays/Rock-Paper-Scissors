const scissorsBtn = document.querySelector('#scissors-button');
const scissorsImg = document.querySelector('.scissors-button__img');
const rockBtn = document.querySelector('#rock-button');
const rockImg = document.querySelector('.rock-button__img');
const paperBtn = document.querySelector('#paper-button');
const paperImg = document.querySelector('.paper-button__img');
const player1Img = document.querySelector('#player1-img');
const player2Img = document.querySelector('#player2-img');
let win = 0;
let lose = 0; 
let draw = 0;




// 이벤트 위임
// player1 선택 이미지 출력
const buttonBox = document.querySelector('.button-box');
let player1Choice;
let flag = false;
buttonBox.addEventListener('click', (event) => {
  
  if (flag === false) {
    if (event.target === scissorsBtn || event.target === scissorsImg) {
      player1Img.setAttribute('src', './img/scissors.png');
      player1Choice = 'scissors';
    } else if (event.target === rockBtn || event.target === rockImg) {
      player1Img.setAttribute('src', './img/rock.png');
      player1Choice = 'rock';
    } else if (event.target === paperBtn || event.target === paperImg) {
      player1Img.setAttribute('src', './img/paper.png');
      player1Choice = 'paper';
    }
    player2RandomImg();

    const gameResult = gamePlay(player1Choice);
    setTimeout(() => printResult(gameResult), 4000);
    flag = true;


  }


});

const imgArray = ['scissors', 'rock', 'paper']
// player2 이미지 순서대로 보여주기
const player2RandomImg = () => {
  let i = 0;
  const randomImg = setInterval(() => {
    player2Img.setAttribute('src', `./img/${imgArray[i]}.png`)
    i = (i+1) % 3
  }, 100)
  setTimeout(() => clearInterval(randomImg), 3000)
  
}


// 게임 결과를 리턴하는 함수
const gamePlay = (player1Choice) => {
  const computerChoice = _.sampleSize(imgArray)[0];
  setTimeout(() => player2Img.setAttribute('src', `./img/${computerChoice}.png`), 3000);
  if (player1Choice === 'scissors') {
    if (computerChoice === 'rock') {
      // 컴퓨터 승리
      lose++;
      return 2
    } else if (computerChoice === 'scissors') {
      // 무승부
      draw++;
      return 0
    } else {
      // 플레이어 승리
      win++;
      return 1
    } 
  } else if (player1Choice === 'rock') {
    if (computerChoice === 'paper') {
      // 컴퓨터 승리
      lose++;
      return 2
    } else if (computerChoice === 'rock') {
      // 무승부
      draw++;
      return 0
    } else {
      // 플레이어 승리
      win++;
      return 1
    }
  } else if (player1Choice === 'paper') {
    if (computerChoice === 'scissors') {
      // 컴퓨터 승리
      lose++;
      return 2
    } else if (computerChoice === 'paper') {
      // 무승부
      draw++;
      return 0
    } else {
      // 플레이어 승리
      win++;
      return 1
    }
  }
}

const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const resultTitle = document.querySelector('.result__title');
const resultContent = document.querySelector('.result__content');
const countA = document.querySelector('.countA');
const countB = document.querySelector('.countB');
const mainResult = document.querySelector('.mainResult__content');
// 결과 모달창을 보이게하는 함수
const printResult = (gameResult) => {
  modal.style.display = 'block';
  if (gameResult === 2) {
    resultTitle.innerText = `😥 패배 😥`;
    resultContent.innerText = `${win}승 ${lose}패 ${draw}무 (${Math.round((win/(win+lose+draw))*100,2)}%)`;
  } else if (gameResult === 1) {
    resultTitle.innerText = `🎉 승리 🎉`;
    resultContent.innerText = `${win}승 ${lose}패 ${draw}무 (${Math.round((win/(win+lose+draw))*100,2)}%)`;
  } else if (gameResult === 0) {
    resultTitle.innerText = `무승부`;
    resultContent.innerText = `${win}승 ${lose}패 ${draw}무 (${Math.round((win/(win+lose+draw))*100,2)}%)`;
  }
  mainResult.innerText = `${win}승 ${lose}패 ${draw}무 (${Math.round((win/(win+lose+draw))*100,2)}%)`;
  countA.innerText = `${win}`;
  countB.innerText = `${lose}`;
}


const restartBtn = document.querySelector('.restart-button');
restartBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  flag = false;
})
