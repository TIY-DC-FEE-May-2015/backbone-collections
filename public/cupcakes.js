var Cupcake = Backbone.Model.extend({
	
	defaults :{
		icing : "Unknown Icing",
		cake : "Unknown Cake",
		sprinkles: false

	},



	validate: function(attributes) {
		if(attributes.icing === "" || !(attributes.sprinkles === true) || !(attributes.sprinkles === false)){
		return "this is invalid" 
		}

	}

})
	



var Shop = Backbone.Collection.extend({
	url: "/cupcakes",

	model:Cupcake,

	


})

	
var cupcakeCurrent


var updateView = function(collection){
	var template = Handlebars.compile ( $("#cupcake-template").html())

	 $("#cupcake-list").empty() 

	collection.each(function(cupcake){

		var cupcakeData = cupcake.toJSON()

		var $div = $( template(cupcakeData))



		    $div.find(".delete-button").on("click", function(){
		    	console.log(cupcake)
		     	cupcake.destroy()
		     	updateView(collection)
		    })


		 	$div.find(".edit-button").on ("click", function(){
		 		$("#icing-name").val(cupcake.get("icing"))
		 		$("#cake-name").val(cupcake.get("cake"))
		 		$("#cupcake-sprinkles").prop("checked", cupcake.get("sprinkles"))
		 		cupcakeCurrent = cupcake
		 		console.log("hello")

		 	})

		   
		
		$("#cupcake-list").append($div)

	})
	
}

var clearBox = function(){
	$("#icing-name").val(""),
	$("#cake-name").val ("")
}

$(document).on("ready", function(){

	var cupcakeShop = new Shop()


	/*cupcakeShop.on("add", function(){
		updateView(this)
	})*/
	cupcakeShop.on("add remove", function(){
		$("#cupcake-count").text(cupcakeShop.length)
		})

		


	cupcakeShop.fetch({
		success:updateView
	})

	$("#save-cupcake").on ("click", function(){
		if (cupcakeCurrent){
			cupcakeCurrent.set({
				icing: $("#icing-name").val(),
		 		cake: $("#cake-name").val(),
		 		sprinkles:$("#cupcake-sprinkles").prop("checked")
			})

		cupcakeCurrent.save()
		
		}
		else{
			cupcakeShop.create({
				icing: $("#icing-name").val(),
		 		cake: $("#cake-name").val(),
		 		sprinkles: $("#cupcake-sprinkles").prop("checked")
			})
		}
		updateView(cupcakeShop)
		clearBox()
	})
		

})
