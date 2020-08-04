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
    accessibility: false,
    alignContent: false,
    alignItems: false,
    alignSelf: false,
    appearance: false,
    backgroundAttachment: false,
    backgroundColor: false,
    backgroundOpacity: false,
    backgroundPosition: false,
    backgroundRepeat: false,
    backgroundSize: false,
    borderCollapse: false,
    borderColor: false,
    borderOpacity: false,
    borderRadius: false,
    boxShadow: false,
    colors: false,
    container: false,
    cursor: false,
    divideColor: false,
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
    maxWidth: false,
    minHeight: false,
    objectPosition: false,
    opacity: false,
    order: false,
    padding: false,
    placeholderColor: false,
    spacing: false,
    stroke: false,
    textColor: false,
    width: false,
    zIndex: false
  }
}
