// require("./parse.js")

const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).on("keypress", function (e) {
	if (!started) {
		$("#level-title").text("Level: " + level);
		nextSequence();
		started = true;
	}
});

const nextSequence = function () {
	userClickedPattern = [];
    $("#level-title").text("Level: " + level);
	const randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
	gamePattern.push(randomChosenColor);
	$("#" + randomChosenColor)
		.fadeOut(100)
		.fadeIn(100);
	playAudio(randomChosenColor);

};

$(".btn").click(function () {
	if (started) {
		let userChosenColor = $(this).attr("id");
		userClickedPattern.push(userChosenColor);
        checkAnswer(userClickedPattern.length);
        playAudio(userChosenColor);
		animatePress(userChosenColor);
	}
});

const playAudio = function (sound) {
	let audio = new Audio(`sounds/${sound}.mp3`);
	audio.play();
};

const animatePress = function (currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
};

const checkAnswer = function (currentLevel) {
	if (
		gamePattern[currentLevel] === userClickedPattern[currentLevel] &&
		gamePattern.length === userClickedPattern.length
	) {
        console.log("success");      
	    level += 1;
		setTimeout(function () {
			nextSequence();
		}, 1000);
	} else {
		console.log("wrong");
		gameOver();
	}
};

const gameWin = function () {};

const gameOver = function () {
	playAudio("wrong");
	$("#level-title").text("Game Over");
	$("body").addClass("game-over");
	setTimeout(function () {
		$("body").removeClass("game-over");
	}, 1000);

	setTimeout(function () {
		location.reload(true);
	}, 1000);
};
