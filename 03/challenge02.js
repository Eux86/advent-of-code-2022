import input from './input.js'

function findDuplicated(first,second,third) {
  for (let item of first) {
    if (second.includes(item) && third.includes(item)) return item;
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

const items = input.split('\n')
  .filter(x=>x!=='')
  .reduce((acc, curr, index)=>{
    if (index%3 === 0) acc.push([]);
    acc[acc.length-1].push(curr);
    return acc;
  }, [])
  .map(x=>toPriorityValue(findDuplicated(x[0], x[1], x[2])))

const sum = (a,b)=>a+b;
console.log(items.reduce(sum,0));