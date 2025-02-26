const circle = document.getElementById("circle");
const scoreDisplay = document.getElementById("score");
let score = 0;

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

// Increase score and move the circle when clicked
circle.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    moveCircle();
});

// Start moving the circle initially
moveCircle();
