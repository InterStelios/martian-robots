const assert = require('assert');

const Surface = require('../src/core/Surface');

describe('Surface', () => {
  describe('#constructor()', () => {
    it('should set the class properties', () => {
      const surface = new Surface(5, 5);
      const expectedX = 5;
      const expectedY = 5;
      const expectedMarked = {};

      assert.equal(expectedX, surface.x);
      assert.equal(expectedY, surface.y);
      assert.deepEqual(expectedMarked, surface.marked);
    });
  });

  describe('#isWithinBounds()', () => {
    const surface = new Surface(5, 5);

    it('should evaluate the given vector and return true', () => {
      const position = { x: 1, y: 2 };
      const isWithinBounds = surface.isWithinBounds(position);
      const expected = true;

      assert.equal(expected, isWithinBounds);
    });

    it('should evaluate the given vector and return false', () => {
      const position = { x: 1, y: 16 };
      const isNotWithinBounds = surface.isWithinBounds(position);
      const expected = false;

      assert.equal(expected, isNotWithinBounds);
    });
  });

  describe('#mark()', () => {
    it('should mark the given postion on the Surface', () => {
      const surface = new Surface(5, 5);
      const position = { x: 1, y: 2 };
      const marked = surface.mark(position).marked;
      const expectedMarked = {
        '1.2': true,
      };

      assert.deepEqual(expectedMarked, marked);
    });
  });

  describe('#isMarked()', () => {
    const surface = new Surface(5, 5);
    const position = { x: 1, y: 2 };
    surface.mark(position);

    it('should check if the given position is marked and return true', () => {
      const isMarked = surface.isMarked(position);
      const expectedMarked = true;

      assert.equal(expectedMarked, isMarked);
    });

    it('should check if the given position is marked and return false', () => {
      const position = { x: 1, y: 1 };
      const isMarked = surface.isMarked(position);
      const expectedMarked = false;

      assert.equal(expectedMarked, isMarked);
    });
  });
});
