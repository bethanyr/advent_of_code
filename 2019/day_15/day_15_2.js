let fs = require('fs');

const { IntcodeComputer } = require('../day_11_intcode');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_15/day_15_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));

class Point {
    constructor(x, y, tile) {
        this.x = x;
        this.y = y;
        this.tile = tile;
    }
}

//1 -> North
// 4 -> east
// 2 -> south
// 3 -> west

// 0 -> Wall
// 1 -> Path
// 2 -> oxygen

class RepairDroid {
    constructor (array) {
        this.computer = new IntcodeComputer(array);
        this.grid = new Array();
        this.oxygenPosition;
        this.computers = [];
        this.currentDirection = 1;
        this.moveCount = 0;
        this.xPosition = 0;
        this.yPosition = 0;
        this.prevX = 0;
        this.prevY = 0;
        this.history = new Map();
    }

    build() {
        while(!this.computer.finished) {
            let result = this.computer.run(this.currentDirection);
            if (result.result[0] === 99) {
                return;
            }
            if (this.processResult(result.result[0])) {
                console.log('found oxygen');
                return this.moveCount;
            };
            
        } 
    }

    addWall() {
        // movement directions:
        // 1 -> North
        // 2 -> south
        // 3 -> west
        // 4 -> east
        let yPosition = this.yPosition;
        let xPosition = this.xPosition;

        switch (this.currentDirection) {
            case 1:
                yPosition = yPosition + 1;
                break;
            case 2:
                yPosition = yPosition - 1;
                break;
            case 3:
                xPosition = xPosition - 1;
                break;
            case 4:
                xPosition = xPosition + 1;
                break;
            
        }
        this.grid.push(new Point(xPosition, yPosition, 0));
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

    processResult(result) {
        if (result == 0) {
            // we hit a wall, turn to the left, so we keep the wall to our right;
            this.addWall();
            this.changeDirection(false);
            return false;

        } else if (result == 1) {
            // we will move forward 1, and then keep moving in same direction looking for wall;
            this.movePosition();
            this.changeDirection(true);
            return false;
        } else if (result == 2) {
            // found oxygen
            this.addOxygen();
            return true;
        }
    }
    addOxygen() {
        let yPosition = this.yPosition;
        let xPosition = this.xPosition;
    
        switch (this.currentDirection) {
            case 1:
                yPosition = yPosition + 1;
                break;
            case 2:
                yPosition = yPosition - 1;
                break;
            case 3:
                xPosition = xPosition - 1;
                break;
            case 4:
                xPosition = xPosition + 1;
                break;
            
        }
        this.oxygenPosition = {x: xPosition, y: yPosition}
        this.grid.push(new Point(xPosition, yPosition, 2));
        this.history.set(xPosition + '_' + yPosition, [this.xPosition + '_' + this.yPosition]);
    }
    movePosition() {
        // movement directions:
        // 1 -> North
        // 4 -> east
        // 2 -> south
        // 3 -> west
        // 
        this.prevX = this.xPosition;
        this.prevY = this.yPosition;
        
        switch (this.currentDirection) {
            case 1:
                this.yPosition = this.yPosition + 1;
                break;
            case 2:
                this.yPosition = this.yPosition - 1;
                break;
            case 3:
                this.xPosition = this.xPosition - 1;
                break;
            case 4:
                this.xPosition = this.xPosition + 1;
                break;
        }
        this.grid.push(new Point(this.xPosition, this.yPosition, 1));
        this.moveCount++;
        let temp = [];
        if (this.history.has(this.xPosition + '_' + this.yPosition)) {
            temp = this.history.get(this.xPosition + '_' + this.yPosition);
        }
        temp.push(this.prevX + '_' + this.prevY);
        this.history.set(this.xPosition + '_' + this.yPosition, temp);   
    }
    traversePath() {
        let current = this.history.get(this.oxygenPosition.x + '_' + this.oxygenPosition.y);
        let queue = [];
        let visited = new Set();
        queue.push({key: current[0], distance: 1});
        while (queue.length > 0) {
            let item = queue.shift();
            
            if (item.key == '0_0') {
                // we are back at the beginning;
                return item.distance;
            }
            if (!visited.has(item.key)) {
                visited.add(item.key);
                current = this.history.get(item.key);
                for (let i = 0; i < current.length; i++) {
                    queue.push({key: current[i], distance: item.distance + 1});
                }
            }
            
        }
    }

    fillWithOxygen() {
        let current = this.history.get(this.oxygenPosition.x + '_' + this.oxygenPosition.y);
        let queue = [];
        let visited = new Set();
        queue.push({key: current[0], minute: 0});
        let maxMinute = 0;
        while (queue.length > 0) {
            let item = queue.shift();
            if (!visited.has(item.key)) {
                maxMinute = Math.max(maxMinute, item.minute);
                visited.add(item.key);
                let adjItems = [];
                let xAdj = [1, -1, 0, 0];
                let yAdj = [0, 0, 1, -1];
                let point = item.key.split('_').map((item) => parseInt(item));
                for (let i = 0; i < 4; i++) {
                    let k = (point[0] + xAdj[i]).toString() + '_' + (point[1] + yAdj[i]).toString();
                    if (this.history.has(k)) {
                        queue.push({key: k, minute: item.minute + 1});
                    }
                }
                
            }

        }

        return maxMinute + 1;
    }
}


function main(array) {
    // all panels are currently black;
    
    const repairDroid = new RepairDroid(array);
    repairDroid.build();
    let result = repairDroid.traversePath();
    console.log('number of movements', result);
    result = repairDroid.fillWithOxygen();
    console.log('Oxygen fill time', result);

    // answer between 714 and 363
    // repairDroid.shortestPath();

} 

console.log(main(array));

// pathsCount - ( 2 * ( part1 - 2)) + 1

749 - (2 * (270 - 2)) + 1