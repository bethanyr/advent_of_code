let fs = require('fs');

let array = fs.readFileSync('day_2_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));

function main(array) {
    const TARGET_OUTPUT = 19690720;
    array[1] = 59;
    array[2] = 36;
    let originalArray = array.slice();

    
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
    console.log(array[0]);
    console.log(originalArray[0]);
    let noun = array[1];
    let verb = array[2];
    let result = array[0];
    if (result < TARGET_OUTPUT) {
        console.log('here', TARGET_OUTPUT - result);
        
    } else {
        console.log('not', TARGET_OUTPUT - result);
    }
    return 100 * noun + verb;
} 
// let array = [2,3,0,3,99]

console.log(main(array));