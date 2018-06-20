const ScssConverter = require('../../src/converters/Scss')
const ConvertTo = require('../../src/index')

const scsscConverterSpy = jest.spyOn(ScssConverter.prototype, '_convertObjectToMap')
const testConfig = require('../tailwind.config')

describe('Tailwind Options Exporter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('does not allow supplying unsupported formats', () => {
    expect(() => {
      new ConvertTo({
        config: testConfig,
        format: 'some_random',
        destination: 'doesnt_matter'
      })
    }).toThrowError(/not supported/)
    expect(scsscConverterSpy).not.toHaveBeenCalled()
  })
  it('allows using an object as a config', () => {
    let converterInstance = new ConvertTo({
      config: testConfig,
      format: 'scss',
      destination: 'doesnt_matter'
    })

    expect(converterInstance.convert()).toMatchSnapshot('scss format')
    converterInstance = new ConvertTo({
      config: 'tests/tailwind.config',
      format: 'scss',
      destination: 'doesnt_matter'
    })
    expect(converterInstance.convert()).toMatchSnapshot('scss format')
  })
  it('allows using a string path as a config', () => {

  })
  it('converts the config by using the proper converter', () => {

  })
  it('writes the new config to a file', () => {

  })
})
