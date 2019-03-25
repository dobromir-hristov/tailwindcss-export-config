const LessConverter = require('../../../src/converters/Less')
const testConfig = require('../../tailwind.config')

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

  it('Converts fonts sans array to a comma separated string', () => {
    const values = testConfig.fonts.sans.join(', ')
    const expectedResult = `@fonts-sans: ${values};`

    const converter = new LessConverter({
      config: testConfig,
    })
    expect(converter.convert()).toContain(expectedResult)
  })
})
