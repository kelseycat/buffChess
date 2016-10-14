//-------set up variables-----------
var $ = require('jquery');
var $div = $('<div>', {id: "song"});
var selectedArtist = "";
var selectedButton = "";
var selectedSongs = [];
var totalCorrect = 0;
var totalQuestions = 0;
var $answerButton = '';
var dataHold = {};

//------ start game by clicking -------
$('#startGame').click(function(){
	startGame(this);
});


//----- check if answer is correct and add to total -----
function answer() {
	totalQuestions += 1;
	if (selectedArtist === selectedButton) {
		$('#answerMessage').html("correct!");
		totalCorrect += 1;
	} else {
		$('#answerMessage').html("sorry. nice try. ");
	}
	$answerButton.attr('disabled', true);
	$('#nextQuestion').append('<button id="nextButton"> Next Question </button>');
	$('#showTotal').html('');
	$('#showTotal').append("<p>Your score is "+ totalCorrect + " out of " + totalQuestions + "</p>");
	// Need to remove the score and update it (re-write it)
}

//------ next question ------
function nextQuestion (button) {
	$(button).hide();
	$('#answerMessage').html("");
	// need to remove next question button and CSS states for button
	$answerButton.attr('disabled', false);
	$answerButton.removeClass('artistButtonClicked');
  songSelector();
}

//------ create artist buttons -------
var $buttonHolder = $('#buttonHolder');

$buttonHolder.on('click', '#chesneyButton', function(){
	$(this).addClass('artistButtonClicked');
	selectedButton = "chesney";
	answer();
});

$buttonHolder.on('click', '#buffetButton',function(){
	$(this).addClass('artistButtonClicked');
	selectedButton = "buffet";
	answer();
});

$('#nextQuestion').on('click', '#nextButton',function(){
	nextQuestion(this);
});

//------- remove start game and add artist buttons ------
function startGame (button) {
	$(button).hide();

	$.getJSON( "js/songs.json", function( data ) {
		dataHold = data;
	  songSelector();
	});

	var $chesneyButton = $('<button id="chesneyButton" class="answerButton left">Chesney</button>');
	var $buffetButton =  $('<button id="buffetButton" class="answerButton right">Buffet</button>');
	$('#buttonHolder').append($chesneyButton, $buffetButton);
	$answerButton = $('.answerButton');
}

//---------- generate a random number ------
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//------- select a random song from the json data -------
function songSelector(){
	var randArtist = getRandom(1,2);
	var randSong = "";
	var randomNumber;


	if (randArtist < 2){
		selectedArtist = "buffet";
		randomNumber = getRandom(1, dataHold.jimmy.length) - 1;
		randSong = dataHold.jimmy[randomNumber].songTitle;
		console.log(randomNumber);
	}
	else{
		selectedArtist = "chesney";
		randomNumber = getRandom(1, dataHold.chesney.length) - 1;
		randSong = dataHold.chesney[randomNumber].songTitle;
		console.log(randomNumber);

	}
	if($.inArray(randSong, selectedSongs) === -1){
		selectedSongs.push(randSong);
		$('#songHolder').html(randSong);
	} else {
		songSelector();
		console.log("had to check for another song");
	}
}

//end game function when totalQestions = 10
function endGame(){

	//no longer display songs, just total score with option to start over?
}




