let fs = require('fs');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_5_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));

// let fs = require('fs');

// let array = fs.readFileSync('day_2_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));
// console.log(array);
// console.log(array[0]);
function main(array) {
    // array[1] = 12;
    // array[2] = 2;
    // console.log('array length', array.length);
    // console.log('array', array);
    
    let opCodes = new Set([1,2,3,4,99]);
    
    for (let i = 0; i < array.length; i+= 1) {
        
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
            if (!sum || sum == -1216) {
                let be = true;
                console.log('here');
            }
            

            if (isNaN(sum)) {
                console.log('i', i, array[i + 2], array[array[i+2]], instruction);
                console.log('suma', a, suma,array[i+1]);
                console.log('sumb', b, sumb);
            }
            array[array[i + 3]] = sum;
            i = i + 3;
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
            if (!multi || multi == -1216) {
                let be = 'here';
            }
            if (isNaN(multi)) {
                console.log('a', a);
                console.log('b', b);
            }
            // console.log('multi', multi);
            array[array[i + 3]] = multi;
            i = i + 3;
        }
        if (opCode == 3) {
            
            if (i == 0) {
                array[array[i + 1]] = 1;
            } else {
                let val = array[i+1];
                console.log('val', val);
                array[val] = val;
                
            }
            i = i + 1;
        }
        if (opCode == 4) {
            // console.log('i', i);
            if (param.length == 0 ) {
                let val = array[i+1];
                console.log('i', i)
                //console.log('array[i+1', array)
                console.log('output', array[val]);
                i = i + 1;
            } else if (param == '1') {
                console.log('output2', array[i+1]);
            }
            
        }
        if (opCode == 99) {
            break;
        }
    }
    // return array[0];
} 
// let array = [3,1001,4,3,4,33]

console.log(main(array));