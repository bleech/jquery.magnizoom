# jQuery Magnizoom

Magnify images with ease. A no-brainer with touch support.

# [DEMO](http://bleech.github.com/jquery.magnizoom)

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/bleech/jquery.magnizoom/master/dist/jquery.magnizoom.min.js
[max]: https://raw.github.com/bleech/jquery.magnizoom/master/dist/jquery.magnizoom.js

### Markup
```html
<img src="image-small.jpg" rel="image-zoomed.jpg />
```

### Initialization
```javascript
$('img').magnizoom();
```

### Options
```javascript
// setting global default options
$.fn.magnizoom.options = {
  diameter: 250
};

// setting custom instance options
$('img').magnizoom({
  diameter: 200
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## License
Copyright (c) 2012 bleech  
Licensed under the MIT, GPL licenses.
