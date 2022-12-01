import input from './input.js';

const values = input.split('\n');

let elfIndex = 0;
const caloriesByElf = values.reduce((acc, curr)=> {
  if (curr === '') {
    elfIndex++;
    acc.push([]);
    return acc;
  }
  acc[elfIndex-1].push(+curr)
  return acc;
}, [])

const add = (a, b) => a+b;
const totalCaloriesByElf = caloriesByElf.map(x=>x.reduce(add, 0))

console.log(totalCaloriesByElf);
console.log(Math.max(...totalCaloriesByElf))