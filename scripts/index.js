const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');


window.onload = (e) => {
  document.getElementById('text').innerHTML = '<li>this is Rock,Paper ans scissor game you will play vs the computer for 5 round</li>'+ 
  '<li>after the game finish an screen will pop up with the score and how win.</li>' + 
  '<li>press ok to enter the game and close to return to the <strong>Games Page</strong></li>'
  
  modal.classList.add('active');
  overlay.classList.add('active');
}

document.getElementById('play').addEventListener('click', () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
  play();
});

document.getElementById('close').addEventListener('click', () => {
  window.location.href = 'funTime.html';
});

///////////////////////

let round = 1;
let playerScore = 0;
let computerScore = 0;
let winner = '';


// generate computer choice (K)
function getComputerChoice(){
   let num = Math.floor(Math.random() * (3 - 1 + 1) + 1);

   if (num === 1) {
    return 'rock';
   } else if (num === 2){
    return 'paper';
   } else {
    return 'scissor';
   }

}

// Get palyer choice (K)
function getPlayerChoice() {
  return new Promise(resolve => {
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', () => {
        resolve(button.value);
        return button.value;
      });
    });
  });
}

// controll the Images (k)
function changeImage(player, computer){
      // Change the image for the palyer
      const playerImg = document.getElementById('player');
      playerImg.src = `assets/image/${player}L.png`;
  
      // Change the image for the computer
      const computerImg = document.getElementById('computer');
      computerImg.src = `assets/image/${computer}R.png`;
}

// Check the winner of current round (K)
function check(player, computer){
  if (player === computer) {
    alert(`Round ${round}: It's a tie!`);
    return score(1);
  } else if (player === 'rock' && computer === 'scissor' ||
            player === 'paper' && computer === 'rock' ||
            player === 'scissor' && computer === 'paper') {
              alert(`Round ${round}: You win! ${player} beats ${computer}`);
              return score(true);
  } else {
    alert(`Round ${round}: You lose! ${computer} beats ${player}`);
    return score(false);
  }
}

// Control the Score (k)
function score(bool){
  if (typeof bool === 'boolean'){
    if(bool){
    playerScore++;
    } else {
      computerScore++;
    }
  }

  // Update the score in HTML
  document.getElementById("player-score").innerHTML = playerScore;

  document.getElementById("computer-score").innerHTML = computerScore
}

// Determines if you should continue of not (k)
function playRound() {
  // Check if it's the last round
  if (round === 5) {
    if (playerScore > computerScore) {
      winner = 'You win!';
    } else if (playerScore < computerScore) {
      winner = 'Computer wins!';
    } else {
      winner = "It's a tie!";
    }
    alert(`Final score:\nYou: ${playerScore}\nComputer: ${computerScore}\n${winner}`);
    return true;
  } else {
    round++;
    return false;
  }
}

// Ask if the player wants to play again (K)
function playAgain(){
  
  const again = confirm('Do you want to play again?');
  if (again) {
    // Reset the scores and the round counter
    window.location.reload();
    } else {
      window.location.href = ""
    }
}

// the main function to control the flow of the game
async function play() {
  // Generate a random choice for the computer
  const computerSelection = getComputerChoice();

  // Get player choice
  const playerSelection = await getPlayerChoice();

  // Update The Images for the player and computer
  changeImage(playerSelection, computerSelection);
  await new Promise((resolve) => {
    changeImage(playerSelection, computerSelection);
    setTimeout(() => {
      resolve();
    }, 500);
  });

  // Check the winner of current round
  check(playerSelection, computerSelection);

  // check if it's the last round and show the final score
  if (playRound()) {
    playAgain();
  } else {
    play();
  }
}
