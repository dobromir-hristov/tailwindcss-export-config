const reduce = require('lodash.reduce')
const Converter = require('./Converter.js')

class LessConverter extends Converter {
  constructor (opts) {
    super(opts)
  }

  _convertObjectToVar (prop, data) {
    return reduce(data, (all, v, p) => {
      all += `@${this.prefix}${prop}-${p.replace('/', '\\/')}: ${this._sanitizePropValue(v)};\n`
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
