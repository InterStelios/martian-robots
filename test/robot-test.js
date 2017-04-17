const assert = require('assert')

const Robot = require('../src/core/Robot')
const Surface = require('../src/core/Surface')
const { add } = require('../src/utils/math')

describe('Robot', () => {
  const properties = {
    position: { x: 1, y: 1 },
    orientation: 0
  }

  // mock instructions for testing
  const instructions = {
    F: ({ position }) => ({
      position: add(position, position)
    })
  }

  describe('#constructor()', () => {
    it('should set the class properties', () => {
      const robot = new Robot(properties, instructions, new Surface(5, 5))
      const expectedProperties = {
        position: { x: 1, y: 1 },
        orientation: 0,
        speed: 1
      }
      const expectedInstructions = instructions
      const expectedLost = false

      // position and orientation
      const expectedHistory = ['1 1 E']

      assert.deepEqual(expectedProperties, robot.properties)
      assert.deepEqual(expectedInstructions, robot.instructions)
      assert.equal(expectedLost, robot.lost)
      assert.deepEqual(expectedHistory, robot.history)
    })
  })

  describe('#instruct()', () => {
    it('should execute the F() action', () => {
      const robot = new Robot(properties, instructions, new Surface(5, 5))
      const expectedProperties = {
        position: { x: 2, y: 2 },
        orientation: 0,
        speed: 1
      }
      const expectedLost = false
      const expectedHistory = ['1 1 E', '2 2 E']

      robot.instruct('F')

      assert.deepEqual(expectedProperties, robot.properties)
      assert.equal(expectedLost, robot.lost)
      assert.deepEqual(expectedHistory, robot.history)
    })

    it('should ignore the unknown action', () => {
      const robot = new Robot(properties, instructions, new Surface(5, 5))
      const expectedProperties = robot.properties
      const expectedLost = robot.lost
      const expectedHistory = robot.history

      robot.instruct('N/A')

      assert.deepEqual(expectedProperties, robot.properties)
      assert.equal(expectedLost, robot.lost)
      assert.deepEqual(expectedHistory, robot.history)
    })

    it('should mark the surface with a robot scent and the robot should be lost', () => {
      const robot = new Robot(properties, instructions, new Surface(1, 1))
      const expectedProperties = robot.properties
      const expectedLost = true
      const expectedHistory = ['1 1 E', '1 1 E LOST']
      const robotLastPositionBeforeLost = robot.properties.position
      const expectedIsMarked = true

      robot.instruct('F')

      assert.deepEqual(expectedProperties, robot.properties)
      assert.equal(expectedLost, robot.lost)
      assert.deepEqual(expectedHistory, robot.history)
      assert.deepEqual(expectedIsMarked, robot.surface.isMarked(robotLastPositionBeforeLost))
    })
  })

  describe('#record()', () => {
    it('should record the history of the robot for each action', () => {
      const robot = new Robot(properties, instructions, new Surface(3, 3))
      const markedPosition = { x: 2, y: 2 }
      const expectedMarked = true
      let expectedHistory = ['1 1 E']

      assert.deepEqual(expectedHistory, robot.history)

      robot.instruct('F')
      expectedHistory = expectedHistory.concat('2 2 E')
      assert.deepEqual(expectedHistory, robot.history)

      robot.instruct('F')
      expectedHistory = expectedHistory.concat('2 2 E LOST')
      assert.deepEqual(expectedHistory, robot.history)
      assert.deepEqual(expectedMarked, robot.surface.isMarked(markedPosition))
    })
  })
})
