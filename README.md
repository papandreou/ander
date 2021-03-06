# ander

Render a list of items as dictated by the locale. The formats are extracted from
[the
CLDR](http://cldr.unicode.org/development/development-process/design-proposals/list-formatting).

## Installation

```
npm install ander
```

## Syntax

```js
ander(itemsArray, localeId); // localeId defaults to 'en-US'
```

Returns a string with the formatted list items.

## Examples

```js
const ander = require('ander');

// American English:
console.log(ander(['foo', 'bar', 'quux'], 'en-US'));
// foo, bar, and quux

// which is also the default if the localeId parameter is omitted:
console.log(ander(['foo', 'bar', 'quux']));
// foo, bar, and quux

// Arabic:
console.log(ander(['foo', 'bar', 'quux'], 'ar'));
// foo، bar، وquux
```

## RELEASES

See the [changelog](CHANGELOG.md).
