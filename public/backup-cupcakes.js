var updateDisplay = function(){
 	console.log("display changed")
}

 // create new flavor
	//text fields send info
	var newFlavor = function(options) {
		

		new Cupcake({

		})
	}

// edit flavor
	//text fields send infor

// delete flavor
	//use data-tag to match this.get("id")
	//on the 

var Cupcake = Backbone.Model.extend({

	urlRoot: "/cupcakes",

	defaults: {
		icing: "none",
		cake: "none",
		sprinkles: false,
	},

	initialize: function(){
		this.on("change", function(){
			console.log("i've changed")
			this.save()
			this.collection.updateViews()
		})

		this.on("add", function(){
			var cakeId = this.collection.length
			this.set("id", cakeId)
			this.save()
		})
	},

	validate: function(attrs) {
		if (attrs.icing === undefined){
			return "Without icing it's just a fluffy muffin!"
		}
		if (attrs.cake === undefined){
			return "Without cake it is literally not a cupcake."
		}
		if (typeof attrs.sprinkles !== 'boolean') {
			return "Sprinkles is yes or no."
		}
	},



})



var Shop = Backbone.Collection.extend({

	model: Cupcake,

	url: "/cupcakes",

//list all cupcakes
	listFlavors: function() {
		var template = Handlebars.compile($("#cupcake-template").html())

		this.each(function(flavor){
			var htmlString = template(flavor.toJSON())
			$this = $(htmlString)
			$("#cupcake-menu").append($this)

			var clickHandler = function(){
				//maybe this stuff goes into the update function?
				var $cupcake = $(this).closest(".cupcake")

				$cupcake.addClass("highlight")
				$(".cupcake").removeClass("active")
				$cupcake.find(".hidden").removeClass("hidden")

				$cupcake.find(".close").on("click", function(){
					$cupcake.removeClass("highlight")
					$cupcake.find("[data-type='hidden']").addClass("hidden")
					$(".cupcake").addClass("active")
				})

			}
			$this.find(".cupcake-info").on("click", clickHandler)
		})
	},

	updateViews: function(){
		this.trigger("updated")
	},

})






$(document).on("ready", function(){

	var MrCupcake = new Shop()

	MrCupcake.fetch({
		success: function() {
			MrCupcake.listFlavors()
		}
	})

	MrCupcake.on("updated", function() {
		updateDisplay(this)
		console.log("Mr Cupcake Updated")
	})


})