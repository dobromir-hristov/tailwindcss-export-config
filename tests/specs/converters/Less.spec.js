import LessConverter from '../../../src/converters/Less'
import testConfig from '../../tailwind.config'
import testConfigDefault from '../../tailwind-default.config'
import { resolveConfig } from '../../../src/converters/utils'

describe('Less converter', () => {
  describe('full config', () => {
    it('Converts to flat variables', () => {
      const converter = new LessConverter({
        config: resolveConfig(testConfigDefault)
      })
      expect(converter.convert()).toMatchSnapshot()
    })
  })

  it('converts flat and nested, with the same result', () => {
    let converter = new LessConverter({
      config: resolveConfig(testConfig),
      flat: true
    })
    const flatResult = converter.convert()

    converter = new LessConverter({
      config: resolveConfig(testConfig),
      flat: false
    })

    const nestedResult = converter.convert()

    expect(flatResult).toBe(nestedResult)
  })

  it('Converts to flat variables with prefix', () => {
    const converter = new LessConverter({
      config: resolveConfig(testConfig),
      flat: true,
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to nested map with prefix', () => {
    const converter = new LessConverter({
      config: resolveConfig(testConfig),
      prefix: 'tw'
    })
    expect(converter.convert()).toMatchSnapshot()
  })
})
