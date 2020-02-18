class IntcodeComputer {
    constructor(array, iPointer = 0) {
        this.input = [];
        this.relativeBase = 0;
        this.parameters = [];
        this.memory = array;
        this.currentPointer = iPointer;
        this.validCodes = new Set([1,2,3,4,5,6,7,8,9,99])
        this.output = [];
        this.finished = false;
        this.originalMemory = array.slice(0);
    }

    // params 0 = position mode
    // params 1 = immediate mode
    // params 2 = relative mode

    reset() {
        this.memory = this.originalMemory.slice(0);
        this.relativeBase = 0;
        this.output = [];
        this.finished = false;
        this.input = [];
        this.currentPointer = 0;
        this.parameters = [];
    }

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

    run(input) {
        // this.input = [];
        // this.input.push(input);
        this.input = input;
        this.output = [];
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

                return {result: this.output, final: false, iPointer: this.currentPointer, array: this.memory.slice()};
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
                this.finished = true;
                return {result: [-99], final: true, iPointer: -1, array: this.memory.slice()};
            }
        }
    }

}

exports.IntcodeComputer = IntcodeComputer;
// function main(array, input, iPointer = 0) {

//     let intcodeComputer = new IntcodeComputer([input], array, iPointer);
//     let result = intcodeComputer.run();
    
//     // return array[0];
//     return result;
// } 
// let array = [3,1001,4,3,4,33]

// console.log(main(array, 1));

// module.exports = IntcodeComputer;