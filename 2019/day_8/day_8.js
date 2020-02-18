let fs = require('fs');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_8_input.txt').toString().split("\n")[0];

// let array = '123456789012'

function main(array) {
    let layers = new Array();
    let minDigits = Number.MAX_SAFE_INTEGER;
    let minDigitLayer;
    let result = 0;
    let i = 0;
    while(i < array.length) {
        let layer = new Array(10).fill(0);
        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 25; column++) {
                let dig = parseInt(array[i]);
                layer[dig] = layer[dig] + 1;
                i++;
            }
        } 
        if (layer[0] < minDigits) {
            minDigits = layer[0];
            result = layer[1] * layer[2];
        }
    }
    return result;
}
console.log(main(array));