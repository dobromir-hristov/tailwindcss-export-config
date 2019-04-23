import LessConverter from '../../../src/converters/Less'
import testConfig from '../../tailwind.config'
import { resolveConfig } from '../../../src/converters/utils'

describe('Less converter', () => {
  it('Converts to nested map', () => {
    const converter = new LessConverter({
      config: resolveConfig(testConfig),
      flat: true
    })
    expect(converter.convert()).toMatchSnapshot()
  })

  it('Converts to flat variables', () => {
    const converter = new LessConverter({
      config: resolveConfig(testConfig)
    })
    expect(converter.convert()). toMatchSnapshot()
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
