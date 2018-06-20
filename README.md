<div align="center">
  <a href="https://www.npmjs.com/package/tailwindcss-export-config" target="_blank">
    <img alt="Tailwindcss-export-config" src="https://raw.githubusercontent.com/dobromir-hristov/tailwindcss-export-config/master/assets/tailwindcss-export-config.png">
  </a>
  <h2 align="center">Export Tailwind config options like a pro</h2>
  
[![npm package](https://img.shields.io/npm/v/tailwindcss-export-config.svg)](https://www.npmjs.com/package/tailwindcss-export-config)
</div>


## Features

* :rocket: Exports Tailwindcss config options to SASS, SCSS, LESS and Stylus.
* :boom: CLI and Node api support
* :muscle: Unit Tested

## Getting started
1. Using npm:
`npm install tailwindcss-export-config`

or with yarn:
 
`yarn add tailwindcss-export-config`

2. Make a package.json script and run it for convenience
```json
{
  "scripts": {
    "export-tailwind-config": "tailwindcss-export-config --config=src/styles/tailwind/tailwind.config.js --destination=src/styles/scss/tailwind-configs --format=scss"
  }
}
```

or import inside your own node script

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

## Config Options
All options are available to the CLI and node package. Type `tailwindcss-export-config --h` for help.

Prop|Type|Required|Description
 ---|---|---|---
config|String,Object|true| Tailwindcss config path or config object to transform
destination|String|true| Destination to save converted file
format|String|true| The format in which to convert the file
prefix|String|false| An optional prefix for each variable name
flat|Boolean|false| Optionally transforms the variables from nested maps to flat level variables. Less does not support nested maps so we default to flat for them always.
