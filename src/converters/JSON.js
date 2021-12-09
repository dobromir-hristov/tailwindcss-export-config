import Converter from './Converter'

class JSONConverter extends Converter {
  format = 'json'

  convert () {
    const filtered = Object.entries(this.theme).filter(([key]) => {
      return this._isSettingEnabled(key)
    })

    return JSON.stringify(Object.fromEntries(filtered), null, 2)
  }
}

export default JSONConverter
