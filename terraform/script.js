const gameBoard = document.querySelector("#game");
const cells = document.querySelectorAll(".cell");
const status = document.querySelector("#status");
const winnerTable = document.querySelector("#winner-table tbody");

let board = Array(9).fill(null); // Tracks the current board state
let moves = { X: [], O: [] }; // Tracks the moves of each player
let currentPlayer = "X";
let winners = JSON.parse(localStorage.getItem("winners")) || [];

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];

// Handle cell click
function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (board[index]) return; // If cell is already filled, ignore the click

    board[index] = currentPlayer; // Mark the cell with the current player
    moves[currentPlayer].push(index); // Track the player's moves
    e.target.textContent = currentPlayer; // Update the UI

    if (checkWinner(currentPlayer)) {
        status.textContent = `Player ${currentPlayer} wins!`;
        highlightWinningCells(currentPlayer);
        updateWinners(`Player ${currentPlayer}`); // Update leaderboard
        setTimeout(resetBoard, 2000); // Reset the board after 2 seconds
        return;
    }

    // Remove the oldest move if the player has more than 3 tokens on the board
    if (moves[currentPlayer].length > 3) {
        const oldestMove = moves[currentPlayer].shift(); // Remove the oldest move
        board[oldestMove] = null; // Remove the mark from the board
        cells[oldestMove].textContent = ""; // Clear the cell UI
        cells[oldestMove].classList.add("dimmed"); // Dim the cell
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch the player
    status.textContent = `Player ${currentPlayer}'s turn`;
}

// Check if a player has won
function checkWinner(player) {
    return winningCombinations.some(combination =>
        combination.every(index => board[index] === player)
    );
}

// Highlight winning cells
function highlightWinningCells(player) {
    winningCombinations.forEach(combination => {
        if (combination.every(index => board[index] === player)) {
            combination.forEach(index => cells[index].classList.add("winner"));
        }
    });
}

// Reset the board
function resetBoard() {
    board.fill(null); // Clear the board array
    moves = { X: [], O: [] }; // Reset moves
    currentPlayer = "X"; // Set the current player back to X
    status.textContent = `Player ${currentPlayer}'s turn`;

    // Reset the UI
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("dimmed", "winner");
    });
}

// Update the winners and save to local storage
function updateWinners(winner) {
    winners.unshift(winner);
    if (winners.length > 10) winners.pop(); // Keep only the last 10 winners
    localStorage.setItem("winners", JSON.stringify(winners));
    loadWinnerTable();
}

// Load the winner table from local storage
function loadWinnerTable() {
    winnerTable.innerHTML = "";
    winners.forEach((winner, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${index + 1}</td><td>${winner}</td>`;
        winnerTable.appendChild(row);
    });
}

// Remove dimmed class on a new move
function resetDimming() {
    cells.forEach(cell => cell.classList.remove("dimmed"));
}

// Add event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener("click", e => {
        resetDimming(); // Remove previous dimmed effect
        handleCellClick(e); // Handle cell click logic
    });
});

// Initialize the winner table and status message
loadWinnerTable();
status.textContent = `Player ${currentPlayer}'s turn`;
