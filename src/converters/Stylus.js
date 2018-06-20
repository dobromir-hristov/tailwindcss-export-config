const Converter = require('./Converter.js')

class StylusConverter extends Converter {
  constructor (opts) {
    super(opts)
  }

  _convertObjectToVar (prop, data) {
    return Object.entries(data).reduce((all, [p, v]) => {
      all += `$${this.prefix}${prop}-${p.replace('/', '\\/')} = ${this._sanitizePropValue(v)}\n`
      return all
    }, '')
  }

  _convertObjectToMap (prop, data) {
    let buffer = '{\n'
    Object.entries(data).forEach(([p, v]) => {
      buffer += `  ${this._sanitizeProp(p)}: ${this._sanitizePropValue(v)},\n`
    })
    buffer += '}'
    return `$${this.prefix}${prop} = ${buffer}`
  }

  getFormat () {
    return 'styl'
  }

  _sanitizeProp (prop) {
    if (/\d/.test(prop)) return `"${prop}"`
    return prop
  }
}

module.exports = StylusConverter
