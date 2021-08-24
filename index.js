const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.8;
let timerId = 0;

function createGrid() {
	//create 100 of these elements with a for loop
	for (let i = 0; i < 100; i++) {
		// Create element
		const square = document.createElement("div");
		// Add styling to the element
		square.classList.add("square");
		// Put the element into our grid
		grid.appendChild(square);
		// Push it into a new squares array
		squares.push(square);
	}
}
createGrid();
// Drawing the snake on the grid
currentSnake.forEach((index) => squares[index].classList.add("snake"));

// create a start game function and implement more functionality:
// add setInterval for game to start and add move() function for it to begin:
function startGame() {
	// remove the snake
	currentSnake.forEach((index) => squares[index].classList.remove("snake"));
	// remove the apple
	squares[appleIndex].classList.remove("apple");
	// clear timer invtervals
	clearInterval(timerId);
	// reset all starting variables
	currentSnake = [2, 1, 0];
	direction = 1;
	score = 0;
	// re add the new score to browser
	scoreDisplay.textContent = score;
	intervalTime = 1000;
	generateApples();
	// re add the class of snake to our new currentSnake
	currentSnake.forEach((index) => squares[index].classList.add("snake"));
	// reset the timer Id back to normal
	timerId = setInterval(move, intervalTime);
}

function move() {
	// using modulus in our game:
	if (
		//if snake has hit bottom
		(currentSnake[0] + width >= width * width && direction === width) ||
		//if snake has hit right wall
		(currentSnake[0] % width === width - 1 && direction === 1) ||
		//if snake has hit left wall
		(currentSnake[0] % width === 0 && direction === -1) ||
		//if snake has hit top
		(currentSnake[0] + width < 0 && direction === -width) ||
		// if snake goes through itself
		squares[currentSnake[0] + direction].classList.contains("snake")
	)
		return clearInterval(timerId);

	// remove last element from our currentSnake array
	const tail = currentSnake.pop();
	//remove styling from last element
	squares[tail].classList.remove("snake");
	//add sqaure in direction we are heading
	currentSnake.unshift(currentSnake[0] + direction);

	// integrate the snake head obtaining the random generated apples:
	if (squares[currentSnake[0]].classList.contains("apple")) {
		//remove the class of apple
		squares[currentSnake[0]].classList.remove("apple");
		//grow our snake by adding class of snake to it
		squares[tail].classList.add("snake");

		//grow our snake array
		currentSnake.push(tail);
		//generate new apple
		generateApples();
		//add one to the score
		score++;
		//display our score
		scoreDisplay.textContent = score;
		//speed up our snake
		clearInterval(timerId);
		intervalTime = intervalTime * speed;
		timerId = setInterval(move, intervalTime);
	}

	//add styling so we can see it
	squares[currentSnake[0]].classList.add("snake");
}

// generate apples randomly on the grid:
function generateApples() {
	do {
		// generate random number
		appleIndex = Math.floor(Math.random() * squares.length);
	} while (squares[appleIndex].classList.contains("snake"));
	squares[appleIndex].classList.add("apple");
}

function control(e) {
	if (e.keyCode === 39) {
		// console.log("Right clicked!");
		direction = 1;
	} else if (e.keyCode === 38) {
		// console.log("Up clicked!");
		direction = -width;
	} else if (e.keyCode === 37) {
		// console.log("Left clicked!");
		direction = -1;
	} else if (e.keyCode === 40) {
		// console.log("Down clicked!");
		direction = +width;
	}
}

document.addEventListener("keyup", control);
document.addEventListener("click", startGame);

// Checklist:
// (1) Style style style
// (2) Publish your project on GitHub, Portfolio
