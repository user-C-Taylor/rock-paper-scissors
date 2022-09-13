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

function getElem(classOrId){
  return document.querySelector(classOrId);
}

function adder(id, initialClasses, type, text, parent, url) {
  const elem = document.createElement(type);
  if(id) elem.setAttribute('id', id);
  if(initialClasses) elem.setAttribute('class', initialClasses);
  if(text) elem.textContent = text;
  if(type === 'img') elem.setAttribute('draggable', 'false');
  if(type === 'img' && url) elem.setAttribute('src', url);
  parent.appendChild(elem);
  return elem;
}

const gameLeft = getElem('.game-left');
const gameRight = getElem('.game-right');

const rockPlayer = adder('rock-player', 'items', 'img', '', gameLeft, 'images/stone-143-130.png')
const paperPlayer = adder('paper-player', 'items', 'img', '', gameLeft, 'images/paper-114-150.png');
const scissorsPlayer = adder('scissors-player', 'items', 'img', '', gameLeft, 'images/scissors-75-130.png');
const rockComp = adder('rock-comp', 'items', 'img', '', gameRight, 'images/stone-143-130.png');
const paperComp = adder('paper-comp','items', 'img', '', gameRight, 'images/paper-114-150.png');
const scissorsComp = adder('scissors-comp', 'items', 'img', '', gameRight, 'images/scissors-75-130.png');

const targetPlayer = getElem('#target-player');
const targetComp = getElem('#target-comp');


const battleLeft = getElem('.battle-left');
const battleRight = getElem('.battle-right');
const gCenterBottom = getElem('.g-center-bottom');
const pScoreScore = getElem('.p-score-score');
const cScoreScore = getElem('.c-score-score');
const roundRound = getElem('.round-round');

const startModal = adder('startModal', 'modal', 'div', '', document.body, '');
const stModalContent = adder('', 'st-modal-content', 'div', '', startModal, '');
const intro = adder('intro', '', 'div', 'First to five points.', stModalContent, '');
const startButton = adder('startButton', '', 'button', 'Play Game', stModalContent, '');

const newGmModal = adder('newGmModal', 'modal', 'div', '', document.body, '');
const ngModalContent = adder('', 'ng-modal-content', 'div', '', newGmModal, '');
const gmWinMsgBox = adder('gmWinMsgBox', '', 'div', '', ngModalContent, '');
const ngButton = adder('ngButton', '', 'button', 'New Game', ngModalContent, '');

const decoy = adder('decoy', '', 'div', '', document.body, '');

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

function noDrag() {
  const items = document.querySelectorAll('.items');
  if (/(firefox)/i.test(navigator.userAgent)) {
    items.forEach(item => 
      item.addEventListener('dragstart', e => e.preventDefault()
    ));
  }
}
noDrag();

document.oncontextmenu = new Function("return false;");

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

// probably needs to be in queue
function setPlayerSelect(playerItem){
  if (playerItem === rockPlayer){
    playerSelect = 'rock';
  } else if(playerItem === paperPlayer){
    playerSelect = 'paper';
  } else{
    playerSelect = 'scissors';
  }
}


function transitionGo(playerItem, addedClass){
  playerItem.addEventListener('click', () => {
    queueN += 1;
    // Preserve queueN specific to lexical context of round click event.
    let m = queueN;
    function queue(){
      // Verify previous round is complete. Must be declared within 
      // click event lexical context to access m and playerItem.
      if(m > (n/2 || inPlay)){
        window.requestAnimationFrame(queue);
      } else if(pScore < gmWinN && cScore < gmWinN){
        /* If game is not finished:
           On click sequence initiated after doElementsCollide(), 
           animateBattle() and battle() are declared.
        */

        // Returns true if collision exists.
        function doElementsCollide(){
          const elemOne = playerItem.getBoundingClientRect();
          const elemTwo = battleLeft.getBoundingClientRect();
          const elemOneCenterX = elemOne.left + (0.5 * elemOne.width);
          const elemOneCenterY = elemOne.top + (0.5 * elemOne.height);

          return ((elemOneCenterX > elemTwo.left) &&
                  (elemOneCenterX < elemTwo.right)) &&
                ((elemOneCenterY > elemTwo.top) &&
                  (elemOneCenterY < elemTwo.bottom));
        }

        function animateBattle(){
          const inBattle = doElementsCollide();
          console.log('active');
          battleLeft.style.backgroundColor = 
              inBattle && roundWinner === 'player' ? '#00ff0060'
            : inBattle && roundWinner === 'computer' ? '#ff000060'
            : '';
          battleRight.style.backgroundColor =
              inBattle && roundWinner === 'computer' ? '#00ff0060'
            : inBattle && roundWinner === 'player' ? '#ff000060'
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

        // Signal verifyXY() and queue() game is in play.
        inPlay = true;
        playerItem.classList.add(addedClass);
        decoy.classList.add('decoy-o-transition');
        compTransition();
        setPlayerSelect(playerItem);
        // Signal to continue animateBattle() inside battle().
        battleAnimEnd = false;
        // deprecated: chosenPItem = playerItem;
        battle();
        if(pScore < gmWinN && cScore < gmWinN) roundN += 1;
      } else{
        // Clear queue of clicks in excess of game length.
        return;
      }
    }
    queue();
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
  } else if(roundWinner === 'tie'){
    tieScore += 1;
  } else {
    console.log('scorekeeper error');
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

/* decoy was chosen as the target for the event listener as it has only 
   one transitioning property. This prevents cycleRound() from 
   unexpectedly firing additional times -- early, for example. An early 
   firing of cycleRound() will switch inPlay to false, which can result 
   in resetXY firing while an item is in mid-transition. Other issues 
   are also created when cycleRound fires at the wrong time.
*/
function cycleRound(){
  decoy.addEventListener('transitionend', () => {
    n += 1;
    if(pScore === gmWinN || cScore === gmWinN){
      gmWinMsgBox.textContent = gameWinMsg();
      newGmModal.style.display = 'block';
    }
    if(n % 2 === 0 && n !== 0){
      const items = document.querySelectorAll('.items');
      items.forEach(item => {
        item.className = item.className.replace(zClass, '');
      });

      if(pScore === gmWinN || cScore === gmWinN){
        ngModalContent.style.display = 'block';
      }

      // Signal to stop animateBattle().
      battleAnimEnd = true;
      
      roundRound.textContent = roundN;
      
      computerSelection = capitalize(getComputerChoice());
      // Signal verifyXY() and queue() game is not in play.
      inPlay = false;
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
  setTimeout(() => {
    gmWinMsgBox.textContent = '';
  }, 250);
  
}

let nMouseMove = 0;
// gmWinN sets number of round wins needed to win the game.
let gmWinN = 3;
let playerSelect = '';
let roundWinner = '';
let battleAnimEnd = true;
let inPlay = false;
let computerSelection = capitalize(getComputerChoice());
let pScore = 0;
let cScore = 0;
let tieScore = 0;
let roundN = 1;
let queueN = -1;
let n = 0;
/***************************************************************/

startButton.addEventListener('click', () => {
  playRound();
  setTimeout(() => {
    startModal.style.display = 'none';
  }, 200);
})

ngButton.addEventListener('click', () => {
  clearBoard();
  setTimeout(() => {
    newGmModal.style.display = 'none';
    ngModalContent.style.display = 'none';
  }, 200);
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
  decoy.addEventListener('transitionend', removeTransition);

  
  cycleRound();

  
  
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

