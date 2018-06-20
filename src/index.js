const fse = require('fs-extra')
const path = require('path')
const converters = require('./converters/index')

const allowedFormatsMap = {
  stylus: converters.Stylus,
  styl: converters.Stylus,
  sass: converters.Sass,
  scss: converters.Scss,
  less: converters.Less,
  css: 'css'
}
/**
 * Converts tailwind config into desired format
 */
class ConvertTo {
  /**
   * @param options
   * @param {Object | String} options.config - Tailwind config. Could be either the tailwind config object or path to it
   * @param {String} [options.prefix] - Variable prefix
   * @param {String} options.destination - Output destination
   * @param {Boolean} [options.flat] - Whether the variables should be nested maps or flat level variables
   * @param {String} options.format - The desired format
   */
  constructor (options) {
    if (!allowedFormatsMap.hasOwnProperty(options.format)) {
      throw new Error(`${options.format} is not supported. Use ${Object.keys(allowedFormatsMap)}`)
    }
    this.options = options

    const Converter = allowedFormatsMap[options.format]
    const config = typeof options.config === 'object' ? options.config : require(path.join(process.cwd(), options.config))

    this.converterInstance = new Converter({ config, prefix: options.prefix, flat: options.flat })
  }

  /**
   * Converts the config and returns a string with in the new format
   * @returns {string}
   */
  convert () {
    let buffer = `/* Converted Tailwind Config to ${this.options.format} */`
    buffer += this.converterInstance.convert()
    return buffer
  }

  /**
   * Write Tailwindcss config to file
   * @returns {Promise}
   */
  writeToFile () {
    let buffer = this.convert()
    return this._writeFile(buffer, { destination: this.options.destination, format: this.converterInstance.getFormat() })
  }

  /**
   * Internal method to write the supplied data to a tailwind config file with the desired format
   * @param {String} data
   * @param {String} destination
   * @param {String} format
   * @private
   * @return {Promise}
   */
  _writeFile (data, { destination, format }) {
    // If destination ends with a slash, we append a name to the file
    if (destination.endsWith(path.sep)) destination += 'tailwind-config'
    const endPath = `${destination}.${format}`
    const file = path.join(process.cwd(), endPath)
    return fse.outputFile(file, data).then(() => {
      return {
        destination: endPath
      }
    })
  }
}

module.exports = ConvertTo



