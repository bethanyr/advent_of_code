let fs = require('fs');

const { IntcodeComputer } = require('../day_11_intcode');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_13/day_13_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));


// x position (distance from the left), y position (distance from the top), and tile id. The tile id is interpreted as follows:


// For example, a sequence of output values like 1,2,3,6,5,4 would draw a horizontal paddle tile (1 tile from the left and 2 tiles from the top) and a ball tile (6 tiles from the left and 5 tiles from the top).

class Arcade {
    constructor(array) {
        this.gameBoard = new Array();
        this.gameComponents = new Array(5).fill(0);
        this.computer = new IntcodeComputer(array);
        this.score = 0;
        this.joystick = 0;
        this.ballPosition = {};
        this.paddlePosition = {};
    }

    updateScore(score) {
        this.score = score;
    }
    addGrid(x, y, tile) {
        // 0 is an empty tile. No game object appears in this tile.
        // 1 is a wall tile. Walls are indestructible barriers.
        // 2 is a block tile. Blocks can be broken by the ball.
        // 3 is a horizontal paddle tile. The paddle is indestructible.
        // 4 is a ball tile. The ball moves diagonally and bounces off objects.
        if (!this.gameBoard[y]) {
            this.gameBoard[y] = new Array();
        }
        this.gameBoard[y][x] = tile;
        this.gameComponents[tile] = this.gameComponents[tile] + 1;
        if (tile == 3) {
            // update paddle position
            this.paddlePosition = {x: x, y: y};
        }
        if (tile == 4) {
            // update ball position
            this.ballPosition = {x: x, y: y};
        }
    }

    build() {
        
        while(!this.computer.finished) {
            let result = [];
            for (let i = 0; i < 3; i++) {
                result.push(this.computer.run(this.joystick).result[0]);
                if (result[0] == 99) {
                    return;
                }
            }
            let x = result[0];
            let y = result[1];
            let input = result[2];
            if (x == -1 && y == 0) {
                this.updateScore(input);
            }
            this.addGrid(x, y, input);
            // if input == 3 --> paddle
            // then next time run, want to move towards the ball
            // by x position
            
            if (this.paddlePosition.x > this.ballPosition.x) {
                this.joystick = -1;
            } else if (this.paddlePosition.x < this.ballPosition.x) {
                this.joystick = 1;
            } else {
                this.joystick = 0;
            }
        } 
    }
    ballCount() {
        return this.gameComponents[4];
    }

    blockCount() {
        return this.gameComponents[2];
    }
}
function main(array) {
    // all panels are currently black;
    array[0] = 2; // set to unlimited play;
    const arcade = new Arcade(array);
    arcade.build();
    console.log('score', arcade.score);
    return arcade.blockCount();
    // console.log(hullPainter.hullPicture());
    // return hullPainter.panelsPaintedCount();
} 

console.log(main(array));