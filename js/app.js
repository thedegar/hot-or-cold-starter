//-----------------------------------------
//Tyler Hedegard 6-3-14
//Thinkful.com FEWD Hot or Cold
//-----------------------------------------

//Setup global variables
var secretNumber;
var counter = 0;
var previousDelta = null;

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
	previousDelta = null;
	//reset the guess count
	$("#count").text(counter);
	//remove the guest lists
	$("#guessList li").remove();
	//reset feedback
	$("#feedback").text("Make your Guess!")
	//Show the form section
	$("form").show();
};

//Evaluate the guess
var checkGuess = function(guess) {
	var delta = Math.abs(secretNumber - guess);
	var text;
	var newGuess;
	//logger("delta = " + delta);
	if (delta == 0) {
		text = "Winner Winner Winner!!!";
		$("form").hide();
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

	//skip the first and last events
	if (previousDelta != null && delta != 0) {
		//add hotter or colder text relative to the previous guess
		if (delta > previousDelta) {
			text = "Colder: " + text;
		}
		else if (delta < previousDelta) {
			text = "Hotter: " + text;
		}
	}
	//Change the feedback text
	$("#feedback").text(text);

	previousDelta = delta;
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
		$("#userGuess").val("").select();
		return false;
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


