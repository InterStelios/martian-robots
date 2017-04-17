const assert = require('assert')

const fileInputService = require('../src/services/FileInputService')
const Surface = require('../src/core/Surface')

describe('FileInputService', () => {
  it('should call the callback function with a Surface and parsed instructions', () => {
    const inputPath = `${process.cwd()}/test/mocks/mock-input.txt`
    const expectedSurface = new Surface(5, 3)
    const expectedPropertiesForFirstSet = {
      position: { x: 1, y: 1 },
      orientation: 0
    }
    const expectedSequenceForFirstSet = ['R', 'F', 'R']

    const expectedPropertiesForSecondSet = {
      position: { x: 2, y: 2 },
      orientation: 90
    }
    const expectedSequenceForSecondSet = ['L', 'L']

    fileInputService(inputPath, (surface, parsedInput) => {
      let { properties, sequence } = parsedInput[0]
      const expectedInstructionSets = 2

      assert.deepEqual(expectedSurface, surface)
      assert.deepEqual(expectedPropertiesForFirstSet, parsedInput[0].properties)
      assert.deepEqual(expectedSequenceForFirstSet, parsedInput[0].sequence)

      assert.deepEqual(expectedPropertiesForSecondSet, parsedInput[1].properties)
      assert.deepEqual(expectedSequenceForSecondSet, parsedInput[1].sequence)

      assert.deepEqual(expectedInstructionSets, parsedInput.length)
    })
  })
})
