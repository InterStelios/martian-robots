const assert = require('assert');

const {
  prune,
  extractProperties,
  extractSurfaceSize,
} = require('../src/utils/parse');

describe('parse utils', () => {
  describe('#prune()', () => {
    it('should parse the input to arrays', () => {
      const input = '5 3\n1 1 E\nrfr';
      const parsedInput = prune(input);
      const expectedParsedInput = [
        ['5', '3'],
        ['1', '1', 'E'],
        ['R', 'F', 'R'],
      ];
      assert.deepEqual(expectedParsedInput, parsedInput);
    });

    it('should throw an error if instruction string is greater than 100', () => {
      const instructions = Array(101).fill('A').join('');
      const input = `5 3\n1 1 E\n${instructions}`;
      assert.throws(
        prune.bind(null, input),
        Error,
        'Instruction strings should be less than 100 characters in length'
      );
    });
  });

  describe('#extractProperties()', () => {
    it('should extract the properties from the input', () => {
      const input = ['1', '1', 'N'];
      const properties = extractProperties(input);
      const expectedProperties = {
        position: { x: 1, y: 1 },
        orientation: 90,
      };

      assert.deepEqual(expectedProperties, properties);
    });

    it('should throw an error if coordinates are not numbers', () => {
      const input = ['F', '1', 'N'];

      assert.throws(
        extractProperties.bind(null, input),
        Error,
        'Robot position should be numbers: ${x}, ${y}'
      );
    });
  });

  describe('#extractSurfaceSize()', () => {
    it('should extract the surface size vector from the input', () => {
      const input = ['1', '1'];
      const surfaceSize = extractSurfaceSize(input);
      const expectedSurfaceSize = { x: 1, y: 1 };

      assert.deepEqual(surfaceSize, expectedSurfaceSize);
    });

    it('should throw an error if coordinates are not numbers', () => {
      const input = ['F', '1'];

      assert.throws(
        extractSurfaceSize.bind(null, input),
        Error,
        'Surface size should be numbers: ${x}, ${y}'
      );
    });

    it('should throw an error if coordinates are greater than 50', () => {
      const input = ['51', '1'];

      assert.throws(
        extractSurfaceSize.bind(null, input),
        Error,
        'Maximum value for any coordinate for Surface should not exceed 50.'
      );
    });
  });
});
