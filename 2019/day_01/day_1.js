let fs = require('fs');

let array = fs.readFileSync('day_1_part_1_input.txt').toString().split("\n");

function main(array) {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
        let fuel = fuelCounterUpper(array[i]);
        result += fuel;
        let moreFuel = calculateFuelForFuel(fuel);
        result += moreFuel;

    }
    return result;
}

function fuelCounterUpper(mass) {
    return Math.floor(mass / 3) - 2;
}

function calculateFuelForFuel(fuel) {
    let result = 0;
    while (fuel > 0) {
        fuel = Math.floor(fuel / 3) - 2;
        if (fuel > 0) {
            result += fuel;
        }  
    }
    return result;
}

console.log(main(array));