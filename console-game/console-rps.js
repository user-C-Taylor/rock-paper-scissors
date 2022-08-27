// Pseudo code.
// Take in a user choice (rock, paper, or scissors).
// Generate a computer choice (rock, paper, scissors).
// Function playRound takes user choice and computer choice and returns 
// results of the round.
// Function game calls playRound to play a five round game and reports 
// the winner.

function getComputerChoice() {
    const choice = Math.floor(Math.random() * 3);
    
    const message =
        (choice === 0) ? 'rock' :
        (choice === 1) ? 'paper' :
        'scissors'; 
    return message;
}

function capitalize(string) {
    const first = string.slice(0,1);
    const rest = string.slice(1);

    const capitalized = `${first.toUpperCase()}${rest.toLowerCase()}`;
    return capitalized;
}

function playRound(round) {
    const playerInput = 
        (round === 'One') ? prompt(`Round ${round}: Best out of five rounds. \nPlease type your selection: rock, paper, or scissors.`) :
        prompt(`Round ${round}: \nPlease type your selection: rock, paper, or scissors.`);
    // Pressing the prompt cancel button returns null.
    if(playerInput === null) { 
        return 'Game canceled.';
    } 
    
    const playerSelection = capitalize(playerInput);
    if(playerSelection !== 'Rock' && playerSelection !== 'Paper' && playerSelection !== 'Scissors') {
        // Without round here, the recursive prompt message will  
        // always display "Round undefined", and always in the default 
        // ternary prompt. See "const playerInput" declaration.
        return playRound(round);
    } 

    const computerSelection = capitalize(getComputerChoice());
    
    const message = 
        (playerSelection === computerSelection) ? 'It\'s a tie!' :
        ((playerSelection === 'Rock' && computerSelection === 'Scissors') || 
        (playerSelection === 'Paper' && computerSelection === 'Rock') ||
        (playerSelection === 'Scissors' && computerSelection === 'Paper')
        ) ? `You win the round! ${playerSelection} beats ${computerSelection}.` :
        `Computer wins the round! ${computerSelection} beats ${playerSelection}.`;
    
    return message;
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    let tieScore = 0;

    for(let i = 0; i < 5; i++) {
        let round =
        (i === 0) ? 'One' :
        (i === 1) ? 'Two' :
        (i === 2) ? 'Three' :
        (i === 3) ? 'Four' :
        'Five';

        let winner = playRound(round);
        if(winner === 'Game canceled.') {
            return 'Game canceled.';
        }
        console.log(`Round ${round}: ${winner}`);
        
        (winner.slice(0, 7) === 'You win') ? playerScore++ :
        (winner.slice(0, 8) === 'Computer') ? computerScore++ :
        tieScore++;
    }

    const pluralTie =
    (tieScore !== 1) ? 's' :
    '';

    const gameWinMessage =
    (playerScore > computerScore) ? `You won the game ${playerScore} to ${computerScore}, with ${tieScore} tied round${pluralTie}.` :
    (computerScore > playerScore) ? `Computer won the game ${computerScore} to ${playerScore} with ${tieScore} tied round${pluralTie}.` :
    `You tied the game with the computer with each of you winning ${playerScore} rounds and tying ${tieScore} round${pluralTie}.`;

    return gameWinMessage;
}

