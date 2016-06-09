var mainLoop = require('main-loop')
var h = require('virtual-dom/h')

var state = { items: [] }

function renderItem (item) {
  var listItem = h('li.item', {
    key: item.color, // TODO: use a unique key.
    style: { 'background-color': item.color },
    onclick: function (ev) { removeItem(item.color) }
  }, String(item.content))

  listItem.transition = 500

  return listItem
}

function render (state) {
  return h('div', [
    h('section.list.swing', [
      h('button', { 'onclick': addItem }, 'Add a list item'),
      h('ul', state.items.map(function (item) {
        return renderItem(item)
      }))
    ])
  ])
}

function addItem () {
  state.items.push({ content: 'List item', color: getRandomColor() })
  loop.update(state)
}

function removeItem (color) {
  state.items.forEach(function (item, i) {
    if (item.color === color) state.items.splice(i, 1)
  })
  loop.update(state)
}

function getRandomColor () {
  var letters = '0123456789ABCDEF'.split('')
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

var loop = mainLoop(state, render, {
  create: require('virtual-dom/create-element'),
  diff: require('virtual-dom/diff'),
  patch: require('..') // require('virtual-dom-transition')
})
document.body.appendChild(loop.target)

// Add some items
for (var i = 0; i < 3; i++) addItem()
