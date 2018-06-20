const ScssConverter = require('../../src/converters/Scss')
const ConvertTo = require('../../src/index')
const path = require('path')

let scsscConverterSpy = jest.spyOn(ScssConverter.prototype, '_convertObjectToMap')
const testConfig = require('../tailwind.config')
const fse = require('fs-extra')

jest.mock('fs-extra')

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

  it('converts the config by using the proper converter', () => {
    let converterInstance = new ConvertTo({
      config: testConfig,
      format: 'styl',
      destination: 'doesnt_matter'
    })

    converterInstance.convert()
    expect(scsscConverterSpy).not.toHaveBeenCalled()

    converterInstance = new ConvertTo({
      config: testConfig,
      format: 'scss',
      destination: 'doesnt_matter'
    })

    converterInstance.convert()
    expect(scsscConverterSpy).toHaveBeenCalled()
  })

  it('allows using an object or a path as a config', () => {
    let converterInstance = new ConvertTo({
      config: testConfig,
      format: 'scss',
      destination: 'doesnt_matter'
    })

    expect(converterInstance.convert()).toMatchSnapshot('scss format')
    converterInstance = new ConvertTo({
      config: path.join(__dirname, '..', 'tailwind.config.js'),
      format: 'scss',
      destination: 'doesnt_matter'
    })
    expect(converterInstance.convert()).toMatchSnapshot('scss format')
  })

  it('writes the new config to a file', (done) => {
    fse.outputFile.mockImplementation(() => Promise.resolve())
    let converterInstance = new ConvertTo({
      config: path.join(__dirname, '../tailwind.config'),
      format: 'scss',
      destination: 'doesnt_matter'
    })
    converterInstance.writeToFile().then(() => {
      expect(fse.outputFile).toHaveBeenCalled()
      done()
    })
  })
})
