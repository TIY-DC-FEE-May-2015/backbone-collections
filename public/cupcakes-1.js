//fill out the default fields
//kick back empty fields

//could be putting those buttons all in doc on ready - one place
	//hint: use a global var for the current cupcake, accessible universally
	//note: maybe not tho, since it's not ONE button, it's a button for each cake

//for my radio buttons - sprinkles: $("#sprinkles").is(":checked")

var MrCupcake

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

			$cupcake.find("#cake").val(flavor.get("cake"))
			$cupcake.find("#icing").val(flavor.get("icing"))
			$cupcake.find("#edit-sprinkles").prop("checked", flavor.get("sprinkles"))


			$cupcake.find(".submit").on("click", function(){	
				var cake = $cupcake.find("#cake").val()
				var icing = $cupcake.find("#icing").val()
				var sprinkles = $cupcake.find("#edit-sprinkles").is(":checked")

				flavor.set({
					cake: cake,
					icing: icing,
					sprinkles: sprinkles,
				})				

			})

			$cupcake.find(".delete").on("click", function(){
				var confirmDel = confirm("Really delete this cupcake forever and always?")
				if (confirmDel === true) {
					flavor.removeFlavor()
					updateDisplay(collection)
				}
				return
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

//maybe these save commands can be inside the success function - scoped to collection
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
//this did not exist in chrome b/c it's in doc on ready - the function ends
	//it is not globally scoped
	MrCupcake = new Shop()

	MrCupcake.fetch({
		success: function() {
			updateDisplay(MrCupcake)
			MrCupcake.on("updated", function() {
				updateDisplay(this)
			})		
		}
	})




//could use a lot of the same stuff, set up an if statement in the edit/save fn
	//to clarify if there is an edit or create happening - to keep it DRY
	$(".new-submit").on("click", function(){
		var cake = $("#flavor-submit").find("#cake").val()
		var icing = $("#flavor-submit").find("#icing").val()
		var sprinkles = $("#new-sprinkles").is(":checked")
		
		if (cake === "" || icing === "") {
			alert("Wait! Empty Fields!")
			return
		}

		MrCupcake.create({
			cake: cake,
			icing: icing,
			sprinkles: sprinkles,
		})

		$("#flavor-submit").find("#cake").val("")
		$("#flavor-submit").find("#icing").val("")

	})


})