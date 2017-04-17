const Orientation = { N: 90, S: 270, E: 0, W: 180 }
const DirectionToOrientation = { 90: 'N', 270: 'S', 0: 'E', 180: 'W' }

module.exports = Object.assign({}, Orientation, DirectionToOrientation)
