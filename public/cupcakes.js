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
				sprinkles: this.get("sprinkles") === true
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

	newFlavor: function() {
		var input = new Cupcake( {
			name: $("#newCake").val(),
			icing: $("#newIcing").val()
		})

		console.log(input)

		input.save()
		this.collection.add(input)

		console.log(this.collection)
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

	collection.each(function(cupcake){

	    var cupcakeData = cupcake.toJSON()

	    var $cupCakeDiv = $( template(cupcakeData) )

	    var $randomDiv = 

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

	    $(".submit-button").on("click", function() {
	    	cupcake.newFlavor()	
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

	},

	updateView: function() {
		this.trigger("updated")
	}
})

$(document).on("ready", function(){

	var cupcakeShop = new Shop()

	cupcakeShop.on("updated", function() {
		console.log(this)
		updateAll(this)
	})

	cupcakeShop.on("remove", function() {
		updateAll(this)
	})

	cupcakeShop.fetch({
		success: function(collection) {
			updateAll(collection)
			singleFlavor(collection)
		}	
	
	})
})



