const reduce = require('lodash.reduce')
const Converter = require('./Converter.js')

class LessConverter extends Converter {
  _convertObjectToVar (property, data) {
    return reduce(data, (all, value, metric) => {
      all += `@${this._propertyNameSanitizer(property, metric)}: ${this._sanitizePropValue(value)};\n`
      return all
    }, '')
  }

  _convertObjectToMap (prop, data) {
    return this._convertObjectToVar(prop, data)
  }

  getFormat () {
    return 'less'
  }

  _sanitizePropValue (value) {
    if (Array.isArray(value)) return value.join(', ')
    return value
  }
}

module.exports = LessConverter
