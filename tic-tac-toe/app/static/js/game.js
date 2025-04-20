document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('reset-game');
    
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        
        checkWin();
        checkDraw();
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameActive) {
            statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWin() {
        for (let condition of winningConditions) {
            let [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                gameActive = false;
                statusDisplay.textContent = `Player ${gameState[a]} wins!`;
                return;
            }
        }
    }

    function checkDraw() {
        if (!gameState.includes('') && gameActive) {
            gameActive = false;
            statusDisplay.textContent = 'Game ended in a draw!';
        }
    }

    function resetGame() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    
    // Initialize the game
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
});