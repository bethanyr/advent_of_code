const intComputer = require('./day_9');

test('using position mode, should return 1 when input == 8', () => {
    let array = [3,9,8,9,10,9,4,9,99,-1,8];
    let input = 8;
    expect(intComputer(array, input)).toEqual([1]);
})

test('using position mode, should return 0 when input != 8', () => {
    let array = [3,9,8,9,10,9,4,9,99,-1,8];
    let input = 4;
    expect(intComputer(array, input)).toEqual([0]);
})

test('using position mode input is less than 8', () => {
    let array = [3,9,7,9,10,9,4,9,99,-1,8];
    let input = 4;
    expect(intComputer(array, input)).toEqual([1]);
})

test('using position mode input is greater than 8', () => {
    let array = [3,9,7,9,10,9,4,9,99,-1,8];
    let input = 9;
    expect(intComputer(array, input)).toEqual([0]);
})

test('using immediate mode input is equal to 8', () => {
    let array = [3,3,1108,-1,8,3,4,3,99];
    let input = 8;
    expect(intComputer(array, input)).toEqual([1]);
})

test('using immediate mode input is not equal to 8', () => {
    let array = [3,3,1108,-1,8,3,4,3,99];
    let input = 9;
    expect(intComputer(array, input)).toEqual([0]);
})

test('using immediate mode input is less than 8', () => {
    let array = [3,3,1107,-1,8,3,4,3,99];
    let input = 5;
    expect(intComputer(array, input)).toEqual([1]);
})

test('using immediate mode input is greater than 8', () => {
    let array = [3,3,1107,-1,8,3,4,3,99];
    let input = 9;
    expect(intComputer(array, input)).toEqual([0]);
})

test('using position mode test input and output, input 0', () => {
    let array = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9];
    let input = 0;
    expect(intComputer(array, input)).toEqual([0]);
})

test('using position mode test input and output, input 22', () => {
    let array = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9];
    let input = 22;
    expect(intComputer(array, input)).toEqual([1]);
})

test ('larger input instructions, less than 8', () => {
    let array = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
        1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
        999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
    let input = 3;
    expect(intComputer(array, input)).toEqual([999]);
})

test ('larger input instructions, equal to 8', () => {
    let array = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
        1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
        999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
    let input = 8;
    expect(intComputer(array, input)).toEqual([1000]);
})

test ('larger input instructions, greater than 8', () => {
    let array = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
        1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
        999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
    let input = 20;
    expect(intComputer(array, input)).toEqual([1001]);
})
const fs = require('fs');
test ('day 5 part 1 test still passes', () => {
    let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_5_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));

    let input = 1;

    expect(intComputer(array, input)).toEqual([0,0,0,0,0,0,0,0,0,11933517]);
})
test ('day 5 part 2 test still passes', () => {
    let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_5_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));

    let input = 5;

    expect(intComputer(array, input)).toEqual([10428568]);
})

test ('day 9 input test, produces copy of itself as output', () => {
    let array = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
    let input = 0;

    expect(intComputer(array, input)).toEqual([109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]);
})

test ('day 9 input test, produces 16 digit number', () => {
    let array = [1102,34915192,34915192,7,4,7,99,0];
    let input = 0;

    expect(intComputer(array, input)).toEqual([1219070632396864]);
})

test ('day 9 part 1', () => {
    let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_9_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));

    let input = 1;

    expect(intComputer(array, input)).toEqual([2316632620]);
})

test ('day 9 part 2', () => {
    let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_9_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));

    let input = 2;

    expect(intComputer(array, input)).toEqual([78869]);
})

// test ('day 11 part 1', () => {
//     let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_11_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));

//     let input = 0;

//     expect(intComputer(array, input)).toEqual([0,1]);
// })