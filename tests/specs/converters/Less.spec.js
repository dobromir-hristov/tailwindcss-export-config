const LessConverter = require('../../../src/converters/Less')
const testConfig = require('../../tailwind.config')
const variablePrefix = '@'
const variableSuffix = ';'

describe('Less converter', () => {
  it('Converts to nested map', () => {
    const converter = new LessConverter({
      config: testConfig,
      flat: true
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to flat variables', () => {
    const converter = new LessConverter({
      config: testConfig
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to flat variables with prefix', () => {
    const converter = new LessConverter({
      config: testConfig,
      flat: true,
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to nested map with prefix', () => {
    const converter = new LessConverter({
      config: testConfig,
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts an array to a comma separated string', () => {
    const testObject = 'fonts'
    const keyName = Object.keys(testConfig[testObject])[0];
    const values = testConfig[testObject][keyName].join(', ')
    const expectedResult = `${variablePrefix}${testObject}-${keyName}: ${values}${variableSuffix}`

    const converter = new LessConverter({
      config: testConfig,
    })
    expect(converter.convert()).toContain(expectedResult)
  })
})
