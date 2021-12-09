import Converter from './Converter.js'

class CssConverter extends Converter {
  format = 'css'
  prefixContent = '\n:root {'
  suffixContent = '}'

  _buildVar (name, value) {
    return `--${name}: ${value};\n`
  }

  _convertObjectToMap (prop, data) {
    return this._convertObjectToVar(prop, data)
  }

  _sanitizePropValue (value) {
    if (Array.isArray(value)) return value.join(', ')
    return value
  }

  _propertyNameSanitizer (property) {
    property = super._propertyNameSanitizer(property)
    return property.replace(/\./g, '\\.')
  }
}

export default CssConverter
