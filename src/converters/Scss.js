const Converter = require('./Converter')

module.exports = class ConvertToScss extends Converter {
  constructor (opts) {
    super(opts)
  }

  _convertObjectToMap (prop, data) {
    let buffer = '(\n'
    Object.entries(data).forEach(([p, v]) => {
      buffer += `  ${p}: ${this._sanitizePropValue(v)},\n`
    })
    buffer += ')'
    return `$${this.prefix}${prop}: ${buffer};`
  }

  _convertObjectToVar (prop, data) {
    return Object.entries(data).reduce((all, [p, v]) => {
      all += `$${this.prefix}${prop}-${p.replace('/', '\\/')}: ${this._sanitizePropValue(v)};\n`
      return all
    }, '')
  }

  _sanitizePropValue (value) {
    if (Array.isArray(value)) return `(${value})`
    if (typeof value === 'string' && value.includes(',')) return `(${value})`
    return value
  }

  getFormat () {
    return 'scss'
  }
}
