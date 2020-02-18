let fs = require('fs');

const { IntcodeComputer } = require('./day_11_intcode');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_11_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));

class HullPainter {
    constructor(array) {
        this.currentDirection = 0;
        this.xPosition = 0;
        this.yPosition = 0;
        this.direction = 0;
        this.hullPaint = new Array(100);
        this.panelsPainted = new Map();
        this.panelsPainted.set('0_0', 1);
        this.computer = new IntcodeComputer(array);
    }
    currentPanel() {
        return this.panelsPainted.get(this.xPosition + '_' + this.yPosition) || 0;
    }

    panelsPaintedCount() {
        return this.panelsPainted.size;
    }

    paintPanel(color) {
        this.panelsPainted.set(this.xPosition + '_' + this.yPosition, color);
        if (!this.hullPaint[this.yPosition + 100]) {
            this.hullPaint[this.yPosition + 100] = new Array(100);
        }
        this.hullPaint[this.yPosition + 100][this.xPosition + 100] = (color == 0) ? ' ' : '*';
    }

    hullPicture() {
        for (let i = 0; i < this.hullPaint.length; i++) {
            let row = this.hullPaint[i];
            if (row != undefined) {
                let picRow = '';
                for (let j = 0; j < row.length; j++) {
                    if (row[j] != undefined) {
                        picRow = picRow + row[j];
                    } else {
                        picRow = picRow + ' ';
                    }
                    
                }
                console.log(picRow);
            }
        }
    }

    move(direction) {
        let turn = (direction == 0) ? -90 : 90;

        if (this.direction == 0 && turn == -90) {
            this.direction = 270;
        } else if (this.direction == 270 && turn == 90) {
            this.direction = 0;
        } else {
            this.direction = this.direction + turn;
        }

        switch (this.direction) {
            case 0:
                this.yPosition++;
                break;
            case 270:
                this.xPosition--;
                break;
            case 180:
                this.yPosition--;
                break;
            case 90:
                this.xPosition++;
                break;
        }
    }

    runComputer() {

    }
    getPaintInstructions() {
        let color =  this.computer.run(this.currentPanel()).result[0];
        if (color == 99) {
            return 99;
        }
        let direction =  this.computer.run(this.currentPanel()).result[0];
        if (direction == 99) {
            return 99;
        }
        return {color: color, direction: direction};
    }

    paint() {
        // black = 0;
        // white = 1;
        while(!this.computer.finished) {
            let instructions = this.getPaintInstructions();
            if (instructions != 99) {
                this.paintPanel(instructions.color);
                this.move(instructions.direction);
            }
        }    
    }
}
function main(array) {
    // all panels are currently black;

    const hullPainter = new HullPainter(array);
    hullPainter.paint();
    console.log(hullPainter.hullPicture());
    return hullPainter.panelsPaintedCount();
} 

console.log(main(array, 0));