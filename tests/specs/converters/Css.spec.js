import CssConverter from '../../../src/converters/Css'
import testConfig from '../../tailwind.config'
import testConfigDefault from '../../tailwind-default.config'
import { resolveConfig } from '../../../src/converters/utils'

describe('Css converter', () => {
  describe('full config', () => {
    it('Converts to flat variables', () => {
      const converter = new CssConverter({
        config: resolveConfig(testConfigDefault)
      })
      expect(converter.convert()).toMatchSnapshot()
    })
  })

  it('converts flat and nested, with the same result', () => {
    let converter = new CssConverter({
      config: resolveConfig(testConfig),
      flat: true
    })
    const flatResult = converter.convert()

    converter = new CssConverter({
      config: resolveConfig(testConfig),
      flat: false
    })

    const nestedResult = converter.convert()

    expect(flatResult).toBe(nestedResult)
  })

  it('Converts to flat variables with prefix', () => {
    const converter = new CssConverter({
      config: resolveConfig(testConfig),
      flat: true,
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to nested map with prefix', () => {
    const converter = new CssConverter({
      config: resolveConfig(testConfig),
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })
})
