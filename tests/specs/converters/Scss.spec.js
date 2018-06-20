const ScssConverter = require('../../../src/converters/Scss')
const testConfig = require('../../tailwind.config')

describe('Scss converter', () => {
  it('Converts to nested map', () => {
    const converter = new ScssConverter({
      config: testConfig
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to flat variables', () => {
    const converter = new ScssConverter({
      config: testConfig,
      flat: true
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to flat variables with prefix', () => {
    const converter = new ScssConverter({
      config: testConfig,
      flat: true,
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to nested map with prefix', () => {
    const converter = new ScssConverter({
      config: testConfig,
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })
})
