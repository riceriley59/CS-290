//Riley Rice 5/1/2023
//Course: CS290 Section#: 01

let playerTurn = true;
let computerMoveTimeout = 0;

const gameStatus = {
	MORE_MOVES_LEFT: 1,
	HUMAN_WINS: 2,
	COMPUTER_WINS: 3,
	DRAW_GAME: 4
};

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
	// Setup the click event for the "New game" button
	const newBtn = document.getElementById("newGameButton");
	newBtn.addEventListener("click", newGame);

	// Create click-event handlers for each game board button
	const buttons = getGameBoardButtons();
	for (let button of buttons) {
		button.addEventListener("click", function () { boardButtonClicked(button); });
	}

	// Clear the board
	newGame();
}

// Returns an array of 9 <button> elements that make up the game board. The first 3 
// elements are the top row, the next 3 the middle row, and the last 3 the 
// bottom row. 
function getGameBoardButtons() {
	return document.querySelectorAll("#gameBoard > button");
}

function checkForWinner() {
	
	const buttons = getGameBoardButtons();

	// Ways to win
	const possibilities = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
		[0, 4, 8], [2, 4, 6] // diagonals
	];

	// Check for a winner first
	for (let indices of possibilities) {
		if (buttons[indices[0]].innerHTML !== "" &&
			buttons[indices[0]].innerHTML === buttons[indices[1]].innerHTML &&
			buttons[indices[1]].innerHTML === buttons[indices[2]].innerHTML) {
			
			// Found a winner
			if (buttons[indices[0]].innerHTML === "X") {
				return gameStatus.HUMAN_WINS;
			}
			else {
				return gameStatus.COMPUTER_WINS;
			}
		}
	}

	// See if any more moves are left
	let foundEmpty = false;
	for (let button of buttons) {
		if (button.innerHTML !== "X" && button.innerHTML !== "O") {
			return gameStatus.MORE_MOVES_LEFT;
		}
	}

	// If no winner and no moves left, then it's a draw
	return gameStatus.DRAW_GAME;
}

//This function creates a newgame by resetting all the buttons and 
//the computers timer. It then sets it to the player's turn and then 
//displays your turn.
function newGame() {
	//clear and reset timer
	clearTimeout(computerMoveTimeout);
	computerMoveTimeout = 0;

	//get buttons
	const buttons = getGameBoardButtons();

	//go through all the buttons and remove all their classes and contents
	buttons.forEach((button) => {
		button.innerHTML = "";
		button.classList.remove("x", "o");
		button.disabled = false;
	});

	//set it to players turn
	playerTurn = true;
	
	//display that it's the users turn
	const turnInfo = document.getElementById("turnInfo");
	turnInfo.innerHTML = "Your turn";
}

//This function handles when a button is clicked
function boardButtonClicked(button) {
	//if its the players turn then change the button 
	//to display and x and have the x class and make it
	//disabled then switchturns otherwise don't do anything
	if(playerTurn){
		button.innerHTML = "X";
		button.classList.add("x");
		button.disabled = true;

		switchTurn();
	}
}

//This function handles switching the turns between the player and computer
//it also handles when the player wins or loses or if they draw
function switchTurn() {
	//get some values like the state of the game and our display element
	//so we can change them
	let result = checkForWinner();
	const turnInfo = document.getElementById("turnInfo");

	//check to see if there are more moves
	if(result === gameStatus.MORE_MOVES_LEFT){
		//toggle players turn
		playerTurn = !playerTurn;

		//display whos turn it is
		turnInfo.innerHTML = playerTurn ? "Your turn" : "Computer's turn";

		//if it's not the players turn then make the computer move after 1 second
		if(!playerTurn){
			computerMoveTimeout = setTimeout(makeComputerMove, 1000);
		}
	}else{
		//set playerturn to false so they can't click anything
		playerTurn = false;

		//change the text based on the outcome of the game
		if(result === gameStatus.HUMAN_WINS){
			turnInfo.innerHTML = "You win!";
		}else if(result === gameStatus.COMPUTER_WINS){
			turnInfo.innerHTML = "Computer wins!";
		}else{
			turnInfo.innerHTML = "Draw game";
		}
	}
}

//this handles making the computer choose a box or "making a move"
function makeComputerMove() {
	//get all the buttons
	const buttons = getGameBoardButtons();

	//set some values
	let foundButton = false;
	let randButton = null;

	//keep on looking at random buttons until we find one
	while(!foundButton){
		//get a random number from 0 to the lenght of buttons
		let randomIndex = Math.floor(Math.random() * buttons.length);

		//get the button at the random index
		randButton = buttons[randomIndex];

		//if the button isn't disabled meaning it hasn't been clicked
		//then we found the button
		if(!randButton.hasAttribute("disabled")){
			foundButton = true;
		}
	}

	//change that button to be selected by the computer
	randButton.innerHTML = "O";
	randButton.classList.add("o");
	randButton.disabled = true;

	//switch turns
	switchTurn();
}