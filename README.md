## Backbone - Collections and Sync

### Description

This UI utilizes Backbone Models, Events,Collections and Sync for a simple CRUD application that manages the available flavors in a cupcake shop. The UI performs the following tasks: 

* Show all flavors
* Show a single flavor
* Create a new flavor
* Edit an existing flavor
* Delete an existing flavor

The app leverages a Handlebars template and does some client-side `.validate()`-ion. All cupcake flavors have `frosting`, `cake`, and `sprinkles` attributes, and the `sprinkles` attribute is either `true` or `false`.

I used these pre-built routes in a node.js application (built by my instructor) that also serves up these files:

* **GET** `/cupcakes` -- Returns a list of cupcake flavors on sale at a bakery
* **GET** `/cupcakes/:flavorId` -- Returns details about a specific cupcake flavor
* **PUT** `/cupcakes` -- Creates a new cupcake flavor for sale
* **POST** `/cupcakes/:flavorId` -- Updates the details about a specific cupcake flavor
* **DELETE** `/cupcakes/:flavorId` -- Obliterates every red velvet cupcake (or some other specific flavor, I guess)

