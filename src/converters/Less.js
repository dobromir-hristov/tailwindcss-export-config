import Converter from './Converter.js'

class LessConverter extends Converter {
  format = 'less'

  _buildVar (name, value) {
    return `@${name}: ${value};\n`
  }

  _convertObjectToMap (prop, data) {
    return this._convertObjectToVar(prop, data)
  }

  _sanitizePropValue (value) {
    if (Array.isArray(value)) return value.join(', ')
    return value
  }
}

export default LessConverter
