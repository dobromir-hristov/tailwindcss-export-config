# Export Tailwindcss config options to SASS, SCSS, LESS, Stylus and CSS variables.
Sometimes you just need the tailwind config options to be available to your preprocessor of choice, be it Sass/Less/Stylus or even as plain css variables.

Unfortunately Tailwindcss exports its values as a javascript object, but with **tailwindcss-export-config** you can convert those into any of the formats noted above, as nested lists/maps or flat level variables.

## Config Options
All options are available to the CLI and node package.

Prop|Type|Required|Description
 ---|---|---|---
config|String,Object|true| Tailwindcss config path or config object to transform
destination|String|true| Destination to save converted file
format|String|true| The format in which to convert the file
prefix|String|false| An optional prefix for each variable name
flat|Boolean|false| Optionally transforms the variables from nested maps to flat level variables. Less and CSS vars do not support nested maps so we default to flat for them always.

## Usage
**tailwindcss-export-config** can be used either as a node package or directly in the terminal.

### Terminal/CLI usage
`tailwindcss-export-config --config=path/to/tailwind.config.js --destination=converted/file/destination --format=scss --prefix=tw --flat=true`

### Node usage
```js
import TailwindExportConfig from 'tailwindcss-export-config'
const converter = new TailwindExportConfig({
  config: 'path/to/tailwind.config.js',
  destination: 'converted/file/destination',
  format: 'scss',
  prefix: 'tw',
  flat: true
})
// writeToFile returns a promise so we can chain off it
converter.writeToFile().then(() => {
  console.log('Success')
}).catch((error) => {
  console.log('Oops', error.message)
})
```
