const Surface = require('../core/Surface')
const Orientation = require('../constants/Orientation')
const { prune, extractSurfaceSize, extractProperties } = require('../utils/parse')
const { readFileSync } = require('fs')

/**
 * Reads the input from the given path and passes the clean input to the callback function.
 * @param {int} x - The maximum x axis value.
 * @param {int} y - The maximum y axis value.
 */
module.exports = (path = '', next = () => {}) => {

  // Note, this is a blocking operation but it should be fine for our simple example.
  const input = prune(readFileSync(path, 'utf8'))

  const [surfaceSize, ...options] = input

  let instructions = []

  // Constructs the list of instructions. Each instruction has the robot properties
  // and a sequence (actions).
  for (let i = 0, l = options.length; i < l; i += 2) {
    instructions.push({
      properties: extractProperties(options[i]),
      sequence: options[i + 1]
    })
  }

  const { x, y } = extractSurfaceSize(surfaceSize)
  return next(new Surface(x, y), instructions)
}
