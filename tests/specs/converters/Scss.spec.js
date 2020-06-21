import ScssConverter from '../../../src/converters/Scss'
import testConfig from '../../tailwind.config'
import { resolveConfig } from '../../../src/converters/utils'

describe('Scss converter', () => {
  it('Converts to nested map', () => {
    const converter = new ScssConverter({
      config: resolveConfig(testConfig)
    })
    expect(converter.convert()).toMatchSnapshot()
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

  it('Converts to flat variables', () => {
    const converter = new ScssConverter({
      config: resolveConfig(testConfig),
      flat: true
    })
    expect(converter.convert()).toMatchSnapshot()
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
