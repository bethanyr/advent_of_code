let fs = require('fs');

// let input = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_16/day_16_input.txt').toString().split("\n")[0]

const PATTERN = [0, 1, 0, -1];

function main(input) {
    let numbers = input.toString().split('').map((item) => parseInt(item));
    console.log('input length', numbers.length);
    // console.log(numbers);
    let patternMaster = new Array(numbers.length);
    let patternNum = 0;
    let result = new Array(numbers.length);
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
    
    // console.log('patternRepeat', patternMaster);
    result = numbers.splice(0);
    for (let phase = 0; phase < 100; phase++) {
        numbers = result.splice(0);
        for (j = 0; j < numbers.length; j++) {
            let total = 0;
            let patternRepeat = patternMaster[j];
            for (let i = 0; i < numbers.length; i++) {
                total = total + numbers[i] * patternRepeat[i + 1];
            }
            result[j] = Math.abs(total) % 10;;
        }
        console.log('result', result.slice(16,32).join(' '), phase);
    }
    
    // console.log(result.slice(0,8).join(''));
    // console.log(result[69]);
    // console.log('guess', result.slice(25,32).join('') + result.slice(0,1).join(''));
    
}

let input = '03036732577212944063491565474664';
// let input = '1111111111'
main(input);