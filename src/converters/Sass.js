const reduce = require('lodash.reduce')
const foreach = require('lodash.foreach')

const Converter = require('./Converter')

class SassConverter extends Converter {
  _convertObjectToMap (property, data) {
    let buffer = '(\n'
    foreach(data, (value, metric) => {
      buffer += `  ${metric}: ${this._sanitizePropValue(value)},\n`
    })
    buffer += ')'
    return `$${this._propertyNameSanitizer(property)}: ${buffer}`
  }

  _convertObjectToVar (property, data) {
    return reduce(data, (all, value, metric) => {
      all += `$${this._propertyNameSanitizer(property, metric)}: ${this._sanitizePropValue(value)}\n`
      return all
    }, '')
  }

  getFormat () {
    return 'sass'
  }
}

module.exports = SassConverter
