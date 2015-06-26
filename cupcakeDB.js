var u = require("underscore")

var items = {}
var pkCounter = 0

var createItem = function(data) {
  pkCounter++
  var item = u.extend({}, data, { id: pkCounter })
  items[pkCounter] = item

  return item
}

var editItem = function(id, data) {
  if (!items[id]) {
    return false
  }

  var item = u.extend({}, items[id], data)
  items[id] = item

  return item
}

exports = module.exports = {

  list: function() {
    return u.values(items)
  },

  create: function(data) {
    return createItem(data) || false
  },

  read: function(id) {
    return items[id] || false
  },

  update: function(id, data) {
    return editItem(id, data) || false
  },

  delete: function(id) {
    var item = items[id]
    items = u.omit(items, id)

    return item || false
  },

  init: function() {
    createItem({ title: "Top Hat" , icing: "Chocolate", cake: "Vanilla", sprinkles: false, qty: 1, url:"top-hat" })
    createItem({ title: "White on White", icing: "Vanilla", cake: "Vanilla", sprinkles: true, qty: 1, url:"white-on" })
    createItem({ title: "Oreo Cup", icing: "Vanilla", cake: "Chocolate", sprinkles: true, qty: 1, url:"oreo-cup"  })
    createItem({ title: "Chocolate Squared", icing: "Chocolate", cake: "Chocolate", sprinkles: false, qty: 1, url:"choco-2"  })
    createItem({ title:"Cup & Cookie" , icing: "Vanilla", cake: "Cookie Dough", sprinkles: false, qty: 1, url:"cup-cookie" })
    createItem({ title:"Red Tie" , icing: "Vanilla", cake: "Red Velvet", sprinkles: false, qty: 1, url:"red-tie" })
    createItem({ title:"Strawberry & Cream" , icing: "Strawberry", cake: "Vanilla", sprinkles: true, qty: 1, url:"strawberry" })
  }

}