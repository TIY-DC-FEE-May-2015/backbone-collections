var Cupcake = Backbone.Model.extend({
	
	defaults :{
		icing : "Unknown Icing",
		cake : "Unknown Cake",
		sprinkles: false

	},

	/*hasCupcake: function(thatCupcake){
		var onecupcake = _.find(this.cupcake, function())
	}*/


	validate: function(attributes) {
		if(attributes.icing === "" || !(attributes.sprinkles === true) || !(attributes.sprinkles === false)){
		return "this is invalid" 
		}

	}

	/*initialize: function(){
		this.on("change", function(){
			this.collection.updateView()
		})
	}*/


})
	



var Shop = Backbone.Collection.extend({
	url: "/cupcakes",

	model:Cupcake,

	


})

/*var Single = Backbone.Collection.extend({
	url:"cupcakes/flavorId",
})*/



	//url:"/cupcakes/:flavorId",
	
var cupcakeCurrent


var updateView = function(collection){
	var template = Handlebars.compile ( $("#cupcake-template").html())

	 $("#cupcake-list").empty() 

	collection.each(function(cupcake){

		var cupcakeData = cupcake.toJSON()

		var $div = $( template(cupcakeData))

		  
			/*$("#add-cupcake").on("click",function(){
				console.log("hi")
				//cupcake.()
			})*/

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

	cupcakeShop.on("add", function(){
		updateView(this)
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

	$("#add-cupcake").on("click", function(){
		cupcakeCurrent= false
		$("#icing-name").val(),
		$("#cake-name").val (),
		$("#cupcake-sprinkles").prop("checked", false)
		console.log(cupcakeShop)
	})
	updateView(cupcakeShop)

})
