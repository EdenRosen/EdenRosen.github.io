const colors = ['green', 'rgb(137,98,55)', 'gray']
var cubes = []

for (let i = 0; i < 50; i++) {
    for (let d = 0; d < 50; d++) {
        // let y = Math.floor(Math.sin(i/5)*5) + Math.floor(Math.sin(d/5)*5)
        cubes.push({x:i-10,y:0,z:d,c:colors[1]})
    }
}
cubes.push({x:1,y:1,z:3,c:colors[2]})
cubes.push({x:0,y:1,z:3,c:colors[1]})
cubes.push({x:1,y:2,z:3,c:colors[2]})
cubes.push({x:1,y:3,z:3,c:colors[0]})
cubes.push({x:1,y:4,z:2,c:colors[2]})
cubes.push({x:2,y:3,z:3,c:colors[2]})
cubes.push({x:5,y:1,z:5,c:colors[0]})
cubes.push({x:5,y:2,z:5,c:colors[0]})
cubes.push({x:5,y:2,z:4,c:colors[0]})


