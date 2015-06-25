var Cupcake = Backbone.Model.extend({

	defaults: {
		
		icing: "none",
		cake: "regular cake",
		sprinkles: false

	},

	url: "/cupcakes",


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
  },

  initialize: function() {
    this.on("change", function(){
      this.collection.updateViews()
    })
  }

})

var Shop = Backbone.Collection.extend({

	model: Cupcake,

	url: "/cupcakes",

	updateViews: function() {
   	 this.trigger("updated")
  	},

  editCupcake: function() {
     this.set({
      icing: this.get("quantity") + 1  //enter edit info
    })
  },

  initialize: function() {
    
    this.on("add", function(){
      this.trigger("added")
    })
    
  }

})


var cupcakeCollection;


var updateView = function(collection) {
  var template = Handlebars.compile( $("#cupcake-template").html() )

  $("#cupcake-list").empty()  

  collection.each(function(cupcake){
    cupcakeCollection = collection
    var cupcakeData = cupcake.toJSON()
    var $div = $( template(cupcakeData) )


    $div.find(".edit-button").on("click", function(){

      cupcake.editCupcake()
      console.log(cupcake)
    })

    $div.find(".delete-button").on("click", function(){
      cupcake.destroy()
      console.log(cupcake)
    })


    $("#cupcake-list").append($div)



   $(".cupcake").on("click", function() {

      $(this).addClass("active");
      $(".cupcake").addClass("hidden");
      $(".active").removeClass("hidden");

      $(".active").on("click", function(){
      $(this).removeClass("active");
      $(".cupcake").removeClass("hidden")
          })
      })


  })

  

}

$(document).on("ready", function(){

  var myStore = new Shop()
  
  myStore.on("added", function(){
    updateView(this)
  })

  myStore.on("updated", function(){
    updateView(this)
  })

  myStore.on("remove", function(){
    updateView(this)
  })

  myStore.fetch({
    success: updateView
  })


})

$("#new-button").on("click", function(){
  var newIcing = $("#icing-maker").val();
  var newCake = $("#cake-maker").val();
  var newSprinkles = false;
  if ($('#yes-sprinkles').is(':checked')) {
    newSprinkles = true;
  }
  
  cupcakeCollection.create({
    icing: newIcing,
    cake: newCake,
    sprinkles: newSprinkles
  });

  $("#icing-maker").val("");
  $("#cake-maker").val("");

})

