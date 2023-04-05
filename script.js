'use strict';

const player01 = {
  fieldDeck: document.querySelector('.player--0'),
  fieldCurrent: document.querySelector('#current--0'),
  fieldScore: document.querySelector('#score--0'),
  currentScore: 0,
  finalScore: 0,
  name: 'player 01',
};

const player02 = {
  fieldDeck: document.querySelector('.player--1'),
  fieldCurrent: document.querySelector('#current--1'),
  fieldScore: document.querySelector('#score--1'),
  currentScore: 0,
  finalScore: 0,
  name: 'player 02',
};

const game = {
  status: false,
  currentPlayer: player01,
  winningScore: 50,
};

const desk = {
  dice: document.querySelector('.dice'),
  roll: document.querySelector('.btn--roll'),
  hold: document.querySelector('.btn--hold'),
  reset: document.querySelector('.btn--new'),
};

const writeCurrent = (currentPlayer, currentScore) => {
  if (currentScore == 1) {
    currentPlayer.currentScore = 0;
    switchUsers(currentPlayer);
  } else {
    currentPlayer.currentScore = currentPlayer.currentScore + currentScore;
  }
  currentPlayer.fieldCurrent.textContent = currentPlayer.currentScore;
};

const writeScore = currentPlayer => {
  currentPlayer.finalScore =
    currentPlayer.finalScore + currentPlayer.currentScore;
  currentPlayer.fieldScore.textContent = currentPlayer.finalScore;
  currentPlayer.currentScore = 0;
};

const switchUsers = user => {
  if (user == player01) {
    game.currentPlayer = player02;
    player01.fieldDeck.classList.remove('player--active');
    player02.fieldDeck.classList.add('player--active');
    player01.fieldCurrent.textContent = 0;
  } else {
    game.currentPlayer = player01;
    player01.fieldDeck.classList.add('player--active');
    player02.fieldDeck.classList.remove('player--active');
    player02.fieldCurrent.textContent = 0;
  }
};

const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const isWinner = currentPlayer => {
  if (currentPlayer.finalScore >= game.winningScore) {
    alert('Player 01 is winner');
    game.status = true;
  }
};

desk.roll.addEventListener('click', () => {
  if (!game.status) {
    const value = rollDice();
    desk.dice.src = `dice-${value}.png`;
    writeCurrent(game.currentPlayer, value);
  } else {
    if (confirm('Your game already ended, start a new one?')) resetGame();
  }
});

desk.hold.addEventListener('click', () => {
  if (!game.status) {
    writeScore(game.currentPlayer);
    isWinner(game.currentPlayer);
    switchUsers(game.currentPlayer);
    console.log(game.currentPlayer.name);
  } else {
    if (confirm('Your game already ended, start a new one?')) resetGame();
  }
});

desk.reset.addEventListener('click', () => {
  resetGame();
});

const resetGame = () => {
  console.log('reseting');

  player01.currentScore = 0;
  player02.currentScore = 0;
  player01.finalScore = 0;
  player02.finalScore = 0;

  game.currentPlayer = player01;
  switchUsers(player02);
  player01.fieldCurrent.textContent = '0';
  player01.fieldScore.textContent = '0';

  player02.fieldCurrent.textContent = '0';
  player02.fieldScore.textContent = '0';
  game.status = false;
};

resetGame();
