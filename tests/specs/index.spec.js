const ConvertTo = require('../../src/index')
const path = require('path')

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
  })

  it('converts the config by using the proper converter', () => {
    let converterInstance = new ConvertTo({
      config: testConfig,
      format: 'styl',
      destination: 'doesnt_matter'
    })

    expect(converterInstance.converterInstance.format).toBe('styl')

    converterInstance = new ConvertTo({
      config: testConfig,
      format: 'scss',
      destination: 'doesnt_matter'
    })

    expect(converterInstance.converterInstance.format).toBe('scss')
  })

  it('it properly includes the provided configuration properties', () => {
    let converterInstance = new ConvertTo({
      config: testConfig,
      format: 'scss',
      destination: 'doesnt_matter',
      flat: true
    })

    const scssConfig = converterInstance.convert()
    expect(scssConfig).toContain('$fontFamily-display: (Gilroy,sans-serif)')
    expect(scssConfig).toContain('$colors-cyan: #9cdbf')
  })

  it('allows using an object as a config', () => {
    let converterInstance = new ConvertTo({
      config: {},
      format: 'scss',
      destination: 'doesnt_matter'
    })

    expect(converterInstance.convert()).toMatchSnapshot('scss format')
  })

  it('allows using a path to an config', () => {
    let converterInstance = new ConvertTo({
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
