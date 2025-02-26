const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const easyButton = document.getElementById("easyButton");
const mediumButton = document.getElementById("mediumButton");
const hardButton = document.getElementById("hardButton");
const scoreDisplay = document.getElementById("score");

canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }];
let direction = { x: 20, y: 0 };
let food = { x: getRandomPosition(0, canvas.width), y: getRandomPosition(0, canvas.height) };
let score = 0;
let gameInterval;
let speed = 150; // Default speed

// Draw the grid-like background
function drawGrid() {
    const tileSize = 20;
    ctx.strokeStyle = "#7D9F7E";
    for (let x = 0; x < canvas.width; x += tileSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    for (let y = 0; y < canvas.height; y += tileSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();
}

// Generate random positions for food
function getRandomPosition(min, max) {
    return Math.floor(Math.random() * (max - min) / 20) * 20;
}

// Draw the snake
function drawSnake() {
    ctx.fillStyle = "#2196F3";
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, 20, 20);
    }
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateScoreDisplay();
        food = { x: getRandomPosition(0, canvas.width), y: getRandomPosition(0, canvas.height) };
    } else {
        snake.pop();
    }
}

// Draw the food
function drawFood() {
    ctx.fillStyle = "#FF4757";
    ctx.beginPath();
    ctx.arc(food.x + 10, food.y + 10, 10, 0, Math.PI * 2);
    ctx.fill();
}

// Update the score display
function updateScoreDisplay() {
    scoreDisplay.textContent = score;
}

// Update the game state
function updateGame() {
    moveSnake();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawSnake();
    drawFood();

    if (isGameOver()) {
        alert(`Game Over! Your score: ${score}`);
        resetGame();
    }
}

// Check for collisions
function isGameOver() {
    const head = snake[0];

    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

// Reset the game
function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 20, y: 0 };
    score = 0;
    updateScoreDisplay();
    food = { x: getRandomPosition(0, canvas.width), y: getRandomPosition(0, canvas.height) };
    clearInterval(gameInterval);
    startButton.style.display = 'block';
    speed = 150;
}

// Handle key presses
window.addEventListener("keydown", event => {
    const key = event.key;
    if (key === "ArrowUp" && direction.y === 0) {
        direction = { x: 0, y: -20 };
    } else if (key === "ArrowDown" && direction.y === 0) {
        direction = { x: 0, y: 20 };
    } else if (key === "ArrowLeft" && direction.x === 0) {
        direction = { x: -20, y: 0 };
    } else if (key === "ArrowRight" && direction.x === 0) {
        direction = { x: 20, y: 0 };
    }
});

// Set speed for the game and restart game loop
easyButton.addEventListener("click", () => {
    speed = 200;
    restartGameLoop();
});

mediumButton.addEventListener("click", () => {
    speed = 150;
    restartGameLoop();
});

hardButton.addEventListener("click", () => {
    speed = 100;
    restartGameLoop();
});

// Function to restart the game loop with the new speed
function restartGameLoop() {
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameInterval = setInterval(updateGame, speed);
}


startButton.addEventListener("click", () => {
    startButton.style.display = 'none';
    updateScoreDisplay();
    restartGameLoop();
});
