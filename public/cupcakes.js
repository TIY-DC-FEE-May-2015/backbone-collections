var currentCupcake
var Cupcake = Backbone.Model.extend({

	defaults: {
		name: "Name",
		icing: "Icing",
		cake: "Cake",
		sprinkles: false,
		quantity: 0
	},

	urlRoot: "/cupcakes",

	sprinkles: function() {
		console.log(this.get("sprinkles"))
		if (this.get("sprinkles") === false) {
			console.log(this)
			this.set({
				sprinkles: true
			})
		}
		else {
			this.set({
				sprinkles: this.get("sprinkles") === false
			})
		}
	},

	increaseQty: function() {
		this.set({
			quantity: this.get("quantity") + 1
		})
	},

	decreaseQty: function() {
		if (this.get("quantity") > 0) {
			this.set({ 
				quantity: this.get("quantity") - 1
			})
		}
	},

	validate: function(attributes) {
		if (attributes.sprinkles === false) {
			return "This does not have sprinkles!"
		}
	},

	initialize: function() {
		this.on("change", function() {
			this.collection.updateView()
		})
	},
})

var updateAll = function(collection) {
	var template = Handlebars.compile( $("#cupcakeTemplate").html() )

	$("#cupcakeList").empty()

	currentCupcake = collection
	console.log(currentCupcake)

	collection.each(function(cupcake){

	    var cupcakeData = cupcake.toJSON()

	    var $cupCakeDiv = $( template(cupcakeData) )

	    //var $randomDiv = 

	    $cupCakeDiv.find(".sprinkle-button").on("click", function() {
	    	cupcake.sprinkles()
	    	console.log("Hi")
	    })

	    $cupCakeDiv.find(".increase-button").on("click", function() {
	    	cupcake.increaseQty()
	    })

	    $cupCakeDiv.find(".decrease-button").on("click", function() {
	    	cupcake.decreaseQty()
	    })

	    $cupCakeDiv.find(".delete-button").on("click", function() {
	    	cupcake.destroy()
	    })

	    $("#cupcakeList").append($cupCakeDiv)
	})
}

var singleFlavor = function(collection) {
	var template = Handlebars.compile( $("#cupcakeTemplate").html() )

	$("#randomCupcake").empty()

	var num = Math.floor(Math.random() * collection.length)

	var singleCID = collection.get(num)
	
	var singleData = singleCID.toJSON()

	var $singleDiv = $( template(singleData) )

	$("#randomCupcake").append($singleDiv)
	
}

var Shop = Backbone.Collection.extend({

	model: Cupcake,

	url: function() {
		if (updateAll) {
			return "/cupcakes"
		} 
		if (singleFlavor) {
			return "/cupcakes/:cid"
		}
	},

	initialize: function() {
		this.on("add", function(){
		       this.trigger("added")
		    })
	},

	updateView: function() {
		this.trigger("updated")
	}
})

var cupcakeCollection

$(document).on("ready", function(){

	var cupcakeShop = new Shop()

	cupcakeShop.on("updated", function() {
		console.log(this)
		updateAll(this)
	})

	cupcakeShop.on("remove", function() {
		updateAll(this)
	})

	$(".submit-button").on("click", function() {
		cupcakeShop.create({
			cake: $("#newCake").val(),
			icing: $("#newIcing").val(),
			sprinkles: $("#checkSprinkles").is(":checked")
		})

	    updateAll(cupcakeShop)	
	   })

	cupcakeShop.fetch({
		success: function(collection) {
			updateAll(collection)
			singleFlavor(collection)
			//newFlavor(collection)
			
	    }
	
	})
})



