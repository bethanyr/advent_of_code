// 'a'.charCodeAt(0) - 96;

let fs = require('fs');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_18/day_18_input_part2.txt').toString().split("\n").map((item) => item.split(''));

// let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_18/test5.txt').toString().split("\n").map((item) => item.split(''));

class Maze {
    constructor(array) {
        this.grid = array;
        this.wall = new Map();
        this.keys = 0; // make a bitmask
        this.door = 0; // make a bitmask
        this.robots = this.initializeRobots();
        this.edge = new Map();
        this.graph = new Graph();
        this.entrance = new Array();
        this.queue = [];
        this.distance;
        this.distances = new Array();
        this.visitedKeys = new Set();
        this.point = new Map();
    }
    initializeRobots() {
        let robots = new Map();
        robots.set('quad1', new Graph(39, 39, this.grid));
        robots.set('quad2', new Graph(39, 41, this.grid));
        robots.set('quad3', new Graph(41, 39, this.grid));
        robots.set('quad4', new Graph(41, 41, this.grid));
        return robots;
    }
    parseGrid() {
        for (let row = 0; row < this.grid.length; row++) {
            let gridRow = this.grid[row];
            
            for (let col = 0; col < gridRow.length; col++) {
                let cell = gridRow[col];
                let quadrant;
                let robInfo;
                if (row <= 39 && col <= 39) {
                    // quadrant 1
                    quadrant = 'quad1';
                } else if (row <= 39 && col > 39) {
                    quadrant = 'quad2';
                } else if (row > 39 && col <= 39) {
                    quadrant = 'quad3';
                } else if (row > 39 && col > 39) {
                    quadrant = 'quad4';
                }

                if (cell == '@') {// found the entrance:
                    this.entrance.push({row: row, col: col});
                    robInfo = this.robots.get(quadrant);
                    robInfo.entrance = {row: row, col: col};
                    this.robots.set(quadrant, robInfo);
  
                } else if (/[a-z]/.exec(cell)) {
                    // if cell is lowercase
                    // add to keys list

                    let keyCode = (2 ** (cell.charCodeAt(0) - 96));
                    this.keys = this.keys | keyCode;
                    robInfo = this.robots.get(quadrant);
                    robInfo.keys = robInfo.keys | keyCode;
                    this.robots.set(quadrant, robInfo);
                    
                } else if (/[A-Z]/.exec(cell)) {
                    // cell is uppercase
            
                    let doorCode = (2 ** (cell.charCodeAt(0) - 64));
                    this.doors = this.doors | doorCode;
                    robInfo = this.robots.get(quadrant);
                    robInfo.doors = robInfo.doors | doorCode;
                    this.robots.set(quadrant, robInfo);
                }
            }
        }
    }
    

    findAllDistances() {
        // start with starting position:
        let totalResult = 0;
        this.robots.forEach((robot, key) => {
            totalResult = totalResult + robot.breadthFirstSearch();
        })
    
        console.log('steps', totalResult);
    }

    
}

class Graph {
    constructor(row, col, grid) {
        this.entrance = {row: row, col: col};
        this.queue = new Array();
        this.keys = 0;
        this.doors = 0;
        this.distance;
        this.grid = grid;
        this.waitingForKey = false;
    }
    
    breadthFirstSearch(source = this.entrance) {
        let distance = new Map();
        distance.set(source.row + '_' + source.col, {distance: null, predecessor: null, keysCollected: 0});
        let neighbors = [[0,1], [0,-1], [1,0], [-1, 0]];

        this.queue.push({row: source.row, col: source.col, distance: 0, keysCollected: 0});

        while(this.queue.length > 0) {
            let u = this.queue.shift();
            if (u.keysCollected === this.keys) {
                //we have all of the keys,
                // return this distance as the number of steps.
                return u.distance; 
            }

            for (let j = 0; j < neighbors.length; j++) {
                let v = neighbors[j];
                let newRow = u.row + v[0];
                let newCol = u.col + v[1];
                let cell = this.grid[newRow][newCol];
                if (cell == '#' || cell == undefined) {
                    continue;
                }
                let keysCollected = u.keysCollected;
                if (!distance.has(newRow + '_' + newCol + '_' + keysCollected)) {
                    // we haven't processed this item before, add the key to list of keys  
                    // visited if it's a key, and add to the queue to process.
                    
                    if (/[a-z]/.exec(cell)) {
                        // neighboring cell is a key
                        keysCollected = keysCollected | 2 ** (cell.charCodeAt(0) - 96);
                    }
                    if (/[A-Z]/.exec(cell)) {
                        // neighboring cell is a door
                        // need to check if we have a key
                        let keyCode = 2 ** (cell.toLowerCase().charCodeAt(0) - 96);

                        if ((this.keys & keyCode) > 0) {
                            // we need to find this key in this part of the grid;
                            // otherwise we will just ignore it:
                            if ((keysCollected & keyCode) > 0) {
                            // can visit this door, we have the key;

                            } else {
                                // TODO: figure out how to pause, so can continue after key is found
                                continue;
                            }
                        } else {
                            // for now we will just pretend that we will eventually get the
                            // key for the door, so don't wait;
                        }
                        // if ((keysCollected & keyCode) > 0) {
                        //     // can visit this door, we have the key;

                        // } else {
                        //     // TODO: figure out how to pause, so can continue after key is found
                        //     continue;
                        // }
                    }
                    this.queue.push({row: newRow, col: newCol, distance: u.distance + 1, keysCollected: keysCollected});
                    distance.set(newRow + '_' + newCol + '_' + keysCollected, {distance: u.distance + 1, keysCollected: keysCollected, prev: u.row + '_' + u.col})
                }
            }
        }
        this.distance = distance;
        return distance;
    }
}

class Node {
    constructor(row, col, label, id) {
        this.label = label;
        this.adjacent = [];
        this.position = {row: row, col: col};
        this.id = id;
        this.visited = false;
    }
}
function main(array) {
    let maze = new Maze(array);
    maze.parseGrid();

    maze.findAllDistances();  
}
main(array);

// 0: Object {row: 39, col: 39}
// 1:Object {row: 39, col: 41}
// 2:Object {row: 41, col: 39}
// 3:Object {row: 41, col: 41}

// parse keys and doors and determine which 
// quadrant they exist

// have each robot start out, if it encounters a door
// that hasn't been unlocked and the key is in a different quadrant, then wait
// if the key is in that robots quadrant then continue on.

