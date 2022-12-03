import input from './input.js'

function findDuplicated(first,second) {
  for (let item of first) {
    if (second.includes(item)) return item;
  }
}

function toPriorityValue(char) {
  const charValue = char.charCodeAt(0);
  const AValue = 'A'.charCodeAt(0);
  const ZValue = 'Z'.charCodeAt(0);
  const aValue = 'a'.charCodeAt(0);
  const zValue = 'z'.charCodeAt(0);
  if (charValue >= AValue && charValue <= ZValue){
    return charValue - AValue +27;
  }
  if (charValue >= aValue && charValue <= zValue){
    return charValue - aValue +1;
  }
}

const duplicates = input.split('\n')
  .filter(x=>x!=='')
  .map(x=>{
    const middleIndex = x.length/2;
    const first = x.slice(0,middleIndex);
    const second = x.slice(middleIndex,x.length);
    // console.log(first+' - '+second)
    return findDuplicated(first,second);
  })
  .map(x => toPriorityValue(x[0]));

const sum = (a,b)=>a+b;
console.log(duplicates.reduce(sum, 0));