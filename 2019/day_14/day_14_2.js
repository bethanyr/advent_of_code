let fs = require('fs');
let file = 'day_14_input.txt'
let array = fs.readFileSync(`/Users/bethanyr/advent_of_code/2019/day_14/${file}`).toString().split("\n");

class FuelFactory{
    constructor(array) {
        this.formula;
        this.materialsStorage = new Map();
        this.recipe = new Map();
        this.makeFormula(array);
        this.reactorQueue = new Array();
        this.materialNeeds = new Map();
        this.fuelCount = 0;
    }

    makeFormula(array) {
        for (let i = 0; i < array.length; i++) {
            let formula = array[i].split(' => ');
            let input = formula[0].split(', ');
            let output = formula[1];
            this.storeRecipe(input, output);
            let material = output.split(' ')[1];
            this.materialsStorage.set(material, 0);
        }
        this.materialsStorage.set('ORE', 0);
    }

    storeRecipe(items, output) {
        // console.log(items);
        let outputMaterial = output.split(' ')[1];
        let outputQuantity = parseInt(output.split(' ')[0]);
        let recipe = new Array();
        for (let i = 0; i < items.length; i++) {
            let temp = items[i].split(' ');
            let quantity = parseInt(temp[0]);
            let mat = temp[1];            
            recipe.push({material: mat, quantity: quantity});            
        }
        // recipe.sort((a, b) => {
        //     return b.quantity - a.quantity;
        // })
        this.recipe.set(outputMaterial, {outputQuantity: outputQuantity, recipe})
    }

    makeFuel() {
        let item = this.recipe.get('FUEL');
        this.reactorQueue.push({key: 'FUEL', output: item.outputQuantity, recipe: item.recipe, amountNeeded: 1});

        while (this.reactorQueue.length > 0) {
            let step = this.reactorQueue.shift();
            let output = {key: step.key, quantity: step.output, amountNeeded: step.amountNeeded};
            // check materialstorage before making more of something.

            let inStorage = this.materialsStorage.get(output.key);
            if (inStorage >= output.amountNeeded) {
                this.materialsStorage.set(output.key, inStorage - output.amountNeeded);
            } else {
                let recipe = step.recipe;
                for (let i = 0; i < recipe.length; i++) {
                    let key  = recipe[i].material;
                    let value = recipe[i].quantity;
                    let materialCount = this.materialsStorage.get(key);
                    if (key == 'ORE') {
                        materialCount = materialCount + value;
                        this.materialsStorage.set(key, materialCount);
                        // let leftovers = output.quantity - output.amountNeeded;
                        // this.materialsStorage.set(output.key, leftovers);
                    }
                    else if (materialCount >= value) {
                        // we have enough of the material already let's use it
                        materialCount = materialCount - value;
                        this.materialsStorage.set(key, materialCount);
                    } else {
                        this.reactorQueue.push({key: key, output:  this.recipe.get(key).outputQuantity, recipe: this.recipe.get(key).recipe, amountNeeded: value});
                        
                    }
                }
                let currentAmount = this.materialsStorage.get(output.key) + output.quantity;
                let netAmount = currentAmount - output.amountNeeded;
                if (netAmount >= 0) {
                    this.materialsStorage.set(output.key, netAmount);
                } else {
                    this.materialsStorage.set(output.key, currentAmount);
                    this.reactorQueue.push({key: output.key, output: output.quantity, recipe: this.recipe.get(output.key).recipe, amountNeeded: output.amountNeeded})
                }  
            }
            // check after making the amount, we need to apply it
                       
            
        }
        this.fuelCount++;
    }

    maximizeFuel(oreAmount) {
        while (this.materialsStorage.get('ORE') < oreAmount) {
            // console.log('ORE', this.materialsStorage.get('ORE'));
            this.makeFuel();
        }
        return this.fuelCount - 1;
    }
  
}

function main(array) {
    let factory = new FuelFactory(array);
    // factory.makeFuel();
    factory.makeFuel();
    

    console.log(factory.materialsStorage)

    console.log(factory.maximizeFuel(1000000000000));
    console.log(factory.materialsStorage)
}
main(array);