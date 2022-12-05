import input, {initialState} from './input.js'

console.log(initialState.join('\n'));
console.log('---------------- Initial');
const totalItems = initialState.reduce((acc, curr)=>acc+=curr.length, 0);
const topCrates = input.split('\n')
    .filter(x=>x!=='')
    .reduce((acc, curr, index)=>{
        const [,quantityString, fromString, toString] = /move (\d+) from (\d+) to (\d+)/g.exec(curr);
        const quantity = +quantityString;
        const fromIndex = +fromString -1;
        const toIndex = +toString -1;
        const startSlice = acc[fromIndex].length - quantity;
        const endSlice = startSlice + quantity;
        const moving = acc[fromIndex].slice(startSlice, endSlice);
        acc[fromIndex] = acc[fromIndex].slice(0, acc[fromIndex].length-quantity);
        acc[toIndex] = acc[toIndex]+moving;
        console.log('\n');
        console.log(`#${index}: Moved ${quantity} from ${fromString} to ${toString}`)
        console.log('-------------------');
        console.log(acc.join('\n'));
        if (initialState.reduce((acc, curr)=>acc+=curr.length, 0) != totalItems) throw new Error('Items lost')
        return acc;
    }, initialState)
    .map(x=>x[x.length-1])

console.log('\n\nresult:', topCrates.join(''))
