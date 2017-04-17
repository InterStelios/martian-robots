/**
 * Adds two vectors together.
 * @param {Object} v1 - The first vector to add.
 * @param {Object} v2 - The second vector to add.
 * @return {Object} A new vector as a result of the addition.
 */
exports.add = (v1, v2) => ({
  x: v1.x + v2.x,
  y: v1.y + v2.y
})

/**
 * Converts the given angle in degrees to radians.
 * @param {int} theta - The angle in degrees to convert.
 * @return {int} The converted angle in radians.
 */
exports.radians = theta => theta * Math.PI / 180
