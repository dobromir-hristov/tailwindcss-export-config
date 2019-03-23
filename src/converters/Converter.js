/**
 * General converter class. To be extended by any specific format converter.
 */
class Converter {
  /**
   * @param opts
   * @param {Object} opts.config - Tailwind config object
   * @param {Boolean} opts.flat - Is flat or not
   * @param {String} opts.prefix - If we want a variable prefix
   */
  constructor (opts) {
    this.ignored = ['modules', 'plugins', 'options']

    this.config = opts.config
    this.flat = opts.flat

    this.prefix = opts.prefix || ''
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

  /**
   * Converts the options config to the required format.
   * @returns {string}
   */
  convert () {
    let metric
    let buffer = ''
    for (metric in this.config) {
      if (this.config.hasOwnProperty(metric) && !this.ignored.includes(metric)) {
        const data = this.config[metric]
        const body = this.flat ? this._convertObjectToVar(metric, data) : this._convertObjectToMap(metric, data)
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

  /**
   * @return string
   */
  getFormat () {
    throw new Error('Implement getFormat function')
  }

  _propertyNameSanitizer (property, metric = '') {
    if (metric) {
      metric = metric.replace('/', '\\/')
    }
    return [this.prefix, property, metric].filter(v => v).join('-')
  }
}

module.exports = Converter
