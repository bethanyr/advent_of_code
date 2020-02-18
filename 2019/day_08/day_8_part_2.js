let fs = require('fs');

let array = fs.readFileSync('/Users/bethanyr/advent_of_code/2019/day_8_input.txt').toString().split("\n")[0];

// let array = '123456789012'

function main(array) {
    let layers = new Array();
    let minDigits = Number.MAX_SAFE_INTEGER;
    let minDigitLayer;
    let result = [];
    let i = 0;
    while(i < array.length) {
        // let layer = new Array(10).fill(0);
        // parse layers:
        let dig = '';
        for (let l = 0; l < 6 * 25; l++) {
            dig = dig + array[i];       
            i++;

        } 
        layers.push(dig);
    }
    // console.log(layers);

    for (let col = 0; col < layers[0].length; col++) {
        for (let layer = 0; layer < layers.length; layer++) {
            let pixel = layers[layer][col];
            if (pixel == '1' || pixel == '0') {
                result.push(pixel);
                break;
            }
        }
    }
    // console.log('result', result.join(''));
    let picture = new Array(6);
    let d = 0;
    for (let row = 0; row < 6; row++) {
        let pic = '';
        for (let column = 0; column < 25; column++) {
            pic = pic + (result[d] == '1' ? '*' : ' ');
            
            d++;
        }
        picture[row] = pic;
    } 
    console.log(picture);
}
console.log(main(array));