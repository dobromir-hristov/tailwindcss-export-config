import ScssConverter from '../../../src/converters/Scss'
import { resolveConfig } from '../../../src/converters/utils'
import testConfig from '../../tailwind.config'
import testConfigDefault from '../../tailwind-default.config'

describe('Scss converter', () => {
  describe('full config', () => {
    it('Converts to nested map', () => {
      const converter = new ScssConverter({
        config: resolveConfig(testConfigDefault)
      })
      expect(converter.convert()).toMatchSnapshot()
    })

    it('Converts to flat variables', () => {
      const converter = new ScssConverter({
        config: resolveConfig(testConfigDefault),
        flat: true
      })
      expect(converter.convert()).toMatchSnapshot()
    })
  })

  it('converts a nested map with quoted keys', () => {
    const converter = new ScssConverter({
      config: resolveConfig(testConfig),
      quotedKeys: true
    })
    const result = converter.convert()
    expect(result).toContain('"sm": 640px')
    expect(result).toMatchSnapshot()
  })

  it('Converts to flat variables with prefix', () => {
    const converter = new ScssConverter({
      config: resolveConfig(testConfig),
      flat: true,
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to nested map with prefix', () => {
    const converter = new ScssConverter({
      config: resolveConfig(testConfig),
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })
})
