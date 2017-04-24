const assert = require('assert');

const instructions = require('../src/core/instructions');
const { R, L, F } = instructions;

describe('instructions', () => {
  describe('#R()', () => {
    it('should shift the orientation to the right by substructing 90 degrees', () => {
      const orientation = 180;
      const expectedOrientation = 90;
      assert.equal(expectedOrientation, R({ orientation }).orientation);
    });

    it('should shift the orientation to 270 if the initial orientation is 0', () => {
      const orientation = 0;
      const expectedOrientation = 270;
      assert.equal(expectedOrientation, R({ orientation }).orientation);
    });
  });

  describe('#L()', () => {
    it('should shift the orientation to the left by adding 90 degrees', () => {
      const orientation = 180;
      const expectedOrientation = 270;
      assert.equal(expectedOrientation, L({ orientation }).orientation);
    });

    it('should shift the orientation to 0 if the initial orientation is 270', () => {
      const orientation = 270;
      const expectedOrientation = 0;
      assert.equal(expectedOrientation, L({ orientation }).orientation);
    });
  });

  describe('#F()', () => {
    it('should adjust the position vector by moving 1 on the Y Axis', () => {
      const properties = {
        orientation: 90,
        position: {
          x: 0,
          y: 0,
        },
        speed: 1,
      };
      const expectedPosition = {
        x: 0,
        y: 1,
      };

      assert.deepEqual(expectedPosition, F(properties).position);
    });

    it('should adjust the position vector by moving 1 on the X Axis', () => {
      const properties = {
        orientation: 0,
        position: {
          x: 0,
          y: 1,
        },
        speed: 1,
      };
      const expectedPosition = {
        x: 1,
        y: 1,
      };

      assert.deepEqual(expectedPosition, F(properties).position);
    });
  });

  describe('*()', () => {
    it('should return the original properties if no action is matched', () => {
      const actionName = 'N/A';
      const properties = {
        orientation: 90,
        position: {
          x: 0,
          y: 0,
        },
        speed: 1,
      };

      assert.equal(properties, instructions[actionName](properties));
    });
  });
});
