var Cupcake = Backbone.Model.extend({
	
//all cupcake flavors has frosting, sprinkles, cake . sprinkles is true or false. 
	defaults: {
		title: "Unknown",
		icing:"Unkown" , 
		sprinkles: false, 
		cake: "Unkown",
		qty: 1,
		url: "cup-cake"

	}, 

//access server with cupcake data 
	urlRoot: "/cupcakes",

//validate the code for sprinkles to be true or false and every cupcake to have icing and cake
	validate: function(attrs){
		if (attrs.sprinkles != true || attrs.sprinkles != false){
			return "This is not a cupcake!"
		}
		if (attrs.icing === "" || attrs.cake === ""){
			return "We do not sell these"
		}
		if (attrs.qty < 0){
			return "We cannot owe cupcakes!"
		}
	},
//sets a listener
	initialize: function() {
    this.on("change", function(){
      this.collection.updateView()
    })
  }

})

var Shop = Backbone.Collection.extend({
	
	
	model: Cupcake,
	url: "/cupcakes",

	initialize: function() {
   
    this.on("add", function(){
       this.trigger("added")
    })
  
  },

  updateView: function() {
    this.trigger("updated")
  },
//Show a single flavor
    listOneCupcake: function() {
     this.filter(function(cupcake){	
        return cupcake.get("name") 
     })
    }

 
})

var templates = {}
var thatCupcake;

var updateView = function(collection) {

 $("#big-box").empty()

 //Show all flavors & show them 
		
 collection.each(function(cupcake){
 
	var htmlString = templates.cupcake( cupcake.toJSON() )
	var $div = $( htmlString )

//Delete an existing flavor
 $div.find(".delete-button").on("click", function(){
      cupcake.destroy()
      //updatView(collection)
      console.log(cupcake)
    })

//Edit an existing flavor
 $div.find(".edit-button").on("click", function(){
 		$(".add-editbox").removeClass("hidden")
 		thatCupcake = cupcake
 		$("#title").val(cupcake.get("title") )
		$("#cake").val(cupcake.get("cake") )
		$("#icing").val(cupcake.get("icing") )
		$("#sprinkles").prop("checked", cupcake.get("sprinkles"))
 	})

 $div.find(".up").on("click", function(){
 		cupcake.set({
 			qty: ( cupcake.get("qty") )+1
 		})	
 	})

 $div.find(".down").on("click", function(){
 		cupcake.set({
 			qty: ( cupcake.get("qty") ) - 1
 		})	
 	})

	 $("#big-box").append($div)
 })
}


	// Add another flavor 

$(document).on("ready", function(){

	var cupShop = new Shop()
	templates.cupcake = Handlebars.compile( $("#cupcake-box").html() )
	//var cup = new Cupcake()
	cupShop.on("updated", function(){
    	updateView(this)
    })


	 cupShop.on("added", function(){
    	updateView(this)
  	})
	

    cupShop.on("remove", function(){
    	updateView(this)
    })

	cupShop.fetch ({
		success: updateView
	})

	$(".create-button").on("click", function(){
		$(".add-editbox").removeClass("hidden")
	})

	$("#cancel-button").on("click", function(){
		$(".add-editbox").addClass("hidden")
		$("#title").val("")
		$("#cake").val("")
		$("#icing").val("")
	})

	// Bind a listener to the save donut button
  $("#save-donut").on("click", function(){
  	console.log(thatCupcake)
  	
    // Check to see if we are currently editing a donut
    if (thatCupcake) {
      thatCupcake.set({
        title: $("#title").val(),	
	  	icing: $("#icing").val(),
	    cake: $("#cake").val(),
	    sprinkles: $("#sprinkles").is(":checked")
      })
      thatCupcake.save()
    } else{
     	cupShop.create({
		  	title: $("#title").val(),	
		  	icing: $("#icing").val(),
		    cake: $("#cake").val(),
		    sprinkles: $("#sprinkles").is(":checked")
		}) 
    }
    })

})