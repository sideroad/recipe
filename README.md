# Cook your javascript with recipe.js

## Overview

- Resolving libraries dependencies (AMD)
- Avoiding browser cache without using cache manifest when you update libraries
- Multiple charset setting each script
- Parallel script downloads

I strongly recommend to use [grunt-recipe](https://github.com/sideroad/grunt-recipe/)

## Prepare to cook

### Preparing dependencies, version script
Before using this plugins, please setting grunt-recipe and make recipe.version.js, recipe.dependencies.js

### Preparing recipe for each page

#### recipe(options)

|Key|Type|Value|
|---|----|-----|
|libraries|Array<String>|libraries namespace list|
|scripts|Array<String>|scripts URL list|

recipe function return `Deferred` object.
`then` function call after all libraries, scripts loaded

```js
recipe({
  libraries: [
    "fettuccine.alfredo",
    "acqua.pazza"
  ],
  scripts: [
    "path/to/script.js"
  ]
}).then(function(){
  console.log("Dig in!");
});
```
