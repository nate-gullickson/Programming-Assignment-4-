// Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 20;
let snake = [{x: 10, y: 10}];
let food = {};
let direction = 'right';
let gameRunning = false;
let score = 0;

// Function to draw a square
function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

// Function to draw the snake
function drawSnake() {
    snake.forEach(segment => drawSquare(segment.x, segment.y, 'green'));
}

// Function to draw the food
function drawFood() {
    drawSquare(food.x, food.y, 'red');
}

// Function to generate random food position
function generateFood() {
    food = {
        x: Math.floor(Math.random() * canvas.width / tileSize),
        y: Math.floor(Math.random() * canvas.height / tileSize)
    };
}

// Function to handle game over
function gameOver() {
    gameRunning = false;
    alert('Game over! Your score: ' + score);
}

// Function to start the game
function startGame() {
    if (gameRunning) return;

    // Reset variables
    snake = [{x: 10, y: 10}];
    direction = 'right';
    score = 0;
    generateFood();
    gameRunning = true;

    // Game loop
    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Move the snake
        let head = {x: snake[0].x, y: snake[0].y};
        switch (direction) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }

        // Check for collisions
        if (head.x < 0 || head.x >= canvas.width / tileSize || head.y < 0 || head.y >= canvas.height / tileSize) {
            return gameOver();
        }

        // Check for collision with food
        if (head.x === food.x && head.y === food.y) {
            score++;
            generateFood();
        } else {
            snake.pop();
        }

        // Check for collision with self
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            return gameOver();
        }

        snake.unshift(head);

        // Draw elements
        drawSnake();
        drawFood();
    }, 100);
}

// Event listener for arrow keys
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

// Button event listener
document.getElementById('startButton').addEventListener('click', startGame);