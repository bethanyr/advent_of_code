let fs = require('fs');

const { IntcodeComputer } = require('../day_11_intcode');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_17/day_17_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));

class VacuumDroid {
    constructor (array) {
        this.computer = new IntcodeComputer(array);
        this.grid = new Array();
        this.grid[0] = new Array();
        this.input = 0;
        this.row = 0;
        this.col = 0;
    }

    build() {
        while(!this.computer.finished) {
            let result = this.computer.run(this.input);
            if (result.result[0] === 99) {
                return;
            }
            this.processResult(result.result[0]);
            
        } 
    }

    processResult(result) {
        if (result == 10) {
            this.row++;
            this.grid[this.row] = new Array();
            this.col = 0;
        }
        else {
            this.grid[this.row][this.col] = String.fromCharCode(result);
            this.col++;
        }
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
}

function main(array) {
    let suckbot = new VacuumDroid(array);
    suckbot.build();
    suckbot.totalGrid();
    suckbot.print();
}

main(array);