const Converter = require('./Converter.js')

module.exports = class ConvertToLess extends Converter {
  constructor (opts) {
    super(opts)
  }

  _convertObjectToVar (prop, data) {
    return Object.entries(data).reduce((all, [p, v]) => {
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
    if (Array.isArray(value)) return value.join(' ')
    return value
  }
}
