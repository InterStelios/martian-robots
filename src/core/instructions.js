const { add, radians } = require('../utils/math')
const { round, sin, cos, PI, abs } = Math

/**
 * A proxy object where the 'keys' are the names of the 'instructions' and the 'value' is the action itself.
 * When an instruction (key) does not map to an action, the original parameters of the action are simply returned.
 */
module.exports = new Proxy({

  // Takes an orientation value (in degrees) and traslates it to the right by substracting 90 degrees but resetting
  // to 0 when the value exceeds 360 (full circle rotation). Note, if the initial orientation is 0, shifting to
  // the right means setting the angle to 270 degrees.
  R: ({ orientation }) => ({ orientation: (orientation === 0 ? 270 : orientation - 90) % 360 }),

  // Takes an orientation value (in degrees) and traslates it to the left by adding 90 degrees but resetting
  // to 0 when the value exceeds 360 (full circle rotation).
  L: ({ orientation }) => ({ orientation: (orientation + 90) % 360 }),

  // Computes the next position of a vector based on the current orientation and the speed.
  // Reference: https://en.wikipedia.org/wiki/Rotation_of_axes | x = r cos(a) and y = r sin(a)
  F: ({ orientation, position, speed }) => {
    // we need to round() the result of cos() and sin() because JavaScript in certain cases returns
    // an approximation of a very small number (i.e. 6.123233995736766e-17) instead of simply 0.
    const nextMove = {
      x: speed * round(cos(radians(orientation))),
      y: speed * round(sin(radians(orientation)))
    }

    return { position: add(position, nextMove) }
  }
}, {
  /**
   * Return default results for unknown instructions.
   * @param {Object} instructions - This object's properties.
   * @param {String} action  - The key to be map to a property.
   */
  get(instructions, action) {
    return instructions.hasOwnProperty(action) ? instructions[action] : args => args
  }
})
