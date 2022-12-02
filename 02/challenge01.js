import input from './input.js';

/* const input = `
A Y
B X
C Z
`; */


/* 
Moves:
  A: Rock
  B: paper
  C: scissor
*/

const scores = {
  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissor
  loss: 0,
  draw: 3,
  win: 6,
}

const rules = {
  A: { // Rock
    X: 'draw',   // rock
    Y: 'win',    // paper
    Z: 'loss',   // scissor
  },
  B: { // Paper
    X: 'loss',   // rock
    Y: 'draw',   // paper
    Z: 'win',    // scissor
  },
  C: { // scissor
    X: 'win',    // rock
    Y: 'loss',   // paper
    Z: 'draw',   // scissor
  }
}


function getRoundScore(roundSetup) {
  const [opponentMove, myMove] = roundSetup.split(' ');
  const outcome = rules[opponentMove][myMove]
  const score = scores[myMove] + scores[outcome];
  return score;
}

const sum = (a,b)=>a+b;

const totalScore = input
  .split('\n')
  .filter(x=>x!=='')
  .map(getRoundScore)
  .reduce(sum,0);

console.log(totalScore);


