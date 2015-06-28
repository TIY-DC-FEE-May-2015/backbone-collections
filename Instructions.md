## Backbone - Collections and Sync

### Description

A second-level assignment for Backbone.js. We'll be taking the concepts that we learned yesterday -- Models and Events -- and using them with Backbone.Collections and Backbone.Sync. 

### Normal Mode - Step 1

Read through the following sections in the Backbone documentation:

* [Collection](http://backbonejs.org/#Collection)
* [Sync](http://backbonejs.org/#Sync)

### Normal Mode - Step 2

Filling out the `Cupcake` model and the `Shop` collection, write a UI for a simple CRUD application that manages the available flavors in a cupcake shop. (This could be Kate's Cupcake Shop, but we're making it generic and object-oriented, so it can be anyone's cupcake shop! Sorry Kate)

The UI should be able to do a few tasks, at a minimum:

* Show all flavors
* Show a single flavor
* Create a new flavor
* Edit an existing flavor
* Delete an existing flavor

You'll want to build and leverage a own Handlebars template for this. `data-` attributes and dynamic listeners will probably be necessary! Don't worry, we're going to cover `Backbone.View` tomorrow, so this might be the last time you'll need to do this for a while. (At least you don't need to write AJAX anymore!)

The Cupcake model should do some client-side `.validate()`-ion -- specifically, all cupcake flavors need to have `frosting`, `cake`, and `sprinkles` attributes, and the `sprinkles` attribute should be either `true` or `false`.

There are a few pre-built routes in the node.js application that also serves up the files:

* **GET** `/cupcakes` -- Returns a list of cupcake flavors on sale at a bakery
* **GET** `/cupcakes/:flavorId` -- Returns details about a specific cupcake flavor
* **PUT** `/cupcakes` -- Creates a new cupcake flavor for sale
* **POST** `/cupcakes/:flavorId` -- Updates the details about a specific cupcake flavor
* **DELETE** `/cupcakes/:flavorId` -- Obliterates every red velvet cupcake (or some other specific flavor, I guess)

These should correspond to the default routes used by `Backbone.Sync`. You won't need to modify the server-side code.

### Hard Mode

Look into the documentation for [Handlebars helpers](http://handlebarsjs.com/#helpers). Write some template helpers that displays the flavor data in a more human-friendly way (i.e. "Chocolate cake and vanilla frosting, no sprinkles"). 
