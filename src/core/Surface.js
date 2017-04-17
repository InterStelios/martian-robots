class Surface {

  /**
   * Constructor for a Surface object.
   * @param {int} x - The maximum x axis value.
   * @param {int} y - The maximum y axis value.
   */
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y

    // A map to hold marked locations on the surface.
    this.marked = {}
  }

  /**
   * Checks whether the given position is within the surface's bounds.
   * @param {Object} position - The position to be checked.
   * @return {bool}
   */
  isWithinBounds(position = { x: 0, y: 0 }) {
    return (position.x >= 0 && position.x <= this.x) && (position.y >= 0 && position.y <= this.y)
  }

  /**
   * Marks a specific location on surface.
   * @param {Object} position - The position to mark.
   * @return {Surface} The surface instance.
   */
  mark(position = { x: 0, y: 0 }) {
    this.marked = Object.assign(this.marked, {

      // A simple binary value will do for our simple case where we want to mark a 'scent'. In the
      // future we can have a full-fledged // object as the value which will allow us to mark this
      // position on the surface differently. i.e. mark as a mining area for the robots.
      [`${position.x}.${position.y}`]: true
    })
    return this
  }

  /**
   * Checks whether the given position is marked on the surface.
   * @param {bool}
   */
  isMarked(position = { x: 0, y: 0 }) {
    return !!this.marked[`${position.x}.${position.y}`]
  }
}

module.exports = Surface
