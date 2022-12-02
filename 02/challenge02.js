import input from './input.js';

// const input = `
// A Y
// B X
// C Z
// `;

/* 
Moves:
  A: Rock
  B: paper
  C: scissor
*/

const scores = {
  rock: 1, 
  paper: 2,
  scissor: 3,
  X: 0,  // loss
  Y: 3,  // draw
  Z: 6,  // win
}

const rules = {
  A: { // Rock
    X: 'scissor', // loss
    Y: 'rock',    // draw
    Z: 'paper',   // win
  },
  B: { // Paper
    X: 'rock',    // loss
    Y: 'paper',   // drawr
    Z: 'scissor', // win
  },
  C: { // scissor
    X: 'paper',   // loss
    Y: 'scissor', // drawr
    Z: 'rock',    // win
  }
}


function getRoundScore(roundSetup) {
  // console.log(roundSetup)
  const [opponentMove, desiredOutcome] = roundSetup.split(' ');
  const myMove = rules[opponentMove][desiredOutcome]
  // console.log(myMove)
  const score = scores[desiredOutcome] + scores[myMove];
  // console.log(score)
  return score;
}

const sum = (a,b)=>a+b;

const totalScore = input
  .split('\n')
  .filter(x=>x!=='')
  .map(getRoundScore)
  .reduce(sum,0);

console.log(totalScore);


