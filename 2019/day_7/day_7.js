let fs = require('fs');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_7_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));

// let array = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
    // -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
    // 53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10]
function intComputer(array, inputs, iPointer = 0) {
    let i = iPointer;
    let result;
    //console.log('array', array);
    while(i < array.length) {
        
        let instruction = array[i].toString();
        
        // console.log('instruction', instruction);
        let opCode = parseInt(instruction.slice(instruction.length - 2));
        let param = instruction.slice(0,instruction.length - 2);
        // console.log('opcode', opCode);

        if (opCode == 1) {
            let a,b;
            if (param == '1') {
                a = 1;
                b = 0;
            } else {
                a = parseInt(param[1] || 0);
                b = parseInt(param[0] || 0);
            }
            
            // console.log('a', a);
            // console.log('b', b);
            //let c = param.length == 0 ? 0 : 1;
         
            let suma = a == 0 ? array[array[i + 1]] : array[i + 1];
            let sumb = b == 0 ? array[array[i + 2]] : array[i + 2];
            
            let sum = suma + sumb;

            if (isNaN(sum)) {
                console.log('i', i, array[i + 2], array[array[i+2]], instruction);
                console.log('suma', a, suma,array[i+1]);
                console.log('sumb', b, sumb);
            }
            array[array[i + 3]] = sum;
            i = i + 4;
        }
        if (opCode == 2) {
            let a,b;
            if (param == '1') {
                a = 1;
                b = 0;
            } else {
                a = parseInt(param[1] || 0);
                b = parseInt(param[0] || 0);
            }
            //let c = param.length == 0 ? 0 : 1;
            a = a == 0 ? array[array[i + 1]] : array[i + 1];
            b = b == 0 ? array[array[i + 2]] : array[i + 2];
            let multi = a * b;
            
            if (isNaN(multi)) {
                console.log('a', a);
                console.log('b', b);
            }
            // console.log('multi', multi);
            array[array[i + 3]] = multi;
            i = i + 4;
        }
        if (opCode == 3) {
            
            if (inputs.length > 0) {
                array[array[i + 1]] = inputs.shift();
            } else {
                let val = array[i+1];
                console.log('val', val);
                array[val] = val;
                
            }
            
            i = i + 2;
        }
        if (opCode == 4) {
            // console.log('i', i);
            
            if (param.length == 0 ) {
                let val = array[i+1];
                // console.log('i', i)
                //console.log('array[i+1', array)
                // console.log('output', array[val]);
                result = array[val];
                
            } else if (param == '1') {
                // console.log('output2', array[i+1]);
                result = array[i + 1];
            }
            i = i + 2;
            return {result: result, final: false, iPointer: i, array: array.slice()};
            
        }
        if (opCode == 5) {
            let a,b;
            if (param == '1') {
                a = 1;
                b = 0;
            } else {
                a = parseInt(param[1] || 0);
                b = parseInt(param[0] || 0);
            }
            //let c = param.length == 0 ? 0 : 1;
            paramOne = a == 0 ? array[array[i + 1]] : array[i + 1];
            paramTwo = b == 0 ? array[array[i + 2]] : array[i + 2];
            if (paramOne != 0) {
                i = paramTwo;
            } else {
                i = i + 3;
            }
        }
        if (opCode == 6) {
            let a,b;
            if (param == '1') {
                a = 1;
                b = 0;
            } else {
                a = parseInt(param[1] || 0);
                b = parseInt(param[0] || 0);
            }
            //let c = param.length == 0 ? 0 : 1;
            paramOne = a == 0 ? array[array[i + 1]] : array[i + 1];
            paramTwo = b == 0 ? array[array[i + 2]] : array[i + 2];
            if (paramOne == 0) {
                i = paramTwo;
            } else {
                i = i + 3;
            }
        }
        if (opCode == 7) {
            let a,b;
            if (param == '1') {
                a = 1;
                b = 0;
            } else {
                a = parseInt(param[1] || 0);
                b = parseInt(param[0] || 0);
            }
            //let c = param.length == 0 ? 0 : 1;
            paramOne = a == 0 ? array[array[i + 1]] : array[i + 1];
            paramTwo = b == 0 ? array[array[i + 2]] : array[i + 2];
            // paramOne = array[i + 1];
            // paramTwo = array[i + 2];
            array[array[i + 3]] = paramOne < paramTwo ? 1 : 0;
            i = i + 4;
        }
        if (opCode == 8) {
            let a,b;
            if (param == '1') {
                a = 1;
                b = 0;
            } else {
                a = parseInt(param[1] || 0);
                b = parseInt(param[0] || 0);
            }
            //let c = param.length == 0 ? 0 : 1;
            paramOne = a == 0 ? array[array[i + 1]] : array[i + 1];
            paramTwo = b == 0 ? array[array[i + 2]] : array[i + 2];
            array[array[i + 3]] = paramOne == paramTwo ? 1 : 0;
            i = i + 4;
        }
        if (opCode == 99) {
            //break;
            return {result: result, final: true, iPointer: -1, array: array.slice()};
        }
    }
}
function main(originalArray) {
    // array[1] = 12;
    // array[2] = 2;
    // console.log('array length', array.length);
    // console.log('array', array);
    
    let maxResult = 0;
    let maxSequence;
    
    let sequences = buildSequence();
    // console.log(sequences);
    let machines = [
        {id: 0, initial: true, result: {}},
        {id: 1, initial: true, result: {}},
        {id: 2, initial: true, result: {}},
        {id: 3, initial: true, result: {}},
        {id: 4, initial: true, result: {}}
    ]

    for (let j = 0; j < sequences.length; j++ ) {
        // loop through each of the possible sequence combinations
        let machines = new Map();
        let inputResult = 0;
        let result = {};
        machines.set(0, {result: 0, final: false, iPointer: 0, initial: true, array: originalArray.slice()});
        machines.set(1, {result: 0, final: false, iPointer: 0, initial: true, array: originalArray.slice()});
        machines.set(2, {result: 0, final: false, iPointer: 0, initial: true, array: originalArray.slice()});
        machines.set(3, {result: 0, final: false, iPointer: 0, initial: true, array: originalArray.slice()});
        machines.set(4, {result: 0, final: false, iPointer: 0, initial: true, array: originalArray.slice()});
        
        while(!result.final) {
            for (let i = 0; i < sequences[j].length; i++) {
                phase = parseInt(sequences[j][i]);
                let machine = machines.get(i);
                let input = [];
                if (machine.initial) {
                    input.push(phase);
                } 
                input.push(inputResult);
                
                result = intComputer(machine.array,input, machine.iPointer);
                if (result.final) {
                    let t = machines.get(4);
                    result.result = t.result;
                    break;
                } else {
                    machines.set(i, {result: result.result, final: result.final, iPointer: result.iPointer, intial: false, array: result.array})
                    inputResult = result.result;
                }
                
            }
        }
        if (result.result > maxResult) {
            maxResult = result.result;
            maxSequence = sequences[j];
        }
        
        // maxResult = Math.max(maxResult, result);
    }
    console.log('maxSeq', maxSequence);
    console.log('result', maxResult);
    console.log('machines', machines);
} 
// let array = [3,1001,4,3,4,33]

function buildSequence() {
    // sequences = [
    //     [0,1,2,3,4],
    //     [1,0,2,3,4],
    //     [2,1,0,3,4],
    //     [3,1,2,0,4],
    //     [4,1,2,3,0],
    //     [0,2,1,3,4],
    //     [0,3,1,2,4],
    //     [0,4,1,2,3],
    //     [0,1,2,4,3],
    //     [0,]
    // ]
    // return ['97856'];
    let sequences = new Array();
    let valid = new Set(['5','6','7','8','9']);
    let addSeq = true;
    for (let i = 56789; i <= 98765; i++) {
        let temp = i.toString();
        addSeq = true;
        if (temp.length == 4) {
            temp = '0' + temp;
        }
        let used = new Set();
        for (let j = 0; j < temp.length; j++) {
            
            if (used.has(temp[j]) || !valid.has(temp[j])) {
                //duplicate number or invalid character
                addSeq = false;
                break;
            } else {
                used.add(temp[j])
            }
        }
        if (addSeq) {
            sequences.push(temp);
        }
    }
    return sequences;
    // let sequences = new Array();
    // let digits = new Set(0,1,2,3,4);
    // for (let digitOne = 0; digitOne < 5; digitOne++) {
    //     let seq = new Array();
    //     seq.push(digitOne);
    //     for (let i = 0; i < 5; i++) {
    //         if (i != digitOne) {
    //             seq.push(digitOne);
    //         }
    //     }
    //     sequences.push(seq);
    // }
    // for (let digitTwo)
}
//11933517

console.log(main(array));