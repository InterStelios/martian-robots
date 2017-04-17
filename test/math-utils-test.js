const assert = require('assert')

const { add, radians } = require('../src/utils/math')

describe('math utils', () => {
  describe('#add()', () => {
    it('should add the x and y for the two vectors', () => {
      const v1 = { x: 0, y: 0 }
      const v2 = { x: 2, y: 1 }
      const expectedVector = { x: 2, y: 1 }

      assert.deepEqual(expectedVector, add(v1, v2))
    })
  })

  describe('#theta()', () => {
    it('should convert the degrees to radians', () => {
      const degrees = 90
      const expectedRadians = 1.5708

      assert.equal(expectedRadians, radians(degrees).toFixed(4))
    })
  })
})
