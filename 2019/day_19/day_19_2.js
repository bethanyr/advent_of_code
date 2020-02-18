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
    let pull = 0;
    let grid = new Array();
    const drone = new Drone(array);
    let y = 120;

    // for (let i = 1400; )
    let tractorBeamResults = new Array();

    let leftBound = 0;
    let rightBound = 0;

    let prevResult;
    let running = true;
    let x;
    while (running) {
        let foundLeft = false;
        let foundRight = false;
        x = leftBound;
        rightBound = leftBound;
        while (leftBound >= rightBound) {
            let result = drone.runDrone(x, y);     
            if (result == 1) {
                if (!foundLeft) {
                    leftBound = x;
                    
                    foundLeft = true;
                }
                
                pull++;
            } else if (result == 0 && prevResult == 1) {
                rightBound = x;
                foundRight = true;
                
            }
            if (!grid[y]) {
                grid[y] = new Array();
            }
            grid[y][x] = result;
            drone.computer.reset();
            prevResult = result;
            x++;
        }
        let finalX;
        let finalY;
        if (pull >= 100) {
        // if (pull > 100) {
            tractorBeamResults.push(pull);
            rightWidth = true;
            for (let i = 0; i < 150; i++) {
                drone.computer.reset();
                let result = drone.runDrone(leftBound, y - i);
                if (!grid[y-i]) {
                    grid[y-i] = new Array();
                }
                grid[y - i][leftBound] = result;
                if (result != 1) {
                    if (i < 100) {
                        rightWidth = false;

                        break;
                    } else {
                        finalY = y - i - 1;
                    }
                    
                }
            }
            if (rightWidth) {
                for (let i = 0; i < 150; i++) {
                    drone.computer.reset();
                    let result = drone.runDrone(leftBound + 100, y - i);
                    if (!grid[y-i]) {
                        grid[y-i] = new Array();
                    }
                    grid[y - i][leftBound + 100] = result;
                    if (result != 1) {
                        if (i < 100) {
                            rightWidth = false;
    
                            break;
                        } else {
                            finalY = y - i - 1;
                        }
                        
                    }
                }
            }
            
            if (rightWidth) {
                console.log('found right width: x', leftBound );
                console.log('y', y - 100); 
                let answer = (leftBound * 10000) + y-100;
                console.log('final result', answer)
                return;
            }
        }
        
        pull = 0;
        result = 0;
        prevResult = 0;
        y = y + 100;
        
    }

    // let drone2 = new Drone(array);
    // let result2 = drone2.runDrone(2,2);
    console.log('points affected', tractorBeamResults);
}

function main2(array) {
    let totalPull = 0;
    let pull = 0;
    let grid = new Array();
    const drone = new Drone(array);
    let y = 1200;
    // let x = 0;
    
    while (true) {
        for (let x = 1000; x < 2000; x++) {
            let result = drone.runDrone(x, y);
            if (result == 1) {
                drone.computer.reset();
                result = drone.runDrone(x + 99, y + 99);
                if (result == 1) {
                    drone.computer.reset();
                    result = drone.runDrone(x + 99, y);
                    if (result == 1){
                        drone.computer.reset();
                        result = drone.runDrone(x, y + 99);
                        if (result == 1) {
                            console.log('x', x);
                            console.log('y', y);
                            let answer = (y * 10000) + x;
                            console.log('final result', answer)

                            // 15371356 is incorrect
                            // try: 13561537 --> that is correct - the x and y were mixed up 
                            // for some reason.
                            return;
                        }
                    }
                    
                }
            }
            drone.computer.reset();
        }
        y++;
        
    }
    console.log('points affected', tractorBeamResults);
}

main2(array);