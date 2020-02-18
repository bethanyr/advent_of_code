// let fs = require('fs');

// let array = fs.readFileSync('day_4_input.txt').toString().split("\n");

function main() {
    const PUZZLE_MIN = 264360
    const PUZZLE_MAX = 746325

    let passwordMatch = 0;

    for (let i = PUZZLE_MIN; i <= PUZZLE_MAX; i++) {
        passwordMatch += checkPasswordCriteria(i);
    }

    return passwordMatch;
}

function checkPasswordCriteria(password) {
    // 2 adjacent digits are same
    // going from left to right - digits are either the same or increase
    let sameDigits = new Array(10).fill(0);

    let test = password.toString();
    for (let i = 1; i < test.length; i++) {
        let prev = test[i-1];
        let cur = test[i];
        if (prev == cur) {
            sameDigits[prev] += 1;
        }
        else if (prev > cur) {
            // decreasing digits
            return 0;
        }
    }
    let manyDigits = false
    for (let i = 0; i < sameDigits.length; i++ ){
        if (sameDigits[i] == 1) {
            return 1;
        } else if (sameDigits[i] > 1) {
            manyDigits = true;
        }
    }

    return 0;
}

console.log(main());

// 
// console.log(checkPasswordCriteria(112233));