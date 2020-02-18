let fs = require('fs');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_10_input.txt').toString().split("\n");

// let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_10_tests/test_7_test.txt').toString().split("\n");

class Grid {
    constructor() {
        this.asteroids = new Map();
        this.processQueue = new Array();
        this.maxKey = '';
        this.polarCoordinates = [];
    }
    add(row, column) {
        let key = column + '_' + row;
        this.asteroids.set(key, new Map());
        this.processQueue.push({id: key, x: column, y: row})
    }

    calculateSlope(asteroidOne, asteroidTwo) {
        let slope =  (asteroidOne.y - asteroidTwo.y )/ (asteroidOne.x - asteroidTwo.x);
        let y = asteroidOne.y - asteroidTwo.y > 0 ? '+' : '-';
        let x = asteroidOne.x - asteroidTwo.x > 0 ? '+' : '-';
        let key = asteroidOne.id;
        let slopes = this.asteroids.get(key);
        let coordinates;
        if (slopes.has(x + y + slope.toFixed(8))) {
            coordinates = slopes.get(x + y + slope.toFixed(8));
        } else {
            coordinates = new Array();
        }
        
        coordinates.push(asteroidTwo);
        slopes.set(x + y + slope.toFixed(8), coordinates);
        this.asteroids.set(key, slopes);
        key = asteroidTwo.id;
        slopes = this.asteroids.get(key);
        slope = slope;
        y = asteroidOne.y - asteroidTwo.y > 0 ? '-' : '+';
        x = asteroidOne.x - asteroidTwo.x > 0 ? '-' : '+';
        if (slopes.has(x + y + slope.toFixed(8))) {
            coordinates = slopes.get(x + y + slope.toFixed(8));
        } else {
            coordinates = new Array();
        }
        
        coordinates.push(asteroidOne);
        slopes.set(x + y + slope.toFixed(8), coordinates);
        this.asteroids.set(key, slopes);
    }

    bestLocationCount() {
        let maxCount = 0;
        let maxKey = '';
        this.asteroids.forEach((value, key) => {
            if (value.size > maxCount) {
                maxKey = key;
                maxCount = value.size;
            }
            maxCount = Math.max(maxCount, value.size);
        })
        this.maxKey = maxKey;
        return maxCount;
    }

    blowupAsteroids() {
        let count = 0;
        let start = 0;
        for (let i = 0; i < this.polarCoordinates.length; i++) {
            if (this.polarCoordinates[i].radius == 0 ) {
                let start = i;
                break;
            }
        }
        let visited = new Set();
        let asteroid;
        let prevRadius = -1;
        while (count < 200) {    
            asteroid = this.polarCoordinates[start]
            if (!visited.has(asteroid.id) && asteroid.radius != prevRadius) {
                visited.add(asteroid.id);
                count++;
                prevRadius = asteroid.radius;
            }
            if (start == this.polarCoordinates.length - 1) {
                start = 0;
            } else {
                start++;
            }
            
        }
        console.log('200th asteroid', asteroid);
    }

    calculatePolarCoordinates() {
        // I	Use the calculator value
        // II	Add 180° to the calculator value
        // III	Add 180° to the calculator value
        // IV	Add 360° to the calculator value
        let startingPoint = {x: parseInt(this.maxKey.split('_')[0]), y: parseInt(this.maxKey.split('_')[1])}
        let cartesianPoints = this.asteroids.get(this.maxKey);
        cartesianPoints.forEach((value, index, array) => {
            // console.log(value);

            for (let i = 0; i < value.length; i++) {
                let point = value[i];
                let length = Math.sqrt(((point.x - startingPoint.x) ** 2) + ((point.y - startingPoint.y) ** 2))
                let radius;
                // radius = (Math.atan((startingPoint.y - point.y) / (point.x - startingPoint.x))) / (Math.PI / 180);
                // radius = (Math.atan2((startingPoint.y - point.y),(point.x - startingPoint.x))) / (Math.PI / 180);


                // radius = (Math.atan2((startingPoint.y - point.y),(point.x - startingPoint.x)));
                radius = (Math.atan2((point.x - startingPoint.x),(startingPoint.y - point.y))) / (Math.PI / 180);

                if (radius < 0) {
                    radius = radius + 360;
                }
                // radius = radius - 90;
                // if (point.x - startingPoint.x == 0 && point.y < startingPoint.y) {
                //     radius = 0;
                // } else if (point.x - startingPoint.x == 0 && point.y > startingPoint.y) {
                //     radius = 180;
                // } else if (point.y == startingPoint.y && startingPoint.x > point.x) {
                //     radius = 270;
                // } else if (point.y == startingPoint.y && startingPoint.x < point.x) {
                //     radius = 90;
                // }
                
                // if (point.x > startingPoint.x && point.y < startingPoint.y) {
                //     // quadrant 1:
                //     radius = radius
                // } else if (point.x < startingPoint.x && point.y < startingPoint.y) {
                //         //quadrant 2:
                //         // radius = 180 - radius;

                    
                // } else if (point.x < startingPoint.x && point.y > startingPoint.y) {
                //     // quadrant 3:
                //     // radius = 180 - radius;

                // } else if (point.x > startingPoint.x && point.y > startingPoint.y) {
                //     // quadrant 4:

                // }
                
                // if (point.x > startingPoint.x && point.y > startingPoint.y) {
                //     radius = radius + 360;
                // } else if (point.x > startingPoint.x && point.y < startingPoint.y) {
                //     // in quadrant 1
                //     radius = radius;
                // } else if (point.x < startingPoint.x && point.y > startingPoint.y) {
                //     radius = radius + 180;
                // } else if (point.x < startingPoint.x && point.y < startingPoint.y) {
                //     radius = 270 + radius ;
                // }
                
                this.polarCoordinates.push({id: point.id, length: length, radius: radius});
            }
            
        })
        this.polarCoordinates.sort((a, b) => {
            if (a.radius == b.radius) {
                return a.length - b.length;
            } else {
                return a.radius - b.radius;
            }
            
        })
    }



    // line slope = change in Y / change in X

    // determine if point is on a line slope:
    // y - y1 = m(x - x1)
    // x1, y1 = known point on line
    // y & x is any other point

    // calculate slope of the point and all other points, and don't count any duplicates


}
function main(array) {
    let spaceGrid = new Grid();

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            let item = array[row][col];
            if (item == '#') {
                spaceGrid.add(row,col);
            }
        }
    }

    for (let i = 0; i < spaceGrid.processQueue.length; i++) {
        let asteroidOne = spaceGrid.processQueue[i];
        for (let j = i + 1; j < spaceGrid.processQueue.length; j++) {
            let asteroidTwo = spaceGrid.processQueue[j];

            spaceGrid.calculateSlope(asteroidOne, asteroidTwo);

        }
    }

    spaceGrid.bestLocationCount();
    console.log('maxKey', spaceGrid.maxKey);
    spaceGrid.calculatePolarCoordinates();
    spaceGrid.blowupAsteroids();
    // console.log(array);
}

module.exports = main;
console.log(main(array));