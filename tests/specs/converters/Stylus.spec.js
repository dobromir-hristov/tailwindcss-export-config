const StylusConverter = require('../../../src/converters/Stylus')
const testConfig = require('../../tailwind.config')

describe('Stylus converter', () => {
  it('Converts to nested map', () => {
    const converter = new StylusConverter({
      config: testConfig,
      flat: true
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to flat variables', () => {
    const converter = new StylusConverter({
      config: testConfig
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to flat variables with prefix', () => {
    const converter = new StylusConverter({
      config: testConfig,
      flat: true,
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to nested map with prefix', () => {
    const converter = new StylusConverter({
      config: testConfig,
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })
})
