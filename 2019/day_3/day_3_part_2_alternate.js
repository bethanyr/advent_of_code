let fs = require('fs');

let array = fs.readFileSync('day_3_input.txt').toString().split("\n");
// let array = fs.readFileSync('day_3_test.txt').toString().split("\n");

class CircuitPanel {
    constructor() {
        this.wire1Positions = new Map();
        this.wire2Positions = new Map();
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
                    if (positions.has(i + '_' + position.y)) {

                    } else {
                        positions.set(i + '_' + position.y, this.totalSteps);
                    }
                        
                     
                }
                position.x = position.x + distance;
                break;
            case 'L':
                    for (let i = position.x - 1; i >= position.x - distance; i--) {
                        ++this.totalSteps;
                        if (positions.has(i + '_' + position.y)) {

                        } else {
                            positions.set(i + '_' + position.y, this.totalSteps);
                        }  
                    }
                position.x = position.x - distance;
                break;
            case 'U':
                    for (let i = position.y + 1; i <= position.y + distance; i++) {
                        ++this.totalSteps;
                        if (positions.has(position.x + '_' + i)) {

                        } else {
                            positions.set(position.x + '_' + i, this.totalSteps);
                        }
                          
                    }
                position.y = position.y + distance;
                break;
            case 'D':
                    for (let i = position.y - 1; i >= position.y - distance; i--) {
                        ++this.totalSteps;
                        if (positions.has(position.x + '_' + i)) {

                        } else {
                            positions.set(position.x + '_' + i, this.totalSteps);
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

    let panel = new CircuitPanel();
 
    let minDistance = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < wire_1.length; i++) {
        let wire1Move = wire_1[i];
        panel.currentWire1Position = panel.move(wire1Move, panel.currentWire1Position, panel.wire1Positions);
              
    }
    panel.totalSteps = 0;
    for (let j = 0; j < wire_2.length; j++) {
        let wire2Move = wire_2[j];
        panel.currentWire2Position = panel.move(wire2Move, panel.currentWire2Position, panel.wire2Positions);
        
    }

    panel.wire1Positions.forEach(function(value, key) {
        if (panel.wire2Positions.has(key)) {
            let min = value + panel.wire2Positions.get(key);
            minDistance = Math.min(min, minDistance);
        }
    })
    
    return minDistance;
}



// let testArray = [ 'R8,U5,L5,D3', 'U7,R6,D4,L4' ]

// 'let testArray = [ 'R75,D30,R83,U83,L12,D49,R71,U7,L72',
// U62,R66,U55,R34,D71,R55,D58,R83' ]

// let testArray = ['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
//     'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7']

// let testArray = ["R5,U2,L5", "U5,R2,D3"]

// console.log(main(testArray));
// console.log(array);
console.log(main(array));