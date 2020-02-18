let fs = require('fs');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_5_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));

function main(array) {
    // array[1] = 12;
    // array[2] = 2;
    // console.log('array length', array.length);
    // console.log('array', array);
    
    let opCodes = new Set([1,2,3,4,99]);
    let i = 0;
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
            
            if (i == 0) {
                array[array[i + 1]] = 5;
            } else {
                let val = array[i+1];
                // console.log('val', val);
                array[val] = val;
                
            }
            i = i + 2;
        }
        if (opCode == 4) {
            // console.log('i', i);
            if (param.length == 0 ) {
                let val = array[i+1];
                console.log('i', i)
                //console.log('array[i+1', array)
                console.log('output', array[val]);
                
            } else if (param == '1') {
                console.log('output2', array[i+1]);
            }
            i = i + 2;
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
            break;
        }
    }
    // return array[0];
} 
// let array = [3,1001,4,3,4,33]


//11933517

console.log(main(array));