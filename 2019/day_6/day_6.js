let fs = require('fs');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_6_input.txt').toString().split("\n");

class Graph {
    constructor() {
        this.items = new Map();
        this.topDownItems = {};
        this.orbitQueue = new Array();
        this.orbits = new Set();
    }

    insert(item) {
        this.items.set(item[1], item[0]);
        if (this.topDownItems[item[0]]) {
            this.topDownItems[item[0]].push(item[1]);
        } else {
            this.topDownItems[item[0]] = new Array();
            this.topDownItems[item[0]].push(item[1]);
        }
        
        this.orbitQueue.push(item[1]);
        this.orbits.add(item[1]);
    }

    countOrbits() {
        let totalOrbits = 0;
        let current, parent;
        
        for (let i = 0; i < this.orbitQueue.length; i++) {
            current = this.orbitQueue[i];
            parent = this.items.get(current);
            totalOrbits++;
            while(this.items.has(parent)) {
                
                current = parent;
                parent = this.items.get(current);
                totalOrbits++;
            }
            
        }
        return totalOrbits;
    }


    orbitalTransfers() {
        let santaParent = this.items.get('SAN');
        let santaPath = new Map();
        let santaCount = 0;
        while (santaParent != 'COM') {
            santaPath.set(santaParent, santaCount);
            santaParent = this.items.get(santaParent);
            santaCount++;
        }

        let youParent = this.items.get('YOU');
        let youPath = new Set();
        let transferCount = 0;
        while (!santaPath.has(youParent)) {
            transferCount++;
            youParent = this.items.get(youParent);
        }
        console.log('transferCount', transferCount);
        return santaPath.get(youParent) + transferCount;
        // let visitTransferQueue = this.topDownItems[youParent];
        // let tempTransferCount = 0;
        // while (visitTransferQueue.length > 0) {
        //     let nextTransfer = visitTransferQueue.shift();
        //     if (nextTransfer == 'SAN'){
        //         return tempTransferCount + transferCount;
        //     } else if (nextTransfer == undefined) {
        //         tempTransferCount = 0;
        //     } else {
        //         let transfers = this.topDownItems[nextTransfer];
        //         if (transfers && transfers.length > 0) {
        //             tempTransferCount++;
        //             for (let j = 0; j < transfers.length; j++) {
        //                 visitTransferQueue.push(transfers[j]);
        //             }
                    
        //         } else {
        //             tempTransferCount = 0;
        //         }
        //     }
        // }
        // for (let i = 0; i < transfers.length; i++) {
        //     let nextTransfer = transfers[i];
        //     let tempTransferCount = 0;
        //     while (nextTransfer != 'SAN' && this.topDownItems[nextTransfer].length == 1) {
                
        //         tempTransferCount++;
        //         nextTransfer = this.topDownItems[nextTransfer];
                
        //     }
        //     if (nextTransfer == 'SAN') {
        //         return transferCount + tempTransferCount;
        //     } else {
        //         return 'failed';
        //     }
        // }
        
        return transferCount;
    }
}
function main(array) {
    let orbitGraph = new Graph();

    for (let i = 0; i < array.length; i++) {
        let orbit = array[i].split(')');
        orbitGraph.insert(orbit);
    }
    // return orbitGraph.countOrbits();
    return orbitGraph.orbitalTransfers();
}

console.log(main(array));