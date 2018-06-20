const SassConverter = require('../../../src/converters/Sass')
const testConfig = require('../../tailwind.config')

describe('Sass converter', () => {
  it('Converts to nested map', () => {
    const converter = new SassConverter({
      config: testConfig
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to flat variables', () => {
    const converter = new SassConverter({
      config: testConfig,
      flat: true
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to flat variables with prefix', () => {
    const converter = new SassConverter({
      config: testConfig,
      flat: true,
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to nested map with prefix', () => {
    const converter = new SassConverter({
      config: testConfig,
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })
})
