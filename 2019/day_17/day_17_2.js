let fs = require('fs');

const { IntcodeComputer } = require('../day_11_intcode');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_17/day_17_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));

class VacuumDroid {
    constructor (array) {
        this.computer = new IntcodeComputer(array);
        this.array = array;
        this.grid = new Array();
        this.grid[0] = new Array();
        this.input = 654466446744664465446710;
        this.row = 0;
        this.col = 0;
        this.botPosition;
        this.direction;
        this.instructions = [];
        this.askingInput = false;
        this.robotInstructions = [];
    }

    build() {
        while(!this.computer.finished) {
            // build the inputs
            // loop through the inputs running the computer each time
            // final output should be space dust
            let result = this.computer.run(this.input);
            if (result.result[0] === 99) {
                return;
            }
            this.processResult(result.result[0]);
            
        } 
    }

    runRobotInstructions() {
        let instructions = 0;
        while(!this.computer.finished) {
            // build the inputs
            // loop through the inputs running the computer each time
            // final output should be space dust
            // let input;
            // if (this.robotInstructions.length > 0) {
            //     input = this.robotInstructions.shift().join(',');
            // } else {
            //     input = 0;
            // }
            
            let result = this.computer.run(instructions);
            if (result.result[0] === -99) {
                return;
            }
            if ((result.result[0] === 10 || result.result[0] == 63) && this.askingInput) {
                // asking for input:
                instructions = this.robotInstructions.shift();
                this.askingInput = false;
            } 
            if (result.result[0] > 200) {
                console.log('large result', result.result[0]);
            }
            this.processResult(result.result[0]);
            
        } 
    }

    processResult(result) {
        if (result == 58 || result == 63) {
            this.askingInput = true;
        }
        if (result == 10) {
            this.row++;
            this.grid[this.row] = new Array();
            this.col = 0;
        } else if (result == 94 || result == 118 || result ==  60 || result == 62) {
            this.setupRobot(result);
            this.grid[this.row][this.col] = String.fromCharCode(result);
            this.col++;
        }
        else {
            this.grid[this.row][this.col] = String.fromCharCode(result);
            this.col++;
        }
        process.stdout.write(String.fromCharCode(result));
    }

    print() {
        for (let i = 0; i < this.grid.length; i++) {
            let row = this.grid[i];

            for (let j = 0; j < row.length; j++) {
                if (row[j]) {
                    process.stdout.write(row[j]);
                }  
            }
            process.stdout.write('\n');
        }
    }
    setupRobot(result) {
        //vacuum bot;
        // 1 -> North
        // 4 -> east
        // 2 -> south
        // 3 -> west
        this.botPosition = {x: this.col, y: this.row};
        if (result == 94) {
            this.currentDirection = 1;
        } else if (result == 118) {
            this.currentDirection = 2;
        } else if (result == 60) {
            this.currentDirection = 3;
        } else {
            this.currentDirection = 4;
        }
    }
    totalGrid() {
        let total = 0;
        for (let i = 1; i < this.grid.length - 1; i++) {
            let row = this.grid[i];

            for (let j = 1; j < row.length - 1; j++) {
                if (row[j] == '#' && this.grid[i - 1][j] == '#' &&
                this.grid[i + 1][j] == '#' && row[j-1] == '#' && row[j+1] == '#') {
                    total = total + (j * i);
                }
                
            }
        }
        console.log('alignment total', total);
    }
    buildInstructions() {
        this.row = this.botPosition.y;
        this.col = this.botPosition.x;
        let steps = 0;
        let turn = 'R';
        let moves = 0;
        while (moves < 100) {
            let nextTile;
            nextTile = this.getTile();
            
            // moves++;
            if (nextTile == '#') {
                steps++;
                this.move();
            } else {
                // we hit a scaffolding end;
                // try turning left;
                if (steps > 0) {
                    this.instructions.push({turn: turn, steps: steps});
                    steps = 0;
                }
                if (!this.lookLeft()) {
                    if (!this.lookRight()) {
                        console.log('we are at the end of the scaffolding');
                        return this.instructions;
                    } else {
                        turn = 'R';
                    }
                } else {
                    turn = 'L';
                };
                
            }
        }
        return instructions;
    }
    lookRight() {
        // 1 -> North --> increment row
        // 4 -> east --> col
        // 2 -> south -- row
        // 3 -> west -- col
        switch(this.currentDirection) {
            case 1:
                if (this.grid[this.row][this.col + 1] == '#') {
                    this.currentDirection = 4;
                    return true;
                };
                break;
            case 2:
                if (this.grid[this.row][this.col - 1] == '#') {
                    this.currentDirection = 3;
                    return true;
                };
                break;
            case 3:
                if (this.row == 0) {
                    return false;
                } else if (this.grid[this.row - 1][this.col] == '#') {
                    this.currentDirection = 1;
                    return true;
                };
                break;
            case 4:
                if (this.grid[this.row + 1][this.col] == '#') {
                    this.currentDirection = 2;
                    return true;
                };
                break;
        }
        return false;
    }

    lookLeft() {
        // 1 -> North --> increment row
        // 4 -> east --> col
        // 2 -> south -- row
        // 3 -> west -- col
        switch(this.currentDirection) {
            case 1:
                if (this.grid[this.row][this.col - 1] == '#') {
                    this.currentDirection = 3;
                    return true;
                };
                break;
            case 2:
                if (this.grid[this.row][this.col + 1] == '#') {
                    this.currentDirection = 4;
                    return true;
                };
                break;
            case 3:
                if (this.grid[this.row + 1][this.col] == '#') {
                    this.currentDirection = 2;
                    return true;
                };
                break;
            case 4:
                if (this.row == 0) {
                    return false;
                } else if (this.grid[this.row - 1][this.col] == '#') {
                    this.currentDirection = 1;
                    return true;
                };
                break;
        }
        return false;
    }
    getTile() {
        // 1 -> North --> increment row
        // 4 -> east --> col
        // 2 -> south -- row
        // 3 -> west -- col

        switch(this.currentDirection) {
            case 1:
                if (this.row == 0) {
                    return '.';
                }
                return this.grid[this.row - 1][this.col];
            case 2:
                return this.grid[this.row + 1][this.col];
            case 3:
                if (this.col == 0) {
                    return '.';
                }
                return this.grid[this.row ][this.col - 1];
            case 4:
                return this.grid[this.row ][this.col + 1];
        }
    }
    move () {
        // 1 -> North --> increment row
        // 4 -> east --> col
        // 2 -> south -- row
        // 3 -> west -- col
        switch (this.currentDirection) {
            case 1:
                this.row--;
                break;
            case 2:
                this.row++;
                break;
            case 3:
                this.col--;
                break;
            case 4:
                this.col++;
                break;
        }
    }

    changeDirection(clockwise) {
        // // movement directions:
        // 1 -> North
        // 4 -> east
        // 2 -> south
        // 3 -> west
        
        switch (this.currentDirection) {
            case 1:
                this.currentDirection = clockwise ? 4 : 3;
                break;
            case 2:
                this.currentDirection = clockwise ? 3: 4;
                break;
            case 3:
                this.currentDirection = clockwise ? 1 : 2;
                break;
            case 4:
                this.currentDirection = clockwise ? 2 : 1;
                break;
        }
    }
    navigate() {
        this.array[0] = 2;
        this.computer = new IntcodeComputer(this.array);
    }
    encodeInputs() {
        let A = [{ turn: 'R', steps: 8 },
        { turn: 'L', steps: 10 },
        { turn: 'L', steps: 12 },
        { turn: 'R', steps: 4 }]
    
        let B = [{ turn: 'R', steps: 8 },
        { turn: 'L', steps: 12 },
        { turn: 'R', steps: 4 },
        { turn: 'R', steps: 4 }]
        
        let C = [{ turn: 'R', steps: 8 },
        { turn: 'L', steps: 10 },
        { turn: 'R', steps: 8 }]

        let Main = ['A', 'B', 'A', 'C', 'A', 'B','C', 'B', 'C', 'B'];

        let seeVideo = ['n'];

        this.robotInstructions.push(this.encodeMain(Main));
        this.robotInstructions.push(this.encodeFunction(A));
        this.robotInstructions.push(this.encodeFunction(B));
        this.robotInstructions.push(this.encodeFunction(C));
        this.robotInstructions.push(this.encodeMain(seeVideo));
    }
    encodeMain(items) {
        let code = [];;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            code.push(item.charCodeAt(0));
            if (i < items.length - 1) {
                code.push(','.charCodeAt(0));
            }
        }
        code.push(10);
        return code;
    }

    encodeFunction(steps) {
        let code = [];
        for (let i = 0; i < steps.length; i++) {
            let step = steps[i];
            code.push(step.turn.charCodeAt(0));
            code.push(','.charCodeAt(0));
            if (step.steps > 9) {
                code.push('1'.charCodeAt(0));
                code.push((step.steps % 10).toString().charCodeAt(0));
            } else {
                code.push((step.steps.toString().charCodeAt(0)));
            }

            if (i < steps.length - 1) {
                code.push(','.charCodeAt(0));
            }
        }
        code.push(10);
        return code;
    }

}

function main(array) {
    array[0] = 2;
    let suckbot = new VacuumDroid(array);
    suckbot.encodeInputs();
    suckbot.runRobotInstructions();
    // suckbot.build();
    // suckbot.totalGrid();
    // suckbot.print();
    // let instructions = suckbot.buildInstructions();
    // for (let i = 0; i < instructions.length; i++) {
    //     console.log(instructions[i]);
    // }
    //suckbot.navigate();
}

main(array);