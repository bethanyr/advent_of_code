// 'a'.charCodeAt(0) - 96;

let fs = require('fs');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_18/day_18_input.txt').toString().split("\n").map((item) => item.split(''));

// let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_18/test5.txt').toString().split("\n").map((item) => item.split(''));

class Maze {
    constructor(array) {
        this.grid = array;
        this.wall = new Map();
        this.keys = 0; // make a bitmask
        this.door = 0; // make a bitmask
        this.edge = new Map();
        this.graph = new Graph();
        this.entrance = new Array();
        this.queue = [];
        this.distance;
        this.distances = new Array();
        this.visitedKeys = new Set();
        this.point = new Map();
    }

    parseGrid() {
        for (let row = 0; row < this.grid.length; row++) {
            let gridRow = this.grid[row];
            for (let col = 0; col < gridRow.length; col++) {
                let cell = gridRow[col];

                if (cell == '@') {// found the entrance:
                    this.entrance.push({row: row, col: col});
                } else if (/[a-z]/.exec(cell)) {
                    // if cell is lowercase
                    // add to keys list                    
                    this.keys = this.keys | (2 ** (cell.charCodeAt(0) - 96)) ;
                } else if (/[A-Z]/.exec(cell)) {
                    // cell is uppercase
                                        
                    this.doors = this.doors | (2 ** (cell.charCodeAt(0) - 64));
                }
            }
        }
    }
    
    findAllDistances() {
        // start with starting position:
        let result = this.breadthFirstSearch(this.entrance);
        console.log('steps', result);
    }

    breadthFirstSearch(source) {
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
                if (cell == '#') {
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
                        if ((keysCollected & keyCode) > 0) {
                            // can visit this door, we have the key;

                        } else {
                            continue;
                        }
                    }
                    this.queue.push({row: newRow, col: newCol, distance: u.distance + 1, keysCollected: keysCollected});
                    distance.set(newRow + '_' + newCol + '_' + keysCollected, {distance: u.distance + 1, keysCollected: keysCollected, prev: u.row + '_' + u.col})
                }
            }
        }
        this.distance = distance;
        return distance;
    }

    buildPaths() {
        let visitedKeys = new Set();
        for (let i = 0; i < this.distances.length; i++) {
            let distance = this.distances[i];
            // distance[14]

        }

        let start = this.distances
    }
}

class Graph {
    constructor() {
        this.nodes = new Array(); // row * col
    }
    add(node) {
        this.nodes.push(node);
    }

    pointer() {
        this.nodes.length;
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