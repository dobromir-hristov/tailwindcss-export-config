module.exports = {
  theme: {
    customForms: {
      colors: {
        blue: 'blue',
        green: 'green',
      },
      somethingElse: {
        level1: {
          color: 'pink',
          arrayValue: ['a', 'b', 'c'],
          nestedB: {
            color: 'nested',
            padding: 'much',
            thing: 'thing',
            nestedC: {
              color: 'nestedC',
              nestedD: {
                color: 'nestedD',
                color2: 'color2',
                nestedE: {
                  color: 'nestedE'
                }
              }
            }
          }
        }
      }
    }
  }
}
