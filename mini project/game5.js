const circle = document.getElementById("circle");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const resetButton = document.getElementById("reset-button");
let score = 0;
let startTime = Date.now();
let timerActive = true;

// Function to move the circle to a random position
function moveCircle() {
    const gameArea = document.getElementById("game-area");
    const maxX = gameArea.clientWidth - circle.clientWidth;
    const maxY = gameArea.clientHeight - circle.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    circle.style.left = `${randomX}px`;
    circle.style.top = `${randomY}px`;
}

// Function to update the timer
function updateTimer() {
    if (timerActive) {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
        timerDisplay.textContent = elapsedTime.toFixed(2); // Display with 2 decimal places
        requestAnimationFrame(updateTimer); // Continuously update the timer
    }
}

// Increase score, move the circle, and update the timer when clicked
circle.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    moveCircle(); // Move the circle to a new random position
});

// Reset the game
resetButton.addEventListener("click", () => {
    score = 0;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = "0.00";
    timerActive = true;
    startTime = Date.now();
    updateTimer();
    moveCircle();
});

// Start the timer and move the circle initially
moveCircle();
updateTimer();