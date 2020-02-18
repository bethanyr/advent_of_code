let fs = require('fs');

// let array = fs.readFileSync('day_3_input.txt').toString().split("\n");
// let array = fs.readFileSync('day_3_test.txt').toString().split("\n");

class CircuitPanel {
    constructor() {
        this.wire1Positions = new Array();
        this.wire2Positions = new Array();
        this.currentWire1Position = {x: 0, y: 0};
        this.currentWire2Position = {x: 0, y: 0};
        this.centralPort = {x: 0, y: 0};
        this.totalSteps = 0;

    }
    calculateDistance(position, startingPoint) {
        let distance = Math.abs(position.x - startingPoint.x + position.y - startingPoint.y);
        return distance;
    }
    
    move(move, position, positions) {
    
        let direction = move[0];
        let distance = parseInt(move.slice(1));
        switch (direction) {
            case 'R':
                for (let i = position.x + 1; i <= position.x + distance; i++) {
                    ++this.totalSteps;
                    if (positions[i]) {
                        if (positions[i][position.y] > 0) {
                            console.log('in r');
                        } else {
                            positions[i][position.y] = this.totalSteps;
                        }
                        
                    } else {
                        positions[i] = new Array();
                        positions[i][position.y] = this.totalSteps;
                    }   
                }
                position.x = position.x + distance;
                break;
            case 'L':
                    for (let i = position.x - 1; i >= position.x - distance; i--) {
                        ++this.totalSteps;
                        if (positions[i]) {
                            if (positions[i][position.y] > 0) {
                                console.log('in l');
                            } else {
                                positions[i][position.y] = this.totalSteps;
                            }
                            
                        } else {
                            positions[i] = new Array();
                            positions[i][position.y] = this.totalSteps;
                        }   
                    }
                position.x = position.x - distance;
                break;
            case 'U':
                    for (let i = position.y + 1; i <= position.y + distance; i++) {
                        ++this.totalSteps;
                        if (positions[position.x][i] > 0) {
                            console.log('in u');
                        } else {
                            positions[position.x][i] = this.totalSteps;
                        }
                          
                    }
                position.y = position.y + distance;
                break;
            case 'D':
                    for (let i = position.y - 1; i >= position.y - distance; i--) {
                        ++this.totalSteps;
                        if (positions[position.x][i] > 0) {
                            console.log('in d');
                        } else {
                            positions[position.x][i] = this.totalSteps;
                        }
                          
                    }
                position.y = position.y - distance;
                break;
        }
        return position;
    }

}
function main(array) {
    wire_1 = array[0].split(',');
    wire_2 = array[1].split(',');
    // console.log('wire1', wire_1);
    // console.log('wire2', wire_2);

    // first item = central port
    let panel = new CircuitPanel();
    panel.wire1Positions[0] = new Array();
    panel.wire1Positions[0][0] = 0;

    panel.wire2Positions[0] = new Array();
    panel.wire2Positions[0][0] = 0;
 
    let minDistance = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < wire_1.length; i++) {
        let wire1Move = wire_1[i];
        panel.currentWire1Position = panel.move(wire1Move, panel.currentWire1Position, panel.wire1Positions);
              
    }
    panel.totalSteps = 0;
    for (let j = 0; j < wire_2.length; j++) {
        let wire2Move = wire_2[j];
        panel.currentWire2Position = panel.move(wire2Move, panel.currentWire2Position, panel.wire2Positions);
        // currentWire2Position = panel.move(wire2Move, currentWire2Position);

        // if (wire1Positions[currentWire2Position.x] &&
        //     wire1Positions[currentWire2Position.x][currentWire2Position.y]) {
        //     let min = calculateDistance(currentWire2Position, centralPort);

        //     minDistance = Math.min(minDistance, min);
        // }
    }

    for (let x = 0; x < panel.wire2Positions.length; x++) {
        for (let y = 0; y < panel.wire2Positions[x].length; y++) {
            if (panel.wire2Positions[x] && panel.wire2Positions[x][y] && panel.wire1Positions[x] && panel.wire1Positions[x][y]) {
                let min = panel.wire2Positions[x][y] + panel.wire1Positions[x][y];
                if (min === 0) {

                } else {
                    minDistance = Math.min(minDistance, min);
                }
                
            }
        }
    }
    return minDistance;
}



// let testArray = [ 'R8,U5,L5,D3', 'U7,R6,D4,L4' ]

let testArray = [ 'R75,D30,R83,U83,L12,D49,R71,U7,L72',
'U62,R66,U55,R34,D71,R55,D58,R83' ]

// let testArray = ['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
//     'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7']

// let testArray = ["R5,U2,L5", "U5,R2,D3"]

console.log(main(testArray));
// console.log(array);
// console.log(main(array));