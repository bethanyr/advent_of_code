let fs = require('fs');

const { IntcodeComputer } = require('../day_11_intcode');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_19/day_19_input.txt').toString().split("\n")[0].split(',').map(item => parseInt(item));

class Drone {
    constructor (array) {
        this.computer = new IntcodeComputer(array);
        this.array = array;
        this.beingPulled = 0;
        this.grid = new Array(49);
    }

    runDrone(x, y) {
        let result = this.computer.run([y, x]);
        return result.result[0];
    }

}

function main(array) {
    let totalPull = 0;
    let grid = new Array(50);
    const drone = new Drone(array);
    for (let y = 0; y < 50; y++) {
        
        for (let x = 0; x < 50; x++) {
            
            
            let result = drone.runDrone(x, y);
            if (result == 1) {
                totalPull++;
            }
            if (!grid[y]) {
                grid[y] = new Array(50);
            }
            grid[y][x] = result;
            drone.computer.reset();
        }
    }
    // let drone2 = new Drone(array);
    // let result2 = drone2.runDrone(2,2);
    console.log('points affected', totalPull);
}

main(array);