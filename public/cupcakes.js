var Cupcake = Backbone.Model.extend({
	
//all cupcake flavors has frosting, sprinkles, cake . sprinkles is true or false. 
	defaults: {
		icing:"Unkown" , 
		sprinkles: false, 
		cake: "Unkown"
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
	}

})

var Shop = Backbone.Collection.extend({
	
	
	model: Cupcake,
	url: "/cupcakes",

	initialize: function() {
   
    this.on("add", function(){
      createNew();
    })
  
  },
//Show a single flavor
    listOneCupcake: function() {
     this.filter(function(cupcake){	
        return cupcake.get("name") 
     })
    },

  



updateView: function() {
    this.trigger("updated")
  }

 
})

var updateView = function(collection) {

 $("#big-box").empty()

 //Show all flavors & show them 
 var template = Handlebars.compile( $("#cupcake-box").html() )
		
 collection.each(function(cupcake){
	var cupcakeData = cupcake.toJSON()
	var $div = $( template(cupcakeData) )

//Delete an existing flavor
 $div.find(".delete-button").on("click", function(){
      cupcake.destroy()
      console.log(cupcake)
    })


	 $("#big-box").append($div)
  })
}



var createNew = function(collection){


	// Add another flavor 
		

		$(".create-button").on("click", function(){	
			var newCupcake = new Cupcake(
		  	{icing: $("#icing").val(),
		    cake: $("#cake").val(),
		    sprinkles: $("#sprinkles").val()
			   }
		  	) 
		  	 collection.create(newCupcake)
			
		})


}
 


$(document).on("ready", function(){
	var cupShop = new Shop()
	var cup = new Cupcake()
	cupShop.on("updated", function(){
    	updateView(this)
    })


	cup.on("add", function(){
		createNew(this)
	})
	
   

    cupShop.on("remove", function(){
    	updateView(this)
    })

	cupShop.fetch ({
		success: updateView
	})


//Edit an existing flavor

})