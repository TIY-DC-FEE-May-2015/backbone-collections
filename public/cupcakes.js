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
	


var updateView = function(collection){
	var template = Handlebars.compile ( $("#cupcake-template").html())

	 $("#cupcake-list").empty() 

	collection.each(function(cupcake){

		var cupcakeData = cupcake.toJSON()

		var $div = $( template(cupcakeData))

		    $div.find(".add-cupcake").on("click", function(){
		      cupcake.increaseQuantity()
		    })

		    $div.find(".delete-cupcake").on("click", function(){
		    	console.log(cupcake)
		     	cupcake.destroy()
		    })
		
		$("#cupcake-list").append($div)

	})
}

$(document).on("ready", function(){

	var cupcakeShop = new Shop()

	cupcakeShop.on("updated", function(){
		updateView(this)
	})

	cupcakeShop.on("remove", function(){
		updateView(this)
	})


	cupcakeShop.fetch({
		success:updateView
	})

	/*var cupcakeStuff2= new Single()
	cupcakeStuff2.fetch({
		success:updateView
	})*/

})