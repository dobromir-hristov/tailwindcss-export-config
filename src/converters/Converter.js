/**
 * General converter class. To be extended by any specific format converter.
 * @type {module.Converter}
 */
module.exports = class Converter {
  /**
   * @constructor
   * @param opts
   * @param {Object} opts.config - Tailwind config object
   * @param {Boolean} opts.flat - Is flat or not
   * @param {String} opts.prefix - If we want a variable prefix
   */
  constructor (opts) {
    this.ignored = ['modules', 'plugins', 'options']

    this.config = opts.config
    this.flat = opts.flat

    this.prefix = `${ opts.prefix ? opts.prefix + '-' : ''}`
  }

  /**
   * Converts the supplied data to a list of variables
   * @param prop
   * @param data
   * @private
   */
  _convertObjectToVar (prop, data) {}

  /**
   * Converts the supplied data to a nested map
   * @param prop
   * @param data
   * @private
   */
  _convertObjectToMap (prop, data) {}

  convert () {
    let prop
    let buffer = ''
    for (prop in this.config) {
      if (this.config.hasOwnProperty(prop) && !this.ignored.includes(prop)) {
        const data = this.config[prop]
        const body = this.flat ? this._convertObjectToVar(prop, data) : this._convertObjectToMap(prop, data)
        buffer += '\n\n'
        buffer += body
      }
    }
    return buffer
  }

  _sanitizePropValue (value) {
    if (Array.isArray(value)) return `(${value})`
    if (typeof value === 'string' && value.includes(',')) return `(${value})`
    return value
  }

  getFormat () {
    throw new Error('Implement getFormat function')
  }
}
