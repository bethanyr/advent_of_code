let fs = require('fs');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_9_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));

// let array = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
//     1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
//     999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]

// let array = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
// let array = [109,19,204,-34]

// let array = [104,1125899906842624,99]

// let array = [1102,34915192,34915192,7,4,7,99,0]

// let fs = require('fs');

// let array = fs.readFileSync('day_2_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));
// console.log(array);
// console.log(array[0]);

class IntcodeComputer {
    constructor(input, array) {
        this.input = input;
        this.relativeBase = 0;
        this.parameters = [];
        this.memory = array;
        this.currentPointer = 0;
        this.validCodes = new Set([1,2,3,4,5,6,7,8,9,99])
        this.output = [];
    }

    // params 0 = position mode
    // params 1 = immediate mode
    // params 2 = relative mode

    getMemoryAddress(param, offset) {
        let address = 0;
        if (param == 1) {
            address = this.currentPointer + offset;
        }
        else if (param == 0) {
            address = this.memory[this.currentPointer + offset];
        } else if (param == 2) {
            address = this.relativeBase + this.memory[this.currentPointer + offset];
        }
            
        if (address < 0) {
            console.log('error occurred, negative address', address);
        }
        return address;
    }

    readVal(param, offset) {
        let val = 0;
        if (param == 1) {
            val = this.memory[this.currentPointer + offset] || 0;
        }
        else if (param == 0) {
            val = this.memory[this.memory[this.currentPointer + offset]] || 0;
        } else if (param == 2) {
            val = this.memory[this.relativeBase + this.memory[this.currentPointer + offset]] || 0;
        }
            
        return val;
    }

    writeVal(param, offset, val) {
        let address = 0;

        if (param == 1) {
            address = this.currentPointer + offset;
        }
        else if (param == 0) {
            address = this.memory[this.currentPointer + offset];
        } else if (param == 2) {
            address = this.relativeBase + this.memory[this.currentPointer + offset];
        }
        this.memory[address] = val;
    }

    parseParams(param) {
        let params = new Array(3).fill(0);

        if (param.length == 1) {
            params[0] = parseInt(param);
        } else if (param.length == 2){
            params[0] = parseInt(param[1] || 0);
            params[1] = parseInt(param[0] || 0);
        } else if (param.length == 3) {
            params[0] = parseInt(param[2] || 0);
            params[1] = parseInt(param[1] || 0);
            params[2] = parseInt(param[0] || 0);
        }

        return params;
    }

    run() {
        
        while(this.currentPointer < this.memory.length) {
            
            let instruction = this.memory[this.currentPointer].toString();
            
            let opCode = parseInt(instruction.slice(instruction.length - 2));
            let params = this.parseParams(instruction.slice(0,instruction.length - 2));
            if (!this.validCodes.has(opCode)) {
                console.log('invalid code', opCode);
            }

            if (opCode == 1 || opCode == 2) {
                
                // let memoryAddress = this.getMemoryAddress(paramOne, 1);

                let suma = this.readVal(params[0], 1);
               
                let sumb = this.readVal(params[1], 2);
                
                let answer = opCode == 1 ? suma + sumb : suma * sumb;
    
                // this.memory[this.memory[this.currentPointer + 3]] = answer;
                this.writeVal(params[2],3,answer);
                this.currentPointer = this.currentPointer + 4;
            }
            
            if (opCode == 3) {
                let memoryAddress = this.getMemoryAddress(params[0], 1);
                if (this.input.length > 0) {
                    this.memory[memoryAddress] = this.input.shift();
                    this.currentPointer = this.currentPointer + 2;
                }     
                else {
                    let val = this.memory[this.currentPointer + 1] || 0;
                    // console.log('val', val);
                    this.memory[memoryAddress] = val;
                    this.currentPointer = this.currentPointer + 2;
                    
                }
                
            }
            if (opCode == 4) {

                
                let memoryAddress = this.getMemoryAddress(params[0], 1);
                
                // if (param == '2') {
                    // console.log('output memory', memoryAddress);
                // } else {
                    this.output.push(this.memory[memoryAddress] || 0);
                    // console.log('output', this.memory[memoryAddress] || 0);
                // }
                
                this.currentPointer = this.currentPointer + 2;
            }
            if (opCode == 5) {
                //if the first parameter is non-zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
                if (this.readVal(params[0], 1) != 0) {
                    this.currentPointer = this.readVal(params[1], 2);
                } else {
                    this.currentPointer = this.currentPointer + 3;
                }
            }
            if (opCode == 6) {
                //if the first parameter is zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
                if (this.readVal(params[0], 1) == 0) {
                    this.currentPointer = this.readVal(params[1], 2);
                } else {
                    this.currentPointer = this.currentPointer + 3;
                }
            }
            if (opCode == 7) {
                //if the first parameter is less than the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0
                let answer = this.readVal(params[0],1) < this.readVal(params[1],2) ? 1 : 0;
                this.writeVal(params[2], 3 ,answer);
                this.currentPointer = this.currentPointer + 4;
            }
            if (opCode == 8) {
                //if the first parameter is equal to the second parameter, it stores 1 in the position given by the third parameter.
                let answer = this.readVal(params[0],1) == this.readVal(params[1], 2) ? 1 : 0;
                this.writeVal(params[2], 3 ,answer);
                this.currentPointer = this.currentPointer + 4;
            }
            if (opCode == 9) {
                let memoryAddress = this.getMemoryAddress(params[0], 1);
                this.relativeBase = this.relativeBase + (this.memory[memoryAddress] || 0);
                this.currentPointer = this.currentPointer + 2;
            }
            if (opCode == 99) {
                this.currentPointer = this.memory.length;
                return;
            }
        }
    }

}
function main(array, input) {

    let intcodeComputer = new IntcodeComputer([input], array);
    intcodeComputer.run();
    
    // return array[0];
    return intcodeComputer.output;
} 
// let array = [3,1001,4,3,4,33]

// console.log(main(array, 1));

module.exports = main;