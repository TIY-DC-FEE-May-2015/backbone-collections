// Creates Cupcake model

var Cupcake = Backbone.Model.extend({

	defaults: {
		
		icing: "none",
		cake: "regular cake",
		sprinkles: false

	},

  validate: function(attributes) {
    
    if (attributes.icing === "") {
      return "No icing? Seriously?!"
    }
    if (attributes.cake === "") {
      return "Umm, cake is LITERALLY in the name. It's kind of a necessary part of a cupcake."
    }
    if (attributes.sprinkles !== true || attributes.sprinkles !== false) {
    	return "Sooooo are the sprinkles or not?"
    }
  }

})

// Creates Cupcake collection

var Shop = Backbone.Collection.extend({

	model: Cupcake,

	url: "/cupcakes",

})

// Globally scoping some variables...

var templates = {};  // templates go in here

var currentCupcake;  // keeps track of the current cupcake (if there is one)


// Our main update/refreshing the UI function

var updateCupcakeList = function(collection) {

  // Empty the current info first
  $("#cupcake-list").empty();

  // Loop through the collection and add some Handlebars magic!
  collection.each(function(cupcake) {
    var htmlString = templates.cupcake( cupcake.toJSON() ); // remember to use toJSON !!
    $cupcake = $(htmlString);

    // Create delete button on each cupcake
    $cupcake.find(".delete-button").on("click", function() {
      cupcake.destroy();
      updateCupcakeList(collection);
    })

    // Create edit button on each cupcake
    $cupcake.find(".edit-button").on("click", function() {
      // show the edit mode screen and prefill inputs
      toggleEditMode();

      $("#edit-icing").val( cupcake.get("icing") );
      $("#edit-cake").val( cupcake.get("cake") );
      $("#edit-sprinkles").prop("checked", cupcake.get("sprinkles"));

      // Set the current cupcake
      currentCupcake = cupcake;
    })

    $("#cupcake-list").append($cupcake);

  })

}


// Toggles the view between edit mode and list mode

var toggleEditMode = function() {
  $(".container").toggleClass("editing")
}

// When the document is ready...

$(document).on("ready", function() {


  // Create shop and template and populate the list

  var myShop = new Shop();

  templates.cupcake = Handlebars.compile( $("#cupcake-template").html() );

  myShop.fetch({
    success: function(collection) {
      updateCupcakeList(collection);
    }
  });

  $("#cancel-button").on("click", function() {
    toggleEditMode();
  })

  $("#save-cupcake").on("click", function(){
    // Check to see if we are currently editing a donut
    if (currentCupcake) {
      currentCupcake.set({
        icing: $("#edit-icing").val(),
        cake: $("#edit-cake").val(),
        sprinkles: $("#edit-sprinkles").is(":checked")
      })

      currentCupcake.save()
    }
    // Otherwise, create a brand new donut
    else {
      myShop.create({
        icing: $("#edit-icing").val(),
        cake: $("#edit-cake").val(),
        sprinkles: $("#edit-sprinkles").is(":checked")
      })
    }

    toggleEditMode()

    updateCupcakeList(myShop)

  })

  $("#add-cupcake").on("click", function() {
    toggleEditMode();
  })


})