/* Pseudo code.
   Take in a user choice (rock, paper, or scissors).
     GUI should provide clickable options
   Generate a computer choice (rock, paper, scissors).
   Function playRound takes user choice and computer choice and returns results of the round.
    Results should appear in GUI.
   Function game calls playRound to play a first-to-five-points game and reports the winner.
    Scores and round should be displayed in GUI.
*/


/***************************************************************/

// There are two transition end events. the second is the one I need.

const rockPlayer = document.getElementById('rock-player');
const paperPlayer = document.getElementById('paper-player');
const scissorsPlayer = document.getElementById('scissors-player');
const rockComp = document.getElementById('rock-comp');
const paperComp = document.getElementById('paper-comp');
const scissorsComp = document.getElementById('scissors-comp');

const targetPlayer = document.getElementById('target-player');
const targetComp = document.getElementById('target-comp');

const gameLeft = document.querySelector('.game-left');
const battleLeft = document.querySelector('.battle-left');
const battleRight = document.querySelector('.battle-right');
const gCenterBottom = document.querySelector('.g-center-bottom');
const pScoreScore = document.querySelector('.p-score-score');
const cScoreScore = document.querySelector('.c-score-score');
const roundRound = document.querySelector('.round-round');

const startModal = document.getElementById('startModal');
const startButton = document.getElementById('startButton');
const newGmModal = document.getElementById('newGmModal');
const gmWinMsgBox = document.getElementById('gmWinMsgBox');
const ngButton = document.getElementById('ngButton');

/* Remember units for custom variables, 
   else: in CSS, use e.g. calc(var(--customVar) * 1px).
*/
function getXChange(elem, target){
  const boxOne = elem.getBoundingClientRect();
  const boxTarget = target.getBoundingClientRect();

  // Adjust for varied widths.
  const widthAdj = (0.5 * boxTarget.width) - (0.5 * boxOne.width);

  // window.pageXOffset cancels out.
  const xChange = boxTarget.left - boxOne.left + widthAdj + 'px';
  return xChange;
}

function getYChange(elem, target){
  const boxOne = elem.getBoundingClientRect();
  const boxTarget = target.getBoundingClientRect();

  // Adjust for varied heights.
  const heightAdj = (0.5 * boxTarget.height) - (0.5 * boxOne.height);

  // window.pageYOffset cancels out
  const yChange = boxTarget.top - boxOne.top + heightAdj + 'px';
  return yChange;
}

// Check values to access later to see if the window has resized.
const initialRockX = rockPlayer.getBoundingClientRect().left;
const initialRockY = rockPlayer.getBoundingClientRect().top;


/* Initialize CSS custom properties (referenced in the stylesheet).
   Custom properties must be within scope available to relevant element.

   There is another way to do this by changing the stylesheet as held in the DOM instead of setting CSS custom properties:
   https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty
*/

function addCustom(customX, customY, item, target){
  item.style.setProperty(
    customX, getXChange(item, target)
  );
  item.style.setProperty(
    customY, getYChange(item, target)
  );
}

// Initialization and callback function: 
function setXY(){
  addCustom('--rock-p-mv-x', '--rock-p-mv-y', rockPlayer, targetPlayer);
  addCustom('--paper-p-mv-x', '--paper-p-mv-y', paperPlayer, targetPlayer);
  addCustom('--scissors-p-mv-x', '--scissors-p-mv-y', scissorsPlayer, targetPlayer);
  addCustom('--rock-c-mv-x', '--rock-c-mv-y', rockComp, targetComp);
  addCustom('--paper-c-mv-x', '--paper-c-mv-y', paperComp, targetComp);
  addCustom('--scissors-c-mv-x', '--scissors-c-mv-y', scissorsComp, targetComp);
}

// Initialize x and y.
setXY();

function verifyXY(){
  let tempRockX = initialRockX;
  let tempRockY = initialRockY;
  // let checkCounter = 0;
  gameLeft.addEventListener('mouseover', () => {
    if(!inPlay){
      const checkX = rockPlayer.getBoundingClientRect().left;
      const checkY = rockPlayer.getBoundingClientRect().top;
      // checkCounter += 1;
      // console.log(`checked ${checkCounter} times`);
      if (checkX !== tempRockX || checkY !== tempRockY){
        setXY();
        tempRockX = checkX;
        tempRockY = checkY;
      }
    }
  });
}

function getComputerChoice() {
  const choice = Math.floor(Math.random() * 3);
  
  const message =
      (choice === 0) ? 'rock' :
      (choice === 1) ? 'paper' :
      'scissors'; 
  console.log(message);
  return message;
}

function capitalize(string) {
  const first = string.slice(0,1);
  const rest = string.slice(1);

  const capitalized = `${first.toUpperCase()}${rest.toLowerCase()}`;
  return capitalized;
}

function compReady(){
  const comp = computerSelection.toLowerCase();
  if(comp === 'rock'){
    rockComp.classList.add('Z-rock-c');
  } else if(comp === 'paper'){
    paperComp.classList.add('Z-paper-c');
  } else{
    scissorsComp.classList.add('Z-scissors-c');
  }
}

/* Let the browser switch handling of chosen elements from CPU to GPU.
   Z classes put each item in its own plane.
   This should preempt layer squashing by the browser before the transition. Memory usage is negligible. 
*/
function hintBrowser(){
  nMouseMove += 1;
  console.log(nMouseMove);
  // On mousemove over this player element.
  
  if(this === rockPlayer){
    rockPlayer.classList.add('Z-rock-p');
  } else if(this === paperPlayer){
    paperPlayer.classList.add('Z-paper-p');
  } else {
    scissorsPlayer.classList.add('Z-scissors-p');
  }
  compReady();
}

function compTransition(){
  const comp = computerSelection.toLowerCase();
  if(comp === 'rock'){
    rockComp.classList.add('rock-c-transition');
  } else if(comp === 'paper'){
    paperComp.classList.add('paper-c-transition');
  } else{
    scissorsComp.classList.add('scissors-c-trans');
  }
}

function setPlayerSelect(playerItem){
  if (playerItem === rockPlayer){
    playerSelect = 'rock';
  } else if(playerItem === paperPlayer){
    playerSelect = 'paper';
  } else{
    playerSelect = 'scissors';
  }
}

// Returns true if collision exists.
function DoElementsCollide(){
  const elemOne = chosenPItem.getBoundingClientRect();
  const elemTwo = battleLeft.getBoundingClientRect();
  const elemOneCenterX = elemOne.left + (0.5 * elemOne.width);
  const elemOneCenterY = elemOne.top + (0.5 * elemOne.height);

  return ((elemOneCenterX > elemTwo.left) &&
          (elemOneCenterX < elemTwo.right)) &&
         ((elemOneCenterY > elemTwo.top) &&
          (elemOneCenterY < elemTwo.bottom));
}

function animateBattle(){
  const inBattle = DoElementsCollide();
  console.log('active');
  battleLeft.style.backgroundColor = 
      inBattle && roundWinner === 'player' ? '#00ff0080'
    : inBattle && roundWinner === 'computer' ? '#ff000080'
    : '';
  battleRight.style.backgroundColor =
      inBattle && roundWinner === 'computer' ? '#00ff0080'
    : inBattle && roundWinner === 'player' ? '#ff000080'
    : '';
    if(!battleAnimEnd){
      window.requestAnimationFrame(animateBattle);
    } else{
      battleLeft.style.backgroundColor = '';
      battleRight.style.backgroundColor = '';
    }
}

function battle(){
  const comp = computerSelection.toLowerCase();
  if(playerSelect === comp){
      roundWinner = 'tie';
  } else if(
     (playerSelect === 'rock' && 
      comp === 'scissors') ||
     (playerSelect === 'paper' &&
      comp === 'rock') ||
     (playerSelect === 'scissors' &&
      comp === 'paper')
    ){
      roundWinner = 'player';
  } else{
      roundWinner = 'computer';
  }

  //Transition battleLeft and battleRight.
  animateBattle();
  // Update round message and scoreboard.
  roundResult();
  scoreKeeper();
}

function transitionGo(playerItem, addedClass){
  playerItem.addEventListener('click', () => {
    // Signal verifyXY() game is in play.
    inPlay = true;
    playerItem.classList.add(addedClass);
    compTransition();
    setPlayerSelect(playerItem);
    // Signal to continue animateBattle() inside battle().
    battleAnimEnd = false;
    chosenPItem = playerItem;
    battle();
  });
}


/* Find element by a substring of the selector name:
   `[selectorType*="partialString"]`
   `[selectorType^="beginStringWith"]`
   querySelector(`[selectorType$="endStringWith"]`) 
   Works with querySelector and querySelectorAll.
*/
/* To remove a class:
   Need to edit the element's class string a.k.a. className --
   e.g. class="..." in <div class="class1 class2 class3">.
   1st: Create const (e.g. rmRegEx) with matching RegEx.
     g flag will allow selecting for more than one class per element.
   2nd: Use element.className = element.className.replace(rmRegEx, '')
*/
/* \s* includes the space before the target string in the string to be 
   replaced, if it exists. For first listed class case, would need to check className string beginning and if first listed class matches, then would need to check if second class matches, removing after space if second class doesn't match.
*/
const transitionClass = /\s*\b[a-z]+?-[a-z]-trans[a-z]*\b/g;

function removeTransition(){
  this.className = this.className.replace(transitionClass, '');
}

function roundResult(){
  const playerSelection = capitalize(playerSelect);
  console.log('roundResult test');
  const message = 
    (roundWinner === 'tie') ? `${playerSelection} vs. ${computerSelection}: It\'s a tie!` 
    : (roundWinner === 'player') ? `You win the round! ${playerSelection} beats ${computerSelection}.` 
    : (roundWinner === 'computer') ? `Computer wins the round! ${computerSelection} beats ${playerSelection}.`
    : 'Round Error';

    gCenterBottom.textContent = message;
}

function scoreKeeper(){
  if(roundWinner === 'player'){
    pScore += 1;
    pScoreScore.textContent = pScore;
  } else if(roundWinner === 'computer'){
    cScore += 1;
    cScoreScore.textContent = cScore;
  } else{
    tieScore += 1;
  }
}

function gameWinMsg(){
  const pluralTie =
    (tieScore !== 1) ? 's' 
    : '';

  const message =
    (pScore > cScore) ? `You won the game ${pScore} to ${cScore}, with ${tieScore} tied round${pluralTie}.` 
    : `Computer won the game ${cScore} to ${pScore} with ${tieScore} tied round${pluralTie}.`;
  return message;
}

// For explanation, see transitionClass comment.
const zClass = /\s*\bZ-[a-z]+?-[pc]\b/g;

function cycleRound(compItem){
  let n = 0;
  compItem.addEventListener('transitionend', () => {
    n += 1;
    if(pScore === 3 || cScore === 3){
      gmWinMsgBox.textContent = gameWinMsg();
      newGmModal.style.display = 'block';
    }
    if(n % 2 === 0 && n !== 0){
      const items = document.querySelectorAll('.items');
      items.forEach(item => {
        item.className = item.className.replace(zClass, '');
      });
      // Signal to stop animateBattle().
      battleAnimEnd = true;
      console.log('player select = ' + playerSelect);
      
      roundN += 1;
      roundRound.textContent = roundN;
      // Signal verifyXY() game is not in play.
      inPlay = false;

      
      computerSelection = capitalize(getComputerChoice());
    }
  });
}

function clearBoard(){
  pScore = 0;
  cScore = 0;
  tieScore = 0;
  roundN = 1;

  pScoreScore.textContent = pScore;
  cScoreScore.textContent = cScore;
  roundRound.textContent = roundN;

  gCenterBottom.textContent = '';
  gmWinMsgBox.textContent = '';
}

let nMouseMove = 0;
let playerSelect = '';
let roundWinner = '';
let battleAnimEnd = true;
let chosenPItem;
let inPlay = false;
let computerSelection = capitalize(getComputerChoice());
let pScore = 0;
let cScore = 0;
let tieScore = 0;
let roundN = 1;
/***************************************************************/

startButton.addEventListener('click', () => {
  playRound();
  startModal.style.display = 'none';
})

ngButton.addEventListener('click', () => {
  clearBoard();
  newGmModal.style.display = 'none';
})

function playRound() {
  
  // x/y double check and reset in the event the browser resizes.
  verifyXY();

  // Hint the browser: "will-change: transform" for player and computer.
  
  rockPlayer.addEventListener('mousemove', hintBrowser);
  paperPlayer.addEventListener('mousemove', hintBrowser);
  scissorsPlayer.addEventListener('mousemove', hintBrowser);



  /* onclick, transition playerItem, computer selected item, and battle 
     backgrounds.
     Also sets playerSelect to 'rock', 'paper', or 'scissors' then 
     calls battle():
      which sets roundWinner to 'tie', 'player' or 'computer';
      displays the round win message, and updates the scoreboard.
  */
  transitionGo(rockPlayer, 'rock-p-transition');
  transitionGo(paperPlayer, 'paper-p-transition');
  transitionGo(scissorsPlayer, 'scissors-p-trans');



  const items = document.querySelectorAll('.items');
  items.forEach(item => item.addEventListener('transitionend', removeTransition));

  
  cycleRound(rockComp);
  cycleRound(paperComp);
  cycleRound(scissorsComp);
  
  
}


/* OLD playRound
function playRound(round) {
  const playerInput = 
    (round === 'One') ? prompt(`Round ${round}: Best out of five rounds. \nPlease type your selection: rock, paper, or scissors.`) 
    : prompt(`Round ${round}: \nPlease type your selection: rock, paper, or scissors.`);
  // Pressing the prompt cancel button returns null.
  if(playerInput === null) { 
    return 'Game canceled.';
  } 
    
  const playerSelection = capitalize(playerInput);
  if(playerSelection !== 'Rock' && 
    playerSelection !== 'Paper' && 
    playerSelection !== 'Scissors'
    ) {
      // Without round here, the recursive prompt message will always 
      // display "Round undefined", and always in the default ternary 
      // prompt. See "const playerInput" declaration.
      return playRound(round);
  } 

  const computerSelection = capitalize(getComputerChoice());
    
  const message = 
    (playerSelection === computerSelection) ? 'It\'s a tie!' 
    : ((playerSelection === 'Rock' && 
      computerSelection === 'Scissors') || 
      (playerSelection === 'Paper' && 
      computerSelection === 'Rock') ||
      (playerSelection === 'Scissors' && 
      computerSelection === 'Paper')
      ) ? `You win the round! ${playerSelection} beats ${computerSelection}.` 
    : `Computer wins the round! ${computerSelection} beats ${playerSelection}.`;
    
  return message;
}
*/

function game() {
  let playerScore = 0;
  let computerScore = 0;
  let tieScore = 0;

  for(let i = 0; i < 5; i++) {
    let round =
      (i === 0) ? 'One' 
      : (i === 1) ? 'Two' 
      : (i === 2) ? 'Three' 
      : (i === 3) ? 'Four' 
      : 'Five';

    let winner = playRound(round);
    if(winner === 'Game canceled.') {
      return 'Game canceled.';
    }
    console.log(`Round ${round}: ${winner}`);
        
    (winner.slice(0, 7) === 'You win') ? playerScore++ 
    : (winner.slice(0, 8) === 'Computer') ? computerScore++ 
    : tieScore++;
  }

  const pluralTie =
    (tieScore !== 1) ? 's' 
    : '';
  const oneWinPlural = 
    (playerScore !== 1) ? 's'
    : '';

  const gameWinMessage =
    (playerScore > computerScore) ? `You won the game ${playerScore} to ${computerScore}, with ${tieScore} tied round${pluralTie}.` 
    : (computerScore > playerScore) ? `Computer won the game ${computerScore} to ${playerScore} with ${tieScore} tied round${pluralTie}.` 
    : `You tied the game with the computer with each of you winning ${playerScore} round${oneWinPlural} and tying ${tieScore} round${pluralTie}.`;

  return gameWinMessage;
}

