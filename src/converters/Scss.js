const reduce = require('lodash.reduce')
const foreach = require('lodash.foreach')

const Converter = require('./Converter')

/**
 * @extends Converter
 */
class ScssConverter extends Converter {
  _convertObjectToMap (property, data) {
    let buffer = '(\n'
    foreach(data, (value, metric) => {
      buffer += `  ${metric}: ${this._sanitizePropValue(value)},\n`
    })
    buffer += ')'
    return `$${this._propertyNameSanitizer(property)}: ${buffer};`
  }

  _convertObjectToVar (prop, data) {
    return reduce(data, (all, value, metric) => {
      all += `$${this._propertyNameSanitizer(prop, metric)}: ${this._sanitizePropValue(value)};\n`
      return all
    }, '')
  }

  getFormat () {
    return 'scss'
  }
}

module.exports = ScssConverter
