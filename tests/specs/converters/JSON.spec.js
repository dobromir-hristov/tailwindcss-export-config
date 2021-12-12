import JSONConverter from '../../../src/converters/JSON'
import { resolveConfig } from '../../../src/converters/utils'
import testConfigDefault from '../../tailwind-default.config'

describe('JSON converter', () => {
  describe('full config', () => {
    it('converts all props, to a JSON', () => {
      const converter = new JSONConverter({
        config: resolveConfig(testConfigDefault)
      })
      expect(converter.convert()).toMatchSnapshot()
    })
  })
})
