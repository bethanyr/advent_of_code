let fs = require('fs');

// let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_20/day_20_input.txt').toString().split("\n").map((item) => item.split(''));

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_20/test3.txt').toString().split("\n").map((item) => item.split(''));

// first step, parse the input and find all of the '.' cells that are next to portals
// starting portal is 'AA' and ending portal is 'ZZ'
// do BFS to find all distances between portals

// make a graph of all of the portals
// run dikstra algoritm against graph to find shortest path.

class Graph {
    constructor(array) {
        this.entrance;
        this.exit;
        this.portals = new Map();
        this.grid = array;
        this.nodes = new Map();
        this.queue = new Array();
        this.level = 0;
        this.levels = new Set();
    }
    findPortalEntrance(cell, row, col) {
        let neighbors = [[0,1], [1,0]]; // since we are parsing from L - R, the 2nd letter
        // is either to the right or below the current cell.
        let direction;
        if (row > 5 && row < this.grid.length - 5 && col > 5 && col < this.grid[0].length - 5) {
            // portal is in the inner donut, will take you down
            direction = 'down';
        } else {
            direction = 'up';
        }
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            if (row + neighbor[0] >= this.grid.length) {
                continue;
            }
            let item = this.grid[row + neighbor[0]][col + neighbor[1]];
            if (/[A-Z]/.exec(item)) {
                // we found the other letter for the portal name:
                let label = cell + item;
                let entrance;
                // the entrance can either be to the right of the 2nd label, below the 2nd label,
                // above the first label, to the left of the first label

                // check below the 1st label for the entrance:
                if (this.grid[row + neighbor[0] + neighbor[0]]) {
                    entrance = this.grid[row + neighbor[0] + neighbor[0]][col + neighbor[1] + neighbor[1]];
                    if (entrance == '.') {
                        return new Node(label, row + neighbor[0] + neighbor[0], col + neighbor[1] + neighbor[1], true, direction);
                    } 
                }
                // check to the left and above the 1st label:
                if (this.grid[row - neighbor[0]]){
                    entrance = this.grid[row - neighbor[0]][col - neighbor[1]];
                    // maybe entrance is on other side:
                    if (entrance == '.') {
                        return new Node(label, row - neighbor[0], col - neighbor[1], true, direction);
                    }                    
                }
                console.log('something went wrong');                
            }
            
        } 
    }

    findAdjacent(row, col) {
        let neighbors = [[0,1], [1,0], [-1, 0], [0,-1]];
        let adjacent = new Array();
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            let cell;
            if (this.grid[row + neighbor[0]]) {
                cell = this.grid[row + neighbor[0]][col + neighbor[1]];
            }
            if (cell == '.') {
                adjacent.push((row + neighbor[0]) + '_' + (col + neighbor[1]));
            }
        }
        return adjacent;
    }
    parseGrid() {
        for (let row = 0; row < this.grid.length; row++) {
            let line = this.grid[row];
            for (let col = 0; col < line.length; col++) {
                let cell = line[col];
                
                if (cell == '#' || cell == ' ') {
                    // ignore blank spaces and walls
                    continue;
                } else if (/[A-Z]/.exec(cell)) {
                    // we have a letter, 
                    // we should check the neighbors to find the portal entrance:
                    let portal = this.findPortalEntrance(cell, row, col);
                    if (portal) {
                        this.portals.set(portal.row + '_' + portal.col, portal);
                        if (portal.label == 'AA') {
                            // we found the entrance:
                            this.entrance = {key: portal.row + '_' + portal.col, row: portal.row, col: portal.col};
                        }
                        if (portal.label == 'ZZ') {
                            // we found the exit:
                            this.exit = {key: portal.row + '_' + portal.col, row: portal.row, col: portal.col };
                        } 
                    }
                    

                } else if (cell == '.') {
                    let node;
                    if (this.portals.has(row + '_' + col)) {
                        // we already processed this node as an entrance,
                        // don't process again:
                        node = this.portals.get(row + '_' + col);
                    } else {
                        node = new Node(cell, row, col);
                    }
                    
                    node.adjacent = this.findAdjacent(row, col);
                    this.nodes.set(row + '_' + col, node);
                }
            }
        }
    }
    breadthFirstSearch() {

        let distance = new Map();
        let currentLevel = 0;
        distance.set(this.entrance.key + '_0', {distance: 0, prev: null, level: 0});

        this.queue.push({key: this.entrance.key + '_0', label: this.entrance.key, row: this.entrance.row, col: this.entrance.col, distance: 0, level: 0});

        // distance.set(this.entrance.key, {distance: 0, prev: null, level: 0});

        // this.queue.push({key: this.entrance.key, label: this.entrance.key, row: this.entrance.row, col: this.entrance.col, distance: 0, level: 0});

        while(this.queue.length > 0 && currentLevel < 50) {
            let u = this.queue.shift();
            if (u.level == 0 && u.key == this.exit.key) {
                return u.distance;
            }
            // process the adjacent items:
            let adjacent = this.nodes.get(u.label).adjacent.slice(0);
            // check to see if there is a portal that should be added to the adjacent list
            // and that we didn't just come from a portal
            if (this.portals.has(u.label) && !(this.portals.has(u.prev))) {
                // we need to find the other portal
                let portal = this.portals.get(u.label);
                this.portals.forEach((value, key) => {
                    if (portal.label == value.label && u.label != key) {
                        // here is the other portal -- add it to the list of adjacent items to process;
                        adjacent.push(key);
                        
                    }
                })
            }
            for (let i = 0; i < adjacent.length; i++) {
                let item = adjacent[i];
                
                currentLevel = u.level;
                if ((!distance.has(item + '_' + currentLevel) || this.portals.has(item) || distance.get(item + '_' + currentLevel).distance == null) && currentLevel < 50) {
                // if (!distance.has(item) || distance.get(item).distance == null) {
                

                
                    if (this.portals.has(item) && item != this.entrance.key && item != this.exit.key
                    && this.portals.has(u.label)) {
                        
                        // check that we are recursing from the portal
                        let adjNode = this.portals.get(item);
                        
                        if (adjNode.direction == 'down' && currentLevel > 0) {
                            // we have visited this portal before, so we go back up 1 level;
                            currentLevel = currentLevel - 1;
                            
                            console.log('-', adjNode.label, ' ', u.distance + 1, ' ',currentLevel);

                        } else if(adjNode.direction == 'up') {
                            // it is a down portal item before so we go down 1 level;
                            currentLevel = currentLevel + 1;
                            console.log('+', adjNode.label, ' ', u.distance + 1, ' ', currentLevel);
                            // don't add this item to the queue;

                        } else {
                            // we can't do anything, skip this item
                            continue;
                        }
                    } else if (item == this.exit.key && u.level > 0) {
                        // don't do anything, we aren't at level 0 so we can't go to the finish yet;
                        continue;
                    } else if (item == this.entrance.key) {
                        // it's a start item, we shouldn't fall into this condition

                    }
                    this.queue.push({key: item + '_' + currentLevel, label: item, row: item.split('_')[0], col: item.split('_')[1], distance: u.distance + 1, level: currentLevel, prev: u.label});
                    distance.set(item + '_' + currentLevel, {distance: u.distance + 1,  prev: u.label, level: currentLevel})
                    // this.queue.push({key: item, label: item, row: item.split('_')[0], col: item.split('_')[1], distance: u.distance + 1, level: currentLevel});
                    // distance.set(item + '_' + currentLevel, {distance: u.distance + 1,  prev: u.key, level: currentLevel})
                    // distance.set(item, {distance: u.distance + 1,  prev: u.key, level: currentLevel})
                }
            }
        }
        return distance.get(this.exit.key);
    }
}

class Node {
    constructor(label, row, col, portal = false, direction = '') {
        this.label = label;
        this.row = row;
        this.col = col;
        this.adjacent;
        this.portal = portal;
        this.direction = direction;
    }
}

function main(array) {
    let donut = new Graph(array);
    donut.parseGrid();
    // console.log('result', donut.portals);
    let result = donut.breadthFirstSearch();
    console.log('steps', result);
}

main(array);