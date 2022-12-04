import input from './input.js'

const toListOfNumbers = (list => list.map(x=>+x));

const overlapping = input.split('\n')
  .filter(x=>x!=='')
  .reduce((acc, x)=>{
    const [elf1, elf2] = x.split(',');
    const range1 = toListOfNumbers(elf1.split('-'));
    const range2 = toListOfNumbers(elf2.split('-'));
    const isOverlapping = overlap(range1, range2);
    // console.log(range1, range2, isOverlapping);
    if (isOverlapping) return acc+1;
    return acc;
  }, 0)

console.log(overlapping);

function overlap(range1, range2) {
  const range1StartsBefore = range1[0]<=range2[0];
  if (range1StartsBefore){
    const range2startsBeforeRange1ends = range2[0]<=range1[1]
    if (range2startsBeforeRange1ends) return true;
  }
  const range2StartsBefore = range2[0]<=range1[0];
  if (range2StartsBefore) {
    const range1startsBeforeRange2ends = range1[0]<=range2[1]
    if (range1startsBeforeRange2ends) return true;
  }
  return false;  
}





// Tests
const cases = [
  [[2,3],[4,5], false],
  [[4,5],[2,3], false],
  [[4,8],[6,9], true],
  [[2,3],[1,4], true],
  [[1,5],[2,3], true],
  [[2,3],[2,3], true],
  [[2,2],[2,2], true],
  [[60,60],[45,60], true],
  [[36,36],[36,84],true],
]
cases.forEach(([range1, range2, expectedResult])=> {
  const result = overlap(range1, range2);
  if (result !== expectedResult) throw new Error(`${range1} ${range2} ${expectedResult} ${result}`)
  console.log("test ok")
})
