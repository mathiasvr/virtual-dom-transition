# virtual-dom-transition [![npm][npm-img]][npm-url] [![dependencies][dep-img]][dep-url] [![license][lic-img]][lic-url]
A modified `patch` for [virtual-dom][1],
making it easy to work with CSS transitions and animate elements being inserted or removed.

[npm-img]: https://img.shields.io/npm/v/virtual-dom-transition.svg
[npm-url]: https://www.npmjs.com/package/virtual-dom-transition
[dep-img]: https://david-dm.org/mathiasvr/virtual-dom-transition.svg
[dep-url]: https://david-dm.org/mathiasvr/virtual-dom-transition
[lic-img]: http://img.shields.io/:license-MIT-blue.svg
[lic-url]: http://mvr.mit-license.org

## install
```
npm install virtual-dom-transition
```

To use this module you need to replace your virtual-dom `patch` method with the one provided.
```javascript
var h = require('virtual-dom/h')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom-transition/patch') // CSS Transition support
```
The `patch` method is almost identical to the original from [virtual-dom][1]
with minor changes to add CSS transition support.

## documentation
Transition support are enabled by adding a `transition` property to a VNode you want to animate.

The `duration` specifies the DOM removal delay, which should be the same as your css `transition-duration`.
When an element is inserted to DOM the `enter` class is added, and removed in the next tick.
Similarly the `leave` class is added when the element is being removed.

```javascript
var item = h('li.item', { key: ID }, 'List-item')
item.transition = {
    duration: 1000,
    enterClass: 'enter',
    leaveClass: 'leave
}
```

These are the default values, for simplicity you may omit the CSS classes:
```javascript
item.transition = 1000 // duration
```

> Note that when working with items in a list you must provide the `key` attribute to allow virtual-dom to distinguish and reorder the elements!

### CSS
Here is a basic CSS transition for fading elements in and out, based on the default parameters:
```css
li.item .enter, li.item .leave {
    opacity: 0;
}

li.item {
    opacity: 1;
    transition: all 1s ease-in-out;
}
```

## version
The module follows the `version` numbering of [virtual-dom][1].

## inspiration
This module is inspired by the [ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html) of React.

[1]: https://github.com/Matt-Esch/virtual-dom
