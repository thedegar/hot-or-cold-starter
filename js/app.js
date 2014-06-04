//-----------------------------------------
//Tyler Hedegard 6-3-14
//Thinkful.com FEWD Hot or Cold
//-----------------------------------------

//Setup global variables
var secretNumber;
var counter = 0;

//logger
var logger = function(variable) {
	console.log(variable);
};
//function that generates a random number
var random = function() {
	secretNumber = Math.floor((Math.random() * 100) + 1);
};

//Start a new game
var newGame = function() {
	//create a new random number
	random();
	//reset the counter
	counter = 0;
	//reset the guess count
	$("#count").text(counter);
	//remove the guest lists
	$("#guessList li").remove();
	//reset feedback
	$("#feedback").text("Make your Guess!")
};

//Evaluate the guess
var checkGuess = function(guess) {
	var delta = Math.abs(secretNumber - guess);
	var text;
	logger("delta = " + delta);
	if (delta == 0) {
		text = "Winner Winner Winner!!!";
	}
	else if (delta < 10) {
		text = "Molten Hot!";
	}
	else if (delta < 25) {
		text = "Hot";
	}
	else if (delta < 50) {
		text = "Cold";
	}
	else {
		text = "Ice Cold...";
	}
	$("#feedback").text(text);
};

$(document).ready(function(){
	//Start a new game
	if (secretNumber == undefined) {
		newGame();
	};

	//Click New Game
	$(".new").click(function() {
		newGame();

	});

	//Handle Guess button click
	$("#guessButton").click(function() {
		var guess = $("#userGuess").val();
		var newList = $('<li></li>').text(guess);
		if (guess%1 != 0 || guess <= 0 || guess > 100) {
			$("#feedback").text("Please enter a number between 1 and 100");
		}
		else {
			checkGuess(guess);
			counter++;
			$("#guessList").append(newList);
			$("#count").text(counter);
		}
		$("#userGuess").val("");
	});

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

});


