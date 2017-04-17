const Orientation = require('../constants/Orientation')

/**
 * Checks whether the given value is empty.
 * @param {String} val - The value to check.
 * @return {boolean}
 */
const isNotEmpty = val => val.trim().length

/**
 * Creates a 2D vector object.
 * @param {int} x - The x value.
 * @param {int} y - The y value.
 * @return {Object} The vector.
 */
const createVector = (x = 0, y = 0) => ({
  x: Number(x),
  y: Number(y)
})

/**
 * Checks wether the given vector object exceeds the maximum coordinate value.
 * @param {Object} vector - The vector to check.
 * @return {boolean}
 */
const exceedsMaximum = ({ x, y }) => x >= 50 || y >= 50

/**
 * Prunes the input by applying the following.
 *  1. Converts to uppercase.
 *  2. Splits the input by line.
 *  3. Removes any empty strings as a result of splitting to new lines.
 *  4. Splits every line on space and removes empty strings as part of the result.
 *  5. Splits the sequence of instructions to individual characters.
 * @param {String} input - The input to be pruned.
 * @return {Array} The pruned input.
 */
module.exports.prune = input =>
  input
  .toUpperCase()
  .split('\n')
  .filter(isNotEmpty)
  .map(line =>
    line.split(' ').filter(isNotEmpty)
  )
  .map(command => {
    if (command.length === 1) {
      const instruction = command[0]
      if (instruction.length > 100) {
        throw new Error('Instruction strings should be less than 100 characters in length')
      }
      return instruction.split('')
    }
    return command
  })

/**
 * Extracts surface size from the given array of coordinates. Throws the appropriate Error if
 * the coordinate values are not valid.
 * @param {Array} options - The the array of options.
 * @return {Object} The extracted properties.
 */
module.exports.extractSurfaceSize = ([x, y]) => {
  if (isNaN(x) || isNaN(y)) {
    throw new Error(`Surface maximum values should be numbers: ${x}, ${y}`)
  }

  const size = createVector(x, y)

  if (exceedsMaximum(size)) {
    throw new Error('Maximum value for any coordinate for Surface should not exceed 50.')
  }

  return size
}

/**
 * Extracts properties from the given array of options. Throws the appropriate Error if
 * the coordinate values are not valid.
 * @param {Array} options - The the array of options.
 * @return {Object} The extracted properties.
 */
module.exports.extractProperties = ([x, y, direction]) => {
  if (isNaN(x) || isNaN(y)) {
    throw new Error(`Robot position should be numbers: ${x}, ${y}`)
  }

  const position = createVector(x, y)

  if (exceedsMaximum(position)) {
    throw new Error('Maximum value for any coordinate for Robot position should not exceed 50.')
  }

  return {
    position,
    orientation: Orientation[direction]
  }
}
