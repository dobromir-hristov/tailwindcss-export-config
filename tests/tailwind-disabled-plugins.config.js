// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px'
    },
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif']
    },
    borderWidth: {
      default: '1px',
      '0': '0'
    },
    extend: {
      minWidth: {
        half: '50%'
      }
    }
  },
  corePlugins: {
    colors: false,
    spacing: false,
    backgroundColor: false,
    backgroundPosition: false,
    backgroundSize: false,
    borderColor: false,
    borderRadius: false,
    boxShadow: false,
    container: false,
    cursor: false,
    fill: false,
    flex: false,
    flexGrow: false,
    flexShrink: false,
    fontSize: false,
    fontWeight: false,
    height: false,
    inset: false,
    letterSpacing: false,
    lineHeight: false,
    listStyleType: false,
    margin: false,
    maxHeight: false,
    minHeight: false,
    maxWidth: false,
    objectPosition: false,
    opacity: false,
    order: false,
    padding: false,
    placeholderColor: false,
    stroke: false,
    textColor: false,
    width: false,
    zIndex: false
  }
}
