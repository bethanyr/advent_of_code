// initial input:
// <x=-9, y=10, z=-1>
// <x=-14, y=-8, z=14>
// <x=1, y=5, z=6>
// <x=-19, y=7, z=8>

let array = [{x: -9, y: 10, z: -1}, 
    {x: -14, y: -8, z: 14},
{ x: 1, y: 5, z: 6}, 
{x: -19, y: 7, z: 8}]

let testArray = [{x: -1, y: 0, z: 2}, 
    {x: 2, y: -10, z: -7},
    { x: 4, y: -8, z: 8}, 
    {x: 3, y: 5, z: -1}]

let testArray2 = [{x: -8, y: -10, z: 0}, 
    {x: 5, y: 5, z: 10},
    { x: 2, y: -7, z: 3}, 
    {x: 9, y: -8, z: -3}]

class Moon {
    constructor(name, position) {
        this.position = {x: position.x, y: position.y, z: position.z};
        this.initialPosition = {x: position.x, y: position.y, z: position.z}
        this.velocity = {x: 0, y: 0, z: 0};
        this.initialVelocity = {x: 0, y: 0, z: 0};
        this.name = name;
        // this.history = new Map();
        // this.orbitSteps = new Map();
        this.xOrbit = false;
        this.yOrbit = false;
        this.zOrbit = false;
        this.xSteps = 0;
        this.ySteps = 0;
        this.zSteps = 0;
    }

    completedOrbit() {
        return this.xOrbit;
        // return this.xOrbit && this.yOrbit && this.zOrbit;
    }
    totalEnergy() {
        return this.potentialEnergy() * this.kineticEnergy();
    }

    potentialEnergy() {
        return Math.abs(this.position.x) + Math.abs(this.position.y) + Math.abs(this.position.z);
    }

    kineticEnergy() {
        return Math.abs(this.velocity.x) + Math.abs(this.velocity.y) + Math.abs(this.velocity.z);
    }

    updateHistory2(steps) {
        
        // if (!this.xOrbit && this.velocity.x == 0) {
        //     this.xSteps = steps;
        //     this.xOrbit = true;
        // }
        // if (!this.yOrbit && this.velocity.y == 0) {
        //     this.ySteps = steps;
        //     this.yOrbit = true;
        // }
        // if (!this.zOrbit && this.velocity.z == 0) {
        //     this.zSteps = steps;
        //     this.zOrbit = true;
        // }
    }

    updateHistory(steps) {
        // let history = this.position.x + '_' + this.position.y + '_' + this.position.z + '_' + this.velocity.x + '_' + this.velocity.y + '_' + this.velocity.z;
        // let temp;
        // let energy = this.totalEnergy();
        // if (this.history.has(energy)) {
        //     temp = this.history.get(energy);
        // } else {
        //     temp  = new Set();
        // }
        // temp.add(history);
        // this.history.set(energy, temp);
        // if (!this.completedOrbit && this.kineticEnergy() == 0) {
        //     if (this.initialPosition.x == this.position.x 
        //         && this.initialPosition.y == this.position.y 
        //         && this.initialPosition.z == this.position.z
        //         && this.initialVelocity.x == this.velocity.x
        //         && this.initialVelocity.y == this.velocity.y
        //         && this.initialVelocity.z == this.velocity.z) {
        //             this.orbitSteps = steps;
        //             this.completedOrbit = true;
        //         }
        // } 
        // if (!this.completedOrbit) {
            if (!this.xOrbit && this.initialPosition.x == this.position.x && this.initialVelocity.x == this.velocity.x) {
                this.xSteps = steps;
                this.xOrbit = true;
            }
            if (!this.yOrbit && this.initialPosition.y == this.position.y && this.initialVelocity.y == this.velocity.y) {
                this.ySteps = steps;
                this.yOrbit = true;
            }
            if (!this.zOrbit && this.initialPosition.z == this.position.z && this.initialVelocity.z == this.velocity.z) {
                this.zSteps = steps;
                this.zOrbit = true;
            }
        // }
    }

    checkHistory() {
        // let energy = this.totalEnergy();
        // if (this.history.has(energy)) {
        //     let temp = this.history.get(energy);
        //     let history = this.position.x + '_' + this.position.y + '_' + this.position.z + '_' + this.velocity.x + '_' + this.velocity.y + '_' + this.velocity.z;

        //     return temp.has(history); 
        // } else {
        //     return false;
        // }
        return this.completedOrbit();
        
    }
}

class Space {
    constructor(moons) {
        this.moons = moons;
        this.step = 0;
        this.xOrbit = false;
        this.yOrbit = false;
        this.zOrbit = false;
    }

    applyGravity() {
        for (let i = 0; i < this.moons.length; i++) {
            let moonA = this.moons[i];
            for (let j = i + 1; j < this.moons.length; j++) {
                let moonB = this.moons[j];
                this.evaluateVelocity(moonA, moonB);
            }
        }
    }

    evaluateVelocity(moonA, moonB) {
        if (moonA.position.x > moonB.position.x) {
            moonA.velocity.x = moonA.velocity.x - 1;
            moonB.velocity.x = moonB.velocity.x + 1;
        } else if (moonA.position.x < moonB.position.x) {
            moonA.velocity.x = moonA.velocity.x + 1;
            moonB.velocity.x = moonB.velocity.x - 1;
        }

        if (moonA.position.y > moonB.position.y) {
            moonA.velocity.y = moonA.velocity.y - 1;
            moonB.velocity.y = moonB.velocity.y + 1;
        } else if (moonA.position.y < moonB.position.y) {
            moonA.velocity.y = moonA.velocity.y + 1;
            moonB.velocity.y = moonB.velocity.y - 1;
        }

        if (moonA.position.z > moonB.position.z) {
            moonA.velocity.z = moonA.velocity.z - 1;
            moonB.velocity.z = moonB.velocity.z + 1;
        } else if (moonA.position.z < moonB.position.z) {
            moonA.velocity.z = moonA.velocity.z + 1;
            moonB.velocity.z = moonB.velocity.z - 1;
        }
    }

    updatePositions() {
        for (let i = 0; i < this.moons.length; i++) {
            let moon = this.moons[i];
            moon.position.x = moon.position.x + moon.velocity.x;
            moon.position.y = moon.position.y + moon.velocity.y;
            moon.position.z = moon.position.z + moon.velocity.z;
        }
    }

    checkRotation() {
        if (!this.xOrbit) {
            if (this.moons[0].position.x == this.moons[0].initialPosition.x &&
                this.moons[0].velocity.x == this.moons[0].initialVelocity.x &&
                this.moons[1].position.x == this.moons[1].initialPosition.x &&
                this.moons[1].velocity.x == this.moons[1].initialVelocity.x &&
                this.moons[2].position.x == this.moons[2].initialPosition.x &&
                this.moons[2].velocity.x == this.moons[2].initialVelocity.x &&
                this.moons[3].position.x == this.moons[3].initialPosition.x&&
                this.moons[3].velocity.x == this.moons[3].initialVelocity.x ) {
                    this.xOrbit = true;
                    this.xSteps = this.step;
            }
        }
        if (!this.yOrbit) {
            if (this.moons[0].position.y == this.moons[0].initialPosition.y &&
                this.moons[0].velocity.y == this.moons[0].initialVelocity.y &&
                this.moons[1].position.y == this.moons[1].initialPosition.y &&
                this.moons[1].velocity.y == this.moons[1].initialVelocity.y &&
                this.moons[2].position.y == this.moons[2].initialPosition.y &&
                this.moons[2].velocity.y == this.moons[2].initialVelocity.y &&
                this.moons[3].position.y == this.moons[3].initialPosition.y &&
                this.moons[3].velocity.y == this.moons[3].initialVelocity.y) {
                    this.yOrbit = true;
                    this.ySteps = this.step;
            }
        }
        if (!this.zOrbit) {
            if (this.moons[0].position.z == this.moons[0].initialPosition.z &&
                this.moons[0].velocity.z == this.moons[0].initialVelocity.z &&
                this.moons[1].position.z == this.moons[1].initialPosition.z &&
                this.moons[1].velocity.z == this.moons[1].initialVelocity.z &&
                this.moons[2].position.z == this.moons[2].initialPosition.z &&
                this.moons[2].velocity.z == this.moons[2].initialVelocity.z &&
                this.moons[3].position.z == this.moons[3].initialPosition.z &&
                this.moons[3].velocity.z == this.moons[3].initialVelocity.z) {
                    this.zOrbit = true;
                    this.zSteps = this.step;
            }
        }
    }


    move(steps) {    
        for (let step = 0; step < steps; step++) {
            this.step = step;
            this.applyGravity();
            this.updatePositions();        
        }
    }

    orbit() {
        // let historyMatch = this.updateHistory();
        let historyMatch = false;
        while (!this.xOrbit || !this.yOrbit || !this.zOrbit) {
            ++this.step;            
            this.applyGravity();
            this.updatePositions();
            this.checkRotation();
            // historyMatch = this.updateHistory();
        }
        console.log(this.moons);
        return this.LCM();
        // return this.step * 2;
    }

    orbit2() {
        // let historyMatch = this.updateHistory();
        ++this.step;            
        this.applyGravity();
        this.updatePositions();
        while (this.totalEnergy() != 0 ) {
            ++this.step;            
            this.applyGravity();
            this.updatePositions();
            // historyMatch = this.updateHistory();
        }
        console.log(this.step * 2);
        return this.step;
        // return this.LCM();
        // return this.step * 2;
    }

    LCM() {
        let orbits = [this.xSteps, this.ySteps, this.zSteps];
        // for (let i = 0; i < this.moons.length; i++) {
        //     orbits.push(this.moons[i].xSteps);
        //     orbits.push(this.moons[i].ySteps);
        //     orbits.push(this.moons[i].zSteps);
        // }


        return orbits;
    }

    updateHistory() {
        // let historyMatch = 0
        // for (let i = 0; i < this.moons.length; i++) { 
        //     if (this.moons[i].checkHistory()){
        //         historyMatch++;
        //     } else {
        //         this.moons[i].updateHistory();
        //     }
        // }
        // return historyMatch == 4;
        let historyMatch = 0;
        for (let i = 0; i < this.moons.length; i++) { 
            if (this.moons[i].checkHistory()){
                historyMatch++;
            } else {
                this.moons[i].updateHistory(this.step);
            }
        }
        return historyMatch == 4;
        return (this.totalKineticEnergy() == 0);
    }

    totalEnergy() {
        let energy = 0;
        for (let i = 0; i < this.moons.length; i++) {
            energy += this.moons[i].totalEnergy();
        }
        return energy;
    }

    totalKineticEnergy() {
        let energy = 0;
        for (let i = 0; i < this.moons.length; i++) {
            energy += this.moons[i].kineticEnergy();
        }
        return energy;
    }

}

function main(array, steps) {

    const MOON_NAMES = ['Io', 'Europa', 'Ganymede', 'Callisto']
    let moons = [];
    for (let i = 0; i < array.length; i++) {
        let moon = new Moon(MOON_NAMES[i], array[i]);
        moons.push(moon);
    }

    let space = new Space(moons);
    space.move(steps);
    return space.totalEnergy();
}

function orbit(array) {
    const MOON_NAMES = ['Io', 'Europa', 'Ganymede', 'Callisto']
    let moons = [];
    for (let i = 0; i < array.length; i++) {
        let moon = new Moon(MOON_NAMES[i], array[i]);
        moons.push(moon);
    }

    let space = new Space(moons);
    // let orbits = space.orbit();
    let orbits = space.orbit();

    return orbits;
}

// module.exports = main, Space, Moon;
// console.log(main(testArray, 2772));

console.log(orbit(array));

Math.gcd = function() {
    if (arguments.length == 2) {
        if (arguments[1] == 0)
            return arguments[0];
        else
            return Math.gcd(arguments[1], arguments[0] % arguments[1]);
    } else if (arguments.length > 2) {
        var result = Math.gcd(arguments[0], arguments[1]);
        for (var i = 2; i < arguments.length; i++)
            result = Math.gcd(result, arguments[i]);
        return result;
    }
};