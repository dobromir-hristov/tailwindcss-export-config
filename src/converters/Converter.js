import reduce from 'lodash.reduce'
import { indentWith } from './utils.js'
import { isObject } from './utils'

/**
 * General converter class. To be extended by any specific format converter.
 */
class Converter {

  /** @type {string} - the format and file extension */
  format

  /** @type {string} - the symbol that starts a map */
  mapOpener = '(\n'
  /** @type {string} - the symbol that ends a map */
  mapCloser = ')'

  /**
   * @param opts
   * @param {Object} opts.config - Tailwind config object
   * @param {Boolean} opts.flat - Is flat or not
   * @param {String} opts.prefix - If we want a variable prefix
   */
  constructor (opts) {
    this.config = opts.config.theme
    this.flat = opts.flat

    this.prefix = opts.prefix || ''
  }

  /**
   * Returns a variable format for the style class
   * @param {string} name
   * @param {string} value
   * @private
   */
  _buildVar (name, value) {}

  /**
   * Converts the supplied data to a list of variables
   * @param prop
   * @param data
   * @private
   */
  _convertObjectToVar (prop, data) {
    return reduce(data, (all, value, metric) => {
      if (isObject(value)) {
        return all + Object.entries(value).map(([propKey, propValue]) => {
          return this._buildVar(
            this._propertyNameSanitizer(prop, `${metric}-${propKey}`),
            this._sanitizePropValue(propValue)
          )
        }).join('')
      } else {
        return all + this._buildVar(
          this._propertyNameSanitizer(prop, metric),
          this._sanitizePropValue(value)
        )
      }
    }, '')
  }

  /**
   * Converts the supplied data to a list of nested map objects
   * @private
   * @param {string} property
   * @param {object} data
   * @return {string}
   */
  _convertObjectToMap (property, data) {
    return this._buildVar(
      this._propertyNameSanitizer(property),
      this._buildMap(data)
    )
  }

  /**
   * Builds a map object with indentation
   * @param data
   * @param indent
   * @return {string}
   * @private
   */
  _buildMap (data, indent = 0) {
    // open map
    return [
      `${this.mapOpener}`,
      // loop over each element
      ...Object.entries(data).map(([metric, value], index) => {
        return this._buildMapData(metric, value, indent, index)
      }),
      // close map
      indentWith(this.mapCloser, indent)
    ].join('')
  }

  /**
   * Builds the body data of a map
   * @param {string} metric - colors, backgroundColor, etc
   * @param {object|string} value - the metric value, usually an object
   * @param {number} indent - the number of indents to apply
   * @param {number} metricIndex - the metric index it is in
   * @return {string|*}
   * @private
   */
  _buildMapData (metric, value, indent, metricIndex) {
    if (!isObject(value)) {
      // not an object so we can directly build an entry
      return this._buildObjectEntry(metric, value, indent, metricIndex)
    }
    // its an object so we need to flatten it out
    return Object.entries(value).map(([propertyName, propertyValue], index) => {
      return this._buildObjectEntry(`${metric}-${propertyName}`, propertyValue, indent, index, metricIndex)
    }).join('')
  }

  /**
   * Creates a single map entry
   * @param {string} key - the key of the entry. Usually concatenated prefixed string
   * @param {string | array} value - the value if the entry. Should be either array or a string
   * @param {number} indent - the number of indents
   * @param {number} index - the current item index
   * @param {number} metricIndex - the current metric's index
   * @return {string}
   * @private
   */
  _buildObjectEntry (key, value, indent, index = 0, metricIndex) {
    return indentWith(`${this._objectEntryKeySanitizer(key)}: ${this._sanitizePropValue(value)},\n`, indent + 2)
  }

  /**
   * Converts the options config to the required format.
   * @returns {string}
   */
  convert () {
    let metric
    let buffer = ''
    for (metric in this.config) {
      if (this.config.hasOwnProperty(metric)) {
        const data = this.config[metric]

        const body = this.flat
          ? this._convertObjectToVar(metric, data)
          : this._convertObjectToMap(metric, data)

        buffer += '\n'
        buffer += body
      }
    }
    return buffer
  }

  /**
   * Sanitizes a value, escaping and removing symbols
   * @param {*} value
   * @return {string|*}
   * @private
   */
  _sanitizePropValue (value) {
    if (Array.isArray(value)) return `(${value})`.replace(/\\"/g, '"')
    if (typeof value === 'string' && value.includes(',')) return `(${value})`
    return value
  }

  /**
   * Sanitizes a property name by escaping characters
   * Adds prefix
   * @param {string} property - the property (colors, backgroundColors)
   * @param {string} [metric] - the property's metric (purple, red, 1/4, 24 etc..)
   * @return {string}
   * @private
   */
  _propertyNameSanitizer (property, metric = '') {
    if (metric) {
      metric = metric.replace('/', '\\/')
    }
    return [this.prefix, property, metric].filter(v => v).join('-')
  }

  /**
   * Sanitizes object keys
   * @param {string} key
   * @return {string}
   * @private
   */
  _objectEntryKeySanitizer (key) {
    return key
  }
}

export default Converter
