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
// Create 100 of these elements with a for loop:
	for (let i = 0; i < 100; i++) {
// Create element:
		const square = document.createElement("div");
// Add styling to the element:
		square.classList.add("square");
// Put the element into our grid:
		grid.appendChild(square);
// Push it into a new squares array:
		squares.push(square);
	}
}
createGrid();

// Drawing the snake on the grid:
currentSnake.forEach((index) => squares[index].classList.add("snake"));

// Create a start game function and implement more functionality:
// Add setInterval for game to start and add move() function for it to begin:
function startGame() {
// Remove the snake
	currentSnake.forEach((index) => squares[index].classList.remove("snake"));
// Remove the apple
	squares[appleIndex].classList.remove("apple");
// Clear timer invtervals:
	clearInterval(timerId);
// Reset all starting variables:
	currentSnake = [2, 1, 0];
	direction = 1;
	score = 0;
// Add the new score to browser:
	scoreDisplay.textContent = score;
	intervalTime = 1000;
	generateApples();
// Add the class of snake to our new currentSnake:
	currentSnake.forEach((index) => squares[index].classList.add("snake"));
// Reset the timer Id back to normal
	timerId = setInterval(move, intervalTime);
}

function move() {
	if (
// If snake has hit the bottom wall:
		(currentSnake[0] + width >= width * width && direction === width) ||
// If snake has hit right wall:
		(currentSnake[0] % width === width - 1 && direction === 1) ||
// If snake has hit left wall:
		(currentSnake[0] % width === 0 && direction === -1) ||
// If snake has hit top:
		(currentSnake[0] + width < 0 && direction === -width) ||
// If snake goes through itself:
		squares[currentSnake[0] + direction].classList.contains("snake")
	)
// Resets the move function and the timed interval it was given to null:
		return clearInterval(timerId);

// Remove last element from our currentSnake array:
	const tail = currentSnake.pop();
// Remove styling from last element:
	squares[tail].classList.remove("snake");
// Add square in direction we are heading:
	currentSnake.unshift(currentSnake[0] + direction);

// Integrate the snake head obtaining the random generated apples:
	if (squares[currentSnake[0]].classList.contains("apple")) {
// Remove the class of apple
		squares[currentSnake[0]].classList.remove("apple");
// Grow our snake by adding class of snake to it
		squares[tail].classList.add("snake");
// Grow our snake array
		currentSnake.push(tail);
// Generate new apple
		generateApples();
// Add one to the score
		score++;
// Display our score
		scoreDisplay.textContent = score;
// Speed up our snake
		clearInterval(timerId);
		intervalTime = intervalTime * speed;
		timerId = setInterval(move, intervalTime);
	}

// Add styling so we can see the snake having moved one direction
	squares[currentSnake[0]].classList.add("snake");
}

// Generate apples randomly on the grid:
function generateApples() {
	do {
// Generate random number
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
// Adds function control(e) as an event listener so that arrow keys move snake:
document.addEventListener("keydown", control);
// Adds function startGame() as an event listener so that the button resets the board:
document.addEventListener("click", startGame);
