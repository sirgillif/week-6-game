/*
	Have buttons on the screen that can be clicked on to return gifs make it video game themed


		http://api.giphy.com/v1/gifs/search?q=[search Item here]&limit=10&api_key=dc6zaTOxFJmzC
*/
var games=[
	"Pong","Space Invaders","Halo","Mortal Combat","Mario Party","Super Smash Bros","Kingdom Hearts"
];

function renderButtons(){ 
	// YOUR CODE GOES HERE
	$("#gameButtons").empty();
	$.each(games,function(index,element){
		var button = $("<button/>")
		.addClass("game").attr('name',element).text(element)
		$("#gameButtons").append(button);
		});
};

$("#addGame").on("click", function(){
	//console.log("adding game");
	if(!gameInList($("#game-input").val())){
			games.push($("#game-input").val());
		}
		renderButtons();
		$("#game-input").val("");
		return false;
});

function gameInList(game){
		for (var i = 0; i < games.length; i++) {
			if(games[i].toLowerCase()==game.toLowerCase()){
				return true;
			}
		}
		return false;
	}

renderButtons();

$(document.body).on("click",".game",function(){
	//console.log($(this).attr("name").split(" ").join("+"));
	/*<img src="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="animalImage">*/
	var api_key="dc6zaTOxFJmzC";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+$(this).attr("name").split(" ").join("+")+"&limit=10&rating=pg-13&api_key="+api_key;
	$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
    	//console.log(response.data);
    	$.each(response.data,function(index,element){
    		var imgHolder = $("<div/>").addClass("block").append("<p> Rated: "+element.rating+"</p>");
    		var gif=$("<img>").addClass("gif")
    			gif.attr("src",element.images.fixed_height_small_still.url);
    			gif.attr("data-animate",element.images.fixed_height_small.url);
    			gif.attr("data-still",element.images.fixed_height_small_still.url);
    			gif.attr("data-state","still");
    		imgHolder.append(gif);
    		if(index===0){
				$("#gifs").empty()
				$("#gifs").append(imgHolder);
    		}
    		else{
    			$("#gifs").append(imgHolder);
    		}
    	});
    }).fail(function(err) {
  			throw err;
		});
});
var htmlChange
$(document.body).on("click",".gif",function(){
	var state = $(this).attr("data-state");
	if (state==="still") {
		htmlChange =$(this).attr("data-animate");
		$(this).attr("data-state","animate");
		state = $(this).attr("data-state");
		$(this).attr("src",htmlChange);
		// console.log("hey your now: "+state)
	}
	else{
		htmlChange =$(this).attr("data-still");
		$(this).attr("data-state","still");
		state = $(this).attr("data-state");
		$(this).attr("src",htmlChange);
		 //console.log("hey your now: "+state);
	}
			/* 
			var htmlChange
            if(state==="still"){
                htmlChange =$(this).attr("data-animate")
                $(this).attr("src",htmlChange)
                $(this).attr("data-state","animate")
                state = $(this).attr("data-state");
                 console.log("hey your now: "+state)
            }
            else{
                htmlChange =$(this).attr("data-still");
                $(this).attr("src",htmlChange);
                $(this).attr("data-state","still");
                 console.log("hey your now: "+state);
            }*/
});