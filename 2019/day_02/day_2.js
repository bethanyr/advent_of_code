let fs = require('fs');

let array = fs.readFileSync('day_2_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));

function main(array) {
    array[1] = 12;
    array[2] = 2;
    for (let i = 0; i < array.length; i+= 4) {
        let opCode = array[i];
        if (opCode == 1) {
            let sum = array[array[i+1]] + array[array[i + 2]];
            array[array[i + 3]] = sum;
        }
        if (opCode == 2) {
            let multi = array[array[i+1]] * array[array[i + 2]];
            array[array[i + 3]] = multi;
        }
        if (opCode == 99) {
            break;
        }
    }
    return array[0];
} 
// let array = [2,3,0,3,99]

console.log(main(array));