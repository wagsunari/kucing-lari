const cat = document.getElementById('cat');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');
const restartButton = document.getElementById('restart');

let isJumping = false;
let gameActive = true;
let score = 0;

function jump() {
    if (isJumping || !gameActive) return;
    isJumping = true;

    cat.style.bottom = '100px';
    
    setTimeout(() => {
        cat.style.bottom = '0';
        isJumping = false;
    }, 300);
}

const checkCollision = setInterval(() => {
    if (!gameActive) return;

    const catRect = cat.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        catRect.x < obstacleRect.x + obstacleRect.width &&
        catRect.x + catRect.width > obstacleRect.x &&
        catRect.y < obstacleRect.y + obstacleRect.height &&
        catRect.y + catRect.height > obstacleRect.y
    ) {
        gameActive = false;
        obstacle.style.animation = 'none'; // Stop the obstacle
        gameOverScreen.style.display = 'block'; // Show Game Over
    } else if (obstacleRect.x + obstacleRect.width < catRect.x && obstacleRect.x + obstacleRect.width > catRect.x - 20) {
        score += 10;
        scoreDisplay.textContent = `Skor: ${score}`;
        obstacle.style.animation = 'none'; // Stop obstacle movement
        setTimeout(() => {
            obstacle.style.animation = ''; // Reset obstacle
            obstacle.style.right = '0'; // Reset position
            obstacle.style.animation = 'move 2s linear infinite';
        }, 100); // Reset after a short delay
    }
}, 10);

restartButton.addEventListener('click', () => {
    gameActive = true;
    score = 0;
    scoreDisplay.textContent = `Skor: ${score}`;
    obstacle.style.animation = 'move 2s linear infinite'; // Restart the obstacle
    gameOverScreen.style.display = 'none'; // Hide Game Over
    cat.style.bottom = '0'; // Reset cat position
});