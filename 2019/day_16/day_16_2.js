let fs = require('fs');

let input = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_16/day_16_input.txt').toString().split("\n")[0]

const PATTERN = [0, 1, 0, -1];

function main(input) {
    let numbers = input.toString().split('').map((item) => parseInt(item));
    let messageOffset = parseInt(numbers.slice(0,7).join(''));

    let largeNumbers = increaseNumbers(numbers, messageOffset);

    console.log(largeNumbers.length);
    let result = new Array(largeNumbers.length);
    for (let j = 0; j < 100; j++) {
        result[largeNumbers.length - 1] = largeNumbers[largeNumbers.length - 1];
        for (let i = largeNumbers.length - 2; i >= 0; i--) {
            result[i] = (result[i + 1] + largeNumbers[i]) % 10;
        }
        largeNumbers = result.splice(0);
    }
    
    
    console.log('result', largeNumbers.slice(0, 8).join(''));
    
}

function increaseNumbers(numbers, offset) {
    // build last part of numbers as starting point.
    let result = new Array(numbers.length * 10000 - offset);
    let i = result.length - 1;
    while (i >= 0) {
        for (let j = numbers.length - 1; j >= 0; j--) {
            result[i] = numbers[j]; 
            i--;
            if (i < 0) {
                break;
            }
        }
    }

    //9489
    return result;
}

function buildPattern(numbers) {
    let patternMaster = new Array(numbers.length);
    let patternNum;
    for (let i = 0; i < numbers.length; i++) {
        let patternRepeat = new Array(numbers.length + 1);
        patternNum = 0;
        let j = 0;
        while(j <= numbers.length) {
            for (let k = 0; k <= i; k++) {
                patternRepeat[j] = PATTERN[patternNum];
                j++;
                if (j == numbers.length + 1) {
                    break;
                }
            }     
            patternNum++;
            if (patternNum == 4) {
                patternNum = 0;
            }
        }
        patternMaster[i] = patternRepeat;
    }
    return patternMaster;
}

// let input = '69317163492948606335995924319873';
// let input = '12345678';
// let input = '03081770884921959731165446850517';
main(input);