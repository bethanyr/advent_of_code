// input: <x=-1, y=0, z=2>
//<x=2, y=-10, z=-7>
//<x=4, y=-8, z=8>
//<x=3, y=5, z=-1>

// After 0 steps:
// pos=<x=-1, y=  0, z= 2>, vel=<x= 0, y= 0, z= 0>
// pos=<x= 2, y=-10, z=-7>, vel=<x= 0, y= 0, z= 0>
// pos=<x= 4, y= -8, z= 8>, vel=<x= 0, y= 0, z= 0>
// pos=<x= 3, y=  5, z=-1>, vel=<x= 0, y= 0, z= 0>
const { main, Moon, Space } = require('./day_12');

let testArray = [{x: -1, y: 0, z: 2}, {x: 2, y: -10, z: -7},
    { x: 4, y: -8, z: 8}, {x: 3, y: 5, z: -1}]


test('after 0 steps initial setup should match', () => {
    const MOON_NAMES = ['Io', 'Europa', 'Ganymede', 'Callisto']
    let moons = [];
    for (let i = 0; i < array.length; i++) {
        let moon = new Moon(MOON_NAMES[i], array[i]);
        moons.push(moon);
    }

    let space = new Space(moons);
    
    expect(space.moons).toEqual([]);
})