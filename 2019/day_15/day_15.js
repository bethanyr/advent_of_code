let fs = require('fs');

const { IntcodeComputer } = require('../day_11_intcode');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_15/day_15_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));


// x position (distance from the left), y position (distance from the top), and tile id. The tile id is interpreted as follows:


// For example, a sequence of output values like 1,2,3,6,5,4 would draw a horizontal paddle tile (1 tile from the left and 2 tiles from the top) and a ball tile (6 tiles from the left and 5 tiles from the top).

class RepairDroid {
    constructor(array) {
        this.engineCompartment = new Array(100);
        this.gameComponents = new Array(5).fill(0);
        this.computer = new IntcodeComputer(array);
        this.xPosition = 100;
        this.yPosition = 100;
        this.currentDirection;
        this.minMovementCount = 0;
        this.edges = [];
        this.oxygenPosition = {};
        this.wall = new Set();
        this.prevPosition;
        this.moveCount = 0;
        this.visited = new Set();
        this.returnToStart = false;
        this.moves = new Array();
        this.availableDirections = [1,2,3,4];
        this.lastEdge;
        this.moveMap = new Map();

    }

    addGrid(x, y, tile) {
        // 0 -> wall, position did not move.
        // 1 moved 1 step in requested direction.
        // 2 moved 1 step in requested direction, found oxygen.
       
        
        if (!this.engineCompartment[y]) {
            this.engineCompartment[y] = new Array(100);
        }
        if (tile == 1) {
            this.engineCompartment[y][x] = 1;
        } else if (tile == 0) {
            this.engineCompartment[y][x] = 0;
        } else if (tile == 2){
            this.engineCompartment[y][x] = 2;
        }
        
        this.gameComponents[tile] = this.gameComponents[tile] + 1;
        
    }

    changeDirection(clockwise) {
        // // movement directions:
        // 1 -> North
        // 4 -> east
        // 2 -> south
        // 3 -> west
        // if (clockwise) {
        //     let temp = this.currentDirection;
        //     while (temp == this.currentDirection) {
        //         temp = Math.floor(Math.random() * (4 - 1)) + 1;
        //     }
        //     this.currentDirection = temp;
        // }
        switch (this.currentDirection) {
            case 1:
                if (clockwise) {
                    this.currentDirection = 4;
                } else {
                    this.currentDirection = 3;
                }
                
                break;
        
            case 2:
                if (clockwise) {
                    this.currentDirection = 3;
                } else {
                    this.currentDirection = 4;
                }
                
                break;
            case 3:
                if (clockwise) {
                    this.currentDirection = 1;
                } else {
                    this.currentDirection = 2;
                }
                
                break;
            case 4:
                if (clockwise) {
                    this.currentDirection = 2;
                } else {
                    this.currentDirection = 1;
                }
                
                break;
        }
    }

    build() {
        this.currentDirection = 1;
        this.engineCompartment[100] = new Array(101);
        this.engineCompartment[100][100] = 'S';
        while(!this.computer.finished) {
            let result = this.computer.run(this.currentDirection);
            if (result.result[0] === 99) {
                return;
            }
            if (this.processResultRight(result.result[0])) {
                console.log('something happened');
                return;
            };
            
        } 
    }
    reverse () {
        switch(this.currentDirection) {
            case 1:
                return 2;
            case 2:
                return 1;
            case 3:
                return 4;
            case 4:
                return 3;
        }
    }
    processResultRight(result) {
        // will keep making right turns at walls
        // 0 -> wall, position did not move.
        // 1 moved 1 step in requested direction.
        // 2 moved 1 step in requested direction, found oxygen.

        if (result == 0) {
            // found wall                
            this.addWall();
            this.changeDirection(false);
        } else if (result == 1) {
            this.movePosition();
            this.changeDirection(true);

        } else if (result == 2) {
            // found the oxygen
            this.addOxygen();
            // console.log('moves', this.moveCount);
            // console.log('visited', this.visited);
            return true;
        } 
        return false;
    }
    processResult(result, i) {
        // 0 -> wall, position did not move.
        // 1 moved 1 step in requested direction.
        // 2 moved 1 step in requested direction, found oxygen.
        let x = this.xPosition;
        let y = this.yPosition;
        if (result == 0) {
            // found wall                
            this.addWall();
            this.moves.pop();
            this.currentDirection = this.currentDirection + 1;
        } else if (result == 1) {
            this.movePosition();
            if (this.xPosition == 0 && this.yPosition == 0) {
                this.returnToStart = false;
                this.currentDirection = this.currentDirection + 2;
                if (this.currentDirection == 5) {
                    this.currentDirection = 1;
                }
            } else {
                this.returnToStart = true;
                this.currentDirection = this.moves.pop();
            }
            
        } else if (result == 2) {
            // found the oxygen
            
            this.addOxygen();
            return true;
        } 

    }

    movePosition() {
        // movement directions:
        // 1 -> North
        // 4 -> east
        // 2 -> south
        // 3 -> west
        // 
        let currentPosition = {x: this.xPosition, y: this.yPosition};
        if (this.xPosition == 80 && this.yPosition == 98) {
            console.log('here at mysterya');
        }
        if (this.xPosition == 81 && this.yPosition == 98) {
            console.log('here at mysteryb');
        }
        if (this.xPosition == 82 && this.yPosition == 98) {
            console.log('here at mysteryc');
        }
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
        if (this.xPosition == 80 && this.yPosition == 98) {
            console.log('here at mystery1');
        }
        if (this.xPosition == 81 && this.yPosition == 98) {
            console.log('here at mystery2');
        }
        if (this.xPosition == 82 && this.yPosition == 98) {
            console.log('here at mystery3');
        }
        this.addGrid(this.xPosition, this.yPosition, 1);
        this.edges.push({currentPosition: currentPosition, newPosition: {x: this.xPosition, y: this.yPosition} });
        this.moveMap.set(this.xPosition + '_' + this.yPosition, currentPosition.x + '_' + currentPosition.y);
        // if (!this.visited.has(this.xPosition.toString() + '_' + this.yPosition.toString())) {
        this.moveCount++;
        this.visited.add(this.xPosition.toString() + '_' + this.yPosition.toString());
        // }
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
        this.addGrid(xPosition, yPosition, 0);
        this.wall.add(xPosition + '_' + yPosition);
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
            this.addGrid(xPosition, yPosition, 2);
            this.edges.push({currentPosition: {x: this.xPosition, y: this.yPosition}, newPosition: {x: xPosition, y: yPosition} });
            let temp = [];
            if (this.moveMap.has(xPosition + '_' + yPosition)) {
                temp = this.moveMap.get(xPosition + '_' + yPosition)
                temp.push(this.xPosition + '_' + this.yPosition);
            } else {
                temp.push(this.xPosition + '_' + this.yPosition);
            }
            this.moveMap.set(xPosition + '_' + yPosition, temp);
    }
    print() {
        for (let i = 0; i < this.engineCompartment.length; i++) {
            let row = this.engineCompartment[i];
            
            if (row != undefined) {
                process.stdout.write('\n');
                for (let j = 0; j < this.engineCompartment[i].length; j++) {
                    if (this.engineCompartment[i][j] != undefined) {
                        process.stdout.write(this.engineCompartment[i][j].toString());
                    }
                }
            }
            
        }
        console.log('edges', this.edges);
    }

    shortestPath() {
        let src = {x: 100, y: 100};
        let dest = this.oxygenPosition;
        let visited = new Array(130);
        let rowNum = [-1, 0, 0, 1];
        let colNum = [0, -1, 1, 0];

        for (let i = 0; i < 130; i++) {
            visited[i] = new Array(130).fill(false);
        }
        visited[src.x][src.y] = true;

        let queue = [];
        queue.push({pt: dest, distance: 0});
        let visitedItems = new Set();
        while(queue.length > 0) {
            let item = queue.shift();
            this.lastEdge = item;
            
            if (item.pt.x == src.x && item.pt.y == src.y) {
                return item.distance;
            }
            for (let i = this.edges.length - 1; i >=0; i--) {
                let edge = this.edges[i];
                
                if (edge.newPosition.x == item.pt.x && edge.newPosition.y == item.pt.y &&
                    !visitedItems.has(item.pt.x + '_' + item.pt.y)) {
                    console.log('edge', edge.currentPosition, edge.newPosition);
                    visitedItems.add(item.pt.x + '_' + item.pt.y);
                    queue.push({pt: {x: edge.currentPosition.x, y: edge.currentPosition.y}, distance: item.distance + 1});
                } 
            }
        }
        console.log('last edge', this.lastEdge);
        console.log('oxygen', this.oxygenPosition);

    }
}


function main(array) {
    // all panels are currently black;
    
    const repairDroid = new RepairDroid(array);
    repairDroid.build();
    repairDroid.shortestPath();
    // console.log(hullPainter.hullPicture());
    // return hullPainter.panelsPaintedCount();
} 

console.log(main(array));