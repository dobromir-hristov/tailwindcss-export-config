const ConvertTo = require('../../src/index')
const path = require('path')

const testConfig = require('../tailwind.config')
const testConfigDisabledPlugins = require('../tailwind-disabled-plugins.config')
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

  it('skips options that are disabled in `corePlugins` using the object pattern', () => {
    let converterInstance = new ConvertTo({
      config: testConfigDisabledPlugins,
      format: 'scss'
    })

    const scssConfig = converterInstance.convert()
    // assert it does not contain a few properties
    expect(scssConfig).not.toContain('borderRadius')
    expect(scssConfig).not.toContain('backgroundSize')
  })

  it('skips options that are disabled in `corePlugins` using the array pattern', () => {
    let converterInstance = new ConvertTo({
      config: {
        ...testConfig,
        corePlugins: ['cursor']
      },
      format: 'scss'
    })

    const scssConfig = converterInstance.convert()
    // assert it does not contain a few properties
    expect(scssConfig).toContain('cursor')
    expect(scssConfig).not.toContain('backgroundSize')
    // assert the whole snapshot
    expect(scssConfig).toMatchSnapshot()
  })

  it('preserve keys that are set', () => {
    let converterInstance = new ConvertTo({
      config: testConfigDisabledPlugins,
      format: 'scss',
      preserveKeys: ['colors', 'screens']
    })

    const scssConfig = converterInstance.convert()

    // assert it does not contain a few properties
    expect(scssConfig).toContain('screens')
    expect(scssConfig).toContain('colors')
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

    expect(converterInstance.convert()).toEqual(expect.any(String))
  })

  it('allows using a path to an config', () => {
    let converterInstance = new ConvertTo({
      config: path.join(__dirname, '..', 'tailwind.config.js'),
      format: 'scss',
      destination: 'doesnt_matter'
    })
    expect(converterInstance.convert()).toEqual(expect.any(String))
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

  it('converts deeply nested configs, with flat:false', () => {
    const config = require('../tailwind-deeply-nested.config.js')

    let converterInstance = new ConvertTo({
      config: config,
      format: 'scss',
      destination: 'doesnt_matter'
    })
    let result = converterInstance.convert()
    expect(result).toContain(
      '$customForms: (\n' +
      '  colors-blue: blue,'
    )
    expect(result).toMatchSnapshot('level-default')

    converterInstance = new ConvertTo({
      config: config,
      format: 'scss',
      destination: 'doesnt_matter',
      flattenMapsAfter: 0
    })
    let result0 = converterInstance.convert()
    expect(result0).toContain(
      '$customForms: (\n' +
      '  colors: (\n' +
      '    blue: blue,'
    )
    expect(result0).toMatchSnapshot('level0')

    converterInstance = new ConvertTo({
      config: config,
      format: 'scss',
      destination: 'doesnt_matter',
      flattenMapsAfter: 2
    })
    let result2 = converterInstance.convert()
    expect(result2).toContain(
      '  somethingElse: (\n' +
      '    level1: (\n' +
      '      color: pink,\n' +
      '      arrayValue: (a,b,c),\n' +
      '      nestedB: (\n' +
      '        color: nested,'
    )
    expect(result2).toMatchSnapshot('level2')

    converterInstance = new ConvertTo({
      config: config,
      format: 'scss',
      destination: 'doesnt_matter',
      flattenMapsAfter: 3
    })
    expect(converterInstance.convert()).toMatchSnapshot('level3')
  })

  it('converts deeply nested configs, with flat:true', () => {
    const config = require('../tailwind-deeply-nested.config.js')

    let converterInstance = new ConvertTo({
      config: config,
      format: 'scss',
      flat: true
    })
    let result = converterInstance.convert()
    expect(result).toContain(
      '$customForms-somethingElse-level1-nestedB-nestedC-nestedD-color2: color2;\n' +
      '$customForms-somethingElse-level1-nestedB-nestedC-nestedD-nestedE-color: nestedE;'
    )
    expect(result).toMatchSnapshot()
  })

  it('converts arrays of arrays', () => {
    const converterInstance = new ConvertTo({
      config: {
        theme: {},
        corePlugins: ['fontSize'] // fontSize has a [string, {}] format
      },
      format: 'scss'
    })
    let result = converterInstance.convert()
    expect(result).toContain(`xs: 0.75rem`)
    expect(result).toContain(`xs-lineHeight: 1rem`)
    expect(result).toMatchSnapshot()
  })

  it('converts arrays of arrays. flat', () => {
    const converterInstance = new ConvertTo({
      config: {
        theme: {},
        corePlugins: ['fontSize'] // fontSize has a [string, {}] format
      },
      format: 'scss',
      flat: true
    })
    let result = converterInstance.convert()
    expect(result).toContain(`xs: 0.75rem`)
    expect(result).toContain(`xs-lineHeight: 1rem`)
    expect(result).toMatchSnapshot()
  })
})
