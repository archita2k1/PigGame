'use strict';

//Selecting Elements

const diceEl = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let playing = true;

let scores = [0,0];
let currentScore = 0;
let activePlayer = 0;


// Switch Player
const switchPlayer = function() {
   document.getElementById(`current--${activePlayer}`).textContent = 0;
   currentScore = 0;
      activePlayer = (activePlayer === 0) ? 1 : 0 ;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
};
// Roll Button Functionality
const clickRoll = function() {
   if (playing === true) {
    //1. Generate dice roll
   const dice = Math.trunc(((Math.random())*6)+1);

   //2. Display the dice again
   diceEl.classList.remove('hidden');
   diceEl.src = `dice-${dice}.png`;

   //3. Check for rolled 1: If true, switch to next player.
   if (dice == 1) {
      
      switchPlayer();
   }

   //4. In case rolled not 1: 
   else {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
   }
   }
   
}

rollBtn.addEventListener('click', clickRoll);


// Hold Button Functionality

let clickHold = function() {
  if (playing === true) {
   // 1. Add current score to active player's score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]; 
  // 2. Check if player's score == 100, declare winner & finish game
   if (scores[activePlayer] >=30) {
      //declare winner
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

      //finish game
      diceEl.classList.add('hidden');
      playing = false;
   }
  // 3. Switch to next player
  else{
   switchPlayer();
  }
  }  
}
holdBtn.addEventListener('click', clickHold);

// New game button functionality
let clickNew = function () {

 // Re-enabling player 
 playing = true;

 // Setting values to 0
 currentScore = 0;
 activePlayer = 0;
 current0El.textContent = 0;
 current1El.textContent = 0;
 score0El.textContent = 0;
 score1El.textContent = 0;
 scores = [0,0];

 // Initial settings
 player0El.classList.remove('player--winner');
 player1El.classList.remove('player--winner');
 player0El.classList.add('player--active');
 player1El.classList.remove('player--active');
 diceEl.classList.remove('hidden');
 
};

newBtn.addEventListener('click', clickNew);