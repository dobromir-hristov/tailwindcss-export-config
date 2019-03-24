const reduce = require('lodash.reduce')
const foreach = require('lodash.foreach')

const Converter = require('./Converter.js')

class StylusConverter extends Converter {
  _convertObjectToVar (property, data) {
    return reduce(data, (all, value, metric) => {
      all += `$${this._propertyNameSanitizer(property, metric)} = ${this._sanitizePropValue(value)}\n`
      return all
    }, '')
  }

  _convertObjectToMap (property, data) {
    let buffer = '{\n'
    foreach(data, (value, metric) => {
      buffer += `  ${this._sanitizeMetric(metric)}: ${this._sanitizePropValue(value)},\n`
    })
    buffer += '}'
    return `$${this._propertyNameSanitizer(property)} = ${buffer}`
  }

  getFormat () {
    return 'styl'
  }

  _sanitizeMetric (prop) {
    if (/\d/.test(prop)) return `"${prop}"`
    return prop
  }
}

module.exports = StylusConverter
