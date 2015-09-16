domel
============

[![Build Status](https://secure.travis-ci.org/mpneuried/domel.png?branch=master)](http://travis-ci.org/mpneuried/domel)
[![Build Status](https://david-dm.org/mpneuried/domel.png)](https://david-dm.org/mpneuried/domel)
[![NPM version](https://badge.fury.io/js/domel.png)](http://badge.fury.io/js/domel)

A simple dom helper if you want to get rid of jQuery.

[![NPM](https://nodei.co/npm/domel.png?downloads=true&stars=true)](https://nodei.co/npm/domel/)

You can use it with the commonjs or amd pattern otherwise it will just inject to `window.domHelper`

## Install

```
  npm install domel
```

## Initialize

```
var domel = require( "domel" );

// general selector
domel( ".myid .subclass" ); // a list of matching elements 

// get by class
domel.byClass( "my-class" ); // a list of elements 

// get by id
var myEl = domel.byId( "my-id" ); // a single element
myEl.d.addClass( "foo" ).d.show()
```

## Methods

This module will add a `d` property to every retuned dom element.
So you can use at least every **domel** function without adding the element `el.d.{function}()`

### selector / `find`

Use a selector to find dom elements

**Returns:** *(Element|HTMLCollection)* Returns all matching elements or an array of elements.
If `onlyFirst` is `true` only the fist element will be returned.

#### Examples:

*direct usage*:

`domel( selector [, context = document][, onlyFirst = false] )`

*wrapped usage by `.d`*:

`el.d.find( selector[, onlyFirst = false] )`



### `byClass`

get sub elements by class. If no `context` is defined `document` will be used. 

**Returns:** *(Element|HTMLCollection)* Returns all matching elements or an array of elements.
If `onlyFirst` is `true` only the fist element will be returned.

#### Examples:

*direct usage*:

`domel.byClass( _cl [, context = document][, onlyFirst = false] )`

*wrapped usage by `.d`*:

`el.d.byClass( _cl[, onlyFirst = false] )`



### `byId`

get an element by id

**Returns:** *(Element)* Returns the matching element

#### Examples:

*direct usage*:

`domel.byId( _id [, context = document] )`

*wrapped usage by `.d`*:

`el.d.byId( _id )`



### `data`

get the data attributes of an element

**Returns:** *(Strin|Object)* Returns elements data as object of the value if a `key` was defined.

#### Examples:

*direct usage*:

`domel.data( el, key )`

*wrapped usage by `.d`*:

`el.d.data( key )`



### `last`

the last element matching the selector

**Returns:** *(Element)* Returns the matching element

#### Examples:

*direct usage*:

`domel.last( el, selector )`

*wrapped usage by `.d`*:

`el.d.last( selector )`



### `first`

the first element matching the selector

**Returns:** *(Element)* Returns the matching element

#### Examples:

*direct usage*:

`domel.first( el, selector )`

*wrapped usage by `.d`*:

`el.d.first( selector )`



### `parent`

the parent element or a parent up on the tree if a selector was set

**Returns:** *(Element)* Returns the parent element

#### Examples:

*direct usage*:

`domel.parent( el [, selector] )`

*wrapped usage by `.d`*:

`el.d.parent( selector )`



### `children`

all direct children or all direct children matching the selector

**Returns:** *(HTMLCollection)* Returns all matching elements

#### Examples:

*direct usage*:

`domel.children( el, selector )`

*wrapped usage by `.d`*:

`el.d.children( selector )`



### `countChildren`

all direct children or all direct children matching the selector

**Returns:** *(Number)* Returns the number of children

#### Examples:

*direct usage*:

`domel.countChildren( el, selector )`

*wrapped usage by `.d`*:

`el.d.countChildren( selector )`



### `is`

test the element against a selector

**Returns:** *(Boolean)* This element matches the selector

#### Examples:

*direct usage*:

`domel.is( el, selector )`

*wrapped usage by `.d`*:

`el.d.is( selector )`



### `hasClass`

check if the element has the given css class

**Returns:** *(Boolean)* This element has the class

#### Examples:

*direct usage*:

`domel.hasClass( el, classname )`

*wrapped usage by `.d`*:

`el.d.hasClass( classname )`



### `addClass`

add a css class

**Returns:** *(Element)* Returns the element for chaining

#### Examples:

*direct usage*:

`domel.addClass( element, classname )`

*wrapped usage by `.d`*:

`el.d.addClass( classname )`



### `removeClass`

remove a css class

**Returns:** *(Element)* Returns the element for chaining

#### Examples:

*direct usage*:

`domel.removeClass( element, classname ) `

*wrapped usage by `.d`*:

`el.d.removeClass( classname ) `



### `hide`

hide the element by setting `style="display:none"`

**Returns:** *(Element)* Returns the element for chaining

#### Examples:

*direct usage*:

`domel.hide( el )`

*wrapped usage by `.d`*:

`el.d.hide()`



### `show`

show the element by setting `style="display:{display}"`

**Returns:** *(Element)* Returns the element for chaining

#### Examples:

*direct usage*:

`domel.show( el [, display = "block"] )`

*wrapped usage by `.d`*:

`el.d.show( [display = "block"] )`



### `hasId`

check if the element.id matches the given id

**Returns:** *(Boolean)* The id matches the given id

#### Examples:

*direct usage*:

`domel.hasId( el, id )`

*wrapped usage by `.d`*:

`el.d.hasId( id )`



### `append`

Append html to a element

**Returns:** *(Element)* Returns the element for chaining

#### Examples:

*direct usage*:

`domel.append( el, html )`

*wrapped usage by `.d`*:

`el.d.append( html )`



### `prepend`

Prepend html to a element

**Returns:** *(Element)* Returns the element for chaining

#### Examples:

*direct usage*:

`domel.prepend( el, html )`

*wrapped usage by `.d`*:

`el.d.prepend( html )`



### `remove`

Remove the element from the dom

**Returns:** *(Element)* Returns the removed element

#### Examples:

*direct usage*:

`domel.remove( el )`

*wrapped usage by `.d`*:

`el.d.remove()`



### `on`

listen to a dom event.

**Returns:** *(Element)* Returns the removed element

#### Examples:

*direct usage*:

`domel.on( el, type, handler )`

*wrapped usage by `.d`*:

`el.d.on( type, handler )`



### `off`

remove to dom event listener.

**Returns:** *(Element)* Returns the removed element

#### Examples:

*direct usage*:

`domel.off( el, type, handler )`

*wrapped usage by `.d`*:

`el.d.off( type, handler )`



### `emit`

emit an event manually

**Returns:** *(Element)* Returns the removed element

#### Examples:

*direct usage*:

`domel.emit( el, type )`

*wrapped usage by `.d`*:

`el.d.emit( type )`


## TODO

- Test script
- Better docs ;-)
- IE Tests and Shims

## Release History
|Version|Date|Description|
|:--:|:--:|:--|
|0.0.1|2015-9-16|Initial commit|

[![NPM](https://nodei.co/npm-dl/domel.png?months=6)](https://nodei.co/npm/domel/)

> Initially Generated with [generator-mpnodemodule](https://github.com/mpneuried/generator-mpnodemodule)

## The MIT License (MIT)

Copyright © 2015 M. Peter, http://www.tcs.de

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
