const Converter = require('./Converter')

class SassConverter extends Converter {
  constructor (opts) {
    super(opts)
  }

  _convertObjectToMap (prop, data) {
    let buffer = '(\n'
    Object.entries(data).forEach(([p, v]) => {
      buffer += `  ${p}: ${this._sanitizePropValue(v)},\n`
    })
    buffer += ')'
    return `$${this.prefix}${prop}: ${buffer}`
  }

  _convertObjectToVar (prop, data) {
    return Object.entries(data).reduce((all, [p, v]) => {
      all += `$${this.prefix}${prop}-${p.replace('/', '\\/')}: ${this._sanitizePropValue(v)}\n`
      return all
    }, '')
  }

  getFormat () {
    return 'sass'
  }
}

module.exports = SassConverter
