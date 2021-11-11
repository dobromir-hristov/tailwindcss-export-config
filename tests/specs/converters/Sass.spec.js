import { resolveConfig } from '../../../src/converters/utils'

import SassConverter from '../../../src/converters/Sass'
import testConfig from '../../tailwind.config'
import testConfigDefault from '../../tailwind-default.config'

describe('Sass converter', () => {
  describe('full config', () => {
    it('converts all props, to a nested map', () => {
      const converter = new SassConverter({
        config: resolveConfig(testConfigDefault)
      })
      expect(converter.convert()).toMatchSnapshot()
    })

    it('converts all props, to flat variables', () => {
      const converter = new SassConverter({
        config: resolveConfig(testConfigDefault),
        flat: true
      })
      expect(converter.convert()).toMatchSnapshot()
    })
  })

  it('wraps keys in quotes', () => {
    const converter = new SassConverter({
      config: resolveConfig(testConfig),
      quotedKeys: true
    })
    const result = converter.convert()
    expect(result).toContain('$screens: ("sm":')
    expect(result).toMatchSnapshot()
  })

  it('Converts to flat variables with prefix', () => {
    const converter = new SassConverter({
      config: resolveConfig(testConfig),
      flat: true,
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to nested map with prefix', () => {
    const converter = new SassConverter({
      config: resolveConfig(testConfig),
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })

})
