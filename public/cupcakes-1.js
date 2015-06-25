var updateDisplay = function(collection){
	var template = Handlebars.compile($("#cupcake-template").html())
	$("#cupcake-menu").text("")

	collection.each(function(flavor){
		var htmlString = template(flavor.toJSON())
		$this = $(htmlString)

		var clickHandler = function(){
			var $cupcake = $(this).closest(".cupcake")

			$cupcake.addClass("highlight")
			$(".cupcake").removeClass("active")
			$cupcake.find(".hidden").removeClass("hidden")

			$cupcake.find(".close").on("click", function(){
				$cupcake.removeClass("highlight")
				$cupcake.find("[data-type='hidden']").addClass("hidden")
				$(".cupcake").addClass("active")
			})

			$cupcake.find(".submit").on("click", function(){	
				var cake = $cupcake.find("#cake").val()
				var icing = $cupcake.find("#icing").val()
				var sprinkles = ($cupcake.find("#edit-sprinkles").val())
					
				flavor.set({
					cake: cake,
					icing: icing,
					sprinkles: sprinkles,
				})
			})

			$cupcake.find(".delete").on("click", function(){
				flavor.removeFlavor()
				updateDisplay(collection)
			})

		}
		$this.find(".cupcake-info").on("click", clickHandler)

		$("#cupcake-menu").append($this)
	})
}



var Cupcake = Backbone.Model.extend({

	urlRoot: "/cupcakes",

	defaults: {
		icing: "none",
		cake: "none",
		sprinkles: false,
	},

	initialize: function(){
		this.on("change", function(){
			this.save()
			this.collection.updateViews()
		})

		this.on("create", function(){
			var cakeId = this.collection.length
			this.set("id", cakeId)
			this.save()
			this.collection.updateViews()
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

	removeFlavor: function(){
		this.destroy()
	}

})



var Shop = Backbone.Collection.extend({

	model: Cupcake,

	url: "/cupcakes",

	updateViews: function(){
		this.trigger("updated")
	},

})






$(document).on("ready", function(){

	var MrCupcake = new Shop()

	MrCupcake.fetch({
		success: function() {
			updateDisplay(MrCupcake)
		}
	})

	MrCupcake.on("updated", function() {
		updateDisplay(this)
	})

//I know this shoudl be in var Shop, to make it more variable
//but it is late and i need sleep at some point this week,
//so I will fix it later!
	$(".new-submit").on("click", function(){
		var cake = $("#flavor-submit").find("#cake").val()
		var icing = $("#flavor-submit").find("#icing").val()
		var sprinkles = ($("#flavor-submit").find("#edit-sprinkles").val())
			
		MrCupcake.create({
			cake: cake,
			icing: icing,
			sprinkles: sprinkles,
		})
	})


})