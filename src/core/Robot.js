const Surface = require('./Surface');
const Orientation = require('../constants/Orientation');

const defaults = {
  position: { x: 0, y: 0 },
  orientation: Orientation.N,

  // Let's hardcode the speed for now. We can extend it in the future if needed.
  speed: 1,
};

const isKnownInstruction = (action, instructions) =>
  action != null && instructions[action];

class Robot {
  /**
   * Constructor for a Robot object.
   * @param {Object} properties - The robot properties.
   * @param {Object} instructions - The robot instructions.
   * @param {Surface} surface - The surface of Mars.
   */
  constructor(
    properties = defaults,
    instructions = {},
    surface = new Surface()
  ) {
    // initialise defaults within the properties
    this.properties = Object.assign({}, defaults, properties);

    this.instructions = instructions;
    this.surface = surface;
    this.history = [];
    this.lost = false;

    this.record(); // Record the initial robot status.
  }

  /**
   * Instructs a robot to perform the given action and records its status. The action is performed if and only
   * if the robot is not already lost, the action belongs to the robot's known instructions and finally, if the
   * action does not result to the robot being lost from an already known position ('scented').
   * @param {String} action - The action for the robot to perform.
   * @return {Robot} The robot instance.
   */
  instruct(action = null) {
    if (!this.lost && isKnownInstruction(action, this.instructions)) {
      const nextMove = this.instructions[action](this.properties);

      if (this.surface.isWithinBounds(nextMove.position)) {
        this.properties = Object.assign({}, this.properties, nextMove);
        this.record();
        return this;
      }

      const { position } = this.properties;
      if (!this.surface.isMarked(position)) {
        this.lost = true;
        this.surface.mark(position);
        this.record();
        return this;
      }
    }

    return this;
  }

  /**
   * Records the current status of the robot; position, orientation and status (lost) are recorded.
   */
  record() {
    const { x, y } = this.properties.position;
    const orientation = Orientation[this.properties.orientation];
    this.history.push(`${x} ${y} ${orientation}${this.lost ? ' LOST' : ''}`);
  }

  status() {
    return this.history[this.history.length - 1];
  }
}

module.exports = Robot;
