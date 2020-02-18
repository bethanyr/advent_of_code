// 266375 --> too large
// 112025 --> too low

let fs = require('fs');
let file = 'day_14_test3_input.txt'
let array = fs.readFileSync(`/Users/bethanyr/advent_of_code/2019/day_14/${file}`).toString().split("\n");

class FuelFactory{
    constructor(array) {
        this.formula;
        this.materialsStorage = new Map();
        this.recipe = new Map();
        this.makeFormula(array);
        this.reactorQueue = new Array();
        this.materialNeeds = new Map();
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
        recipe.sort((a, b) => {
            return b.quantity - a.quantity;
        })
        this.recipe.set(outputMaterial, {outputQuantity: outputQuantity, recipe})
    }

    makeFuel() {
        let item = this.recipe.get('FUEL');
        this.reactorQueue.push({key: 'FUEL', output: item.outputQuantity, recipe: item.recipe, amountNeeded: 1});

        while (this.reactorQueue.length > 0) {
            let step = this.reactorQueue.shift();
            let output = {key: step.key, quantity: step.output, amountNeeded: step.amountNeeded};
            let recipe = step.recipe;
            for (let i = 0; i < recipe.length; i++) {
                let key  = recipe[i].material;
                let value = recipe[i].quantity;
                let materialCount = this.materialsStorage.get(key);
                if (key == 'ORE') {
                    let materialNeedCount = 0;
                    if (this.materialNeeds.has(output.key)) {
                        materialNeedCount = this.materialNeeds.get(output.key);
                    }
                    this.materialNeeds.set(output.key, materialNeedCount + output.amountNeeded);
                    materialCount = materialCount + value;
                    this.materialsStorage.set(key, materialCount);
                }
                else if (materialCount >= value) {
                    // we have enough of the material already let's use it
                    materialCount = materialCount - value;
                    this.materialsStorage.set(key, materialCount);
                } else {
                    this.reactorQueue.push({key: key, output:  this.recipe.get(key).outputQuantity, recipe: this.recipe.get(key).recipe, amountNeeded: value * output.amountNeeded});
                    
                }
            }
            
            let currentAmount = this.materialsStorage.get(output.key) + output.quantity;
            let netAmount = currentAmount - output.amountNeeded;
            if (netAmount >= 0) {
                this.materialsStorage.set(output.key, netAmount);
            } else {
                this.materialsStorage.set(output.key, currentAmount);
                this.reactorQueue.push({key: output.key, output: output.quantity, recipe: this.recipe.get(output.key).recipe, amountNeeded: output.amountNeeded - currentAmount})
            }  
        }
    }

    makeFuel_backup() {
        let item = this.recipe.get('FUEL');
        this.reactorQueue.push({key: 'FUEL', output: item.outputQuantity, recipe: item.recipe, amountNeeded: 1});

        while (this.reactorQueue.length > 0) {
            let step = this.reactorQueue.shift();
            let output = {key: step.key, quantity: step.output, amountNeeded: step.amountNeeded};
            let recipe = step.recipe;
            for (let i = 0; i < recipe.length; i++) {
                let key  = recipe[i].material;
                let value = recipe[i].quantity;
                let materialCount = this.materialsStorage.get(key);
                if (key == 'ORE') {
                    let materialNeedCount = 0;
                    if (this.materialNeeds.has(output.key)) {
                        materialNeedCount = this.materialNeeds.get(output.key);
                    }
                    this.materialNeeds.set(output.key, materialNeedCount + output.amountNeeded);
                    // this.materialsStorage.set(key, materialCount);


                // }
                // else if (materialCount >= value) {
                //     // we have enough of the material already let's use it
                //     materialCount = materialCount - value;
                //     this.materialsStorage.set(key, materialCount);
                } else {
                    this.reactorQueue.push({key: key, output:  this.recipe.get(key).outputQuantity, recipe: this.recipe.get(key).recipe, amountNeeded: value * output.amountNeeded});
                    
                }
            }
            
            // let currentAmount = this.materialsStorage.get(output.key) + output.quantity;
            // let netAmount = currentAmount - output.amountNeeded;
            // if (netAmount >= 0) {
            //     this.materialsStorage.set(output.key, netAmount);
            // } else {
            //     this.materialsStorage.set(output.key, currentAmount);
            //     this.reactorQueue.push({key: output.key, output: output.quantity, recipe: this.recipe.get(output.key).recipe, amountNeeded: output.amountNeeded})
            // }  
        }
    }

    fuelCost() {
        let oreAmount = 0;
        this.materialNeeds.forEach((value, key) => {
            let source =this.recipe.get(key);

            let recipe = source.recipe;
            let quantity = Math.floor(value / source.outputQuantity);
            if (value % source.outputQuantity > 0) {
                quantity = quantity + 1;
            }
            oreAmount += quantity * recipe[0].quantity;

        })
        return oreAmount;
    }

    makeFuel2() {
        let fuelComponents = this.recipe.get('FUEL').recipe;
        for (let i = 0; i < fuelComponents.length; i++) {
            let component = fuelComponents[i];
            let recipe = this.recipe.get(component.material).recipe;
            this.reactorQueue.push({key: component.material, output: component.quantity, recipe: recipe, amountNeeded: component.quantity});

            while (this.reactorQueue.length > 0) {
                let step = this.reactorQueue.shift();
                let output = {key: step.key, quantity: step.output, amountNeeded: step.amountNeeded};
                let recipe = step.recipe;
                for (let i = 0; i < recipe.length; i++) {
                    let key  = recipe[i].material;
                    let value = recipe[i].quantity;
                    let materialCount = this.materialsStorage.get(key);
                    if (key == 'ORE') {
                        materialCount = materialCount + value;
                        this.materialsStorage.set(key, materialCount);
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
        }
        
    }
}

function main(array) {
    let factory = new FuelFactory(array);
    // factory.makeFuel();
    factory.makeFuel();
    let result = factory.fuelCost();
    console.log('ORE Amount', result);
    console.log(factory.materialsStorage)
    
}
main(array);