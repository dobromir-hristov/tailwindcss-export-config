import { resolveConfig } from '../../../src/converters/utils'

import SassConverter from '../../../src/converters/Sass'
import testConfig from '../../tailwind.config'

describe('Sass converter', () => {
  it('Converts to nested map', () => {
    const converter = new SassConverter({
      config: resolveConfig(testConfig)
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to flat variables', () => {
    const converter = new SassConverter({
      config: resolveConfig(testConfig),
      flat: true
    })
    expect(converter.convert()).toMatchSnapshot()
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
