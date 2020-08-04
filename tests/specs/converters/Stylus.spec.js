import StylusConverter from '../../../src/converters/Stylus'
import testConfig from '../../tailwind.config'
import { resolveConfig } from '../../../src/converters/utils'
import testConfigDefault from '../../tailwind-default.config'

describe('Stylus converter', () => {
  describe('full config', () => {
    it('Converts to nested map', () => {
      const converter = new StylusConverter({
        config: resolveConfig(testConfigDefault),
        flat: true
      })
      expect(converter.convert()).toMatchSnapshot()
    })

    it('Converts to flat variables', () => {
      const converter = new StylusConverter({
        config: resolveConfig(testConfigDefault)
      })
      expect(converter.convert()).toMatchSnapshot()
    })
  })

  it('Converts to nested map and wraps keys in quotes', () => {
    const converter = new StylusConverter({
      config: resolveConfig(testConfig),
      quotedKeys: true
    })
    const result = converter.convert()
    expect(result).toContain('"sm": 640px')
    expect(result).toMatchSnapshot()
  })

  it('Converts to flat variables with prefix', () => {
    const converter = new StylusConverter({
      config: resolveConfig(testConfig),
      flat: true,
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to nested map with prefix', () => {
    const converter = new StylusConverter({
      config: resolveConfig(testConfig),
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })
})
