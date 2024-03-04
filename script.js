// Initialize the current player, game board, and game status
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let againstComputer = false;

// Function to handle the player's click on a cell
function handleClick(index) {
  // Check if the game is still active or if the cell is already occupied
  if (!gameActive || gameBoard[index] !== '') return;

  // Update the game board and display the player's symbol in the clicked cell
  gameBoard[index] = currentPlayer;
  document.getElementsByClassName('cell')[index].textContent = currentPlayer;

  // Check for a winner or a draw
  if (checkWinner()) {
    alert(`${currentPlayer} wins!`);
    gameActive = false; // Set the game to inactive
  } else if (gameBoard.every(cell => cell !== '')) {
    alert("It's a draw!");
    gameActive = false; // Set the game to inactive
  } else {
    switchPlayer(); // Switch to the next player
    // If playing against the computer and it's the computer's turn, make a move
    if (againstComputer && currentPlayer === 'O' && gameActive) {
      makeComputerMove();
    }
  }
}

// Function to switch the current player
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to reset the game
function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  // Check if the user has chosen to play against the computer
  againstComputer = document.getElementById('players').value === 'computer';

  // Clear the content of all cells on the board
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
  }

  // If playing against the computer and it's the computer's turn, make a move
  if (againstComputer && currentPlayer === 'O') {
    makeComputerMove();
  }
}

// Function to check for a winner based on the win patterns
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      return true; // Return true if a winning pattern is found
    }
  }

  return false; // Return false if no winning pattern is found
}

// Function for the computer to make a move (random move for simplicity)
function makeComputerMove() {
  if (!gameActive || !againstComputer) return;

  let index;
  // Choose a random index until an empty cell is found
  do {
    index = Math.floor(Math.random() * 9);
  } while (gameBoard[index] !== '');

  // Update the game board and display the computer's symbol in the chosen cell
  gameBoard[index] = currentPlayer;
  document.getElementsByClassName('cell')[index].textContent = currentPlayer;

  // Check for a winner or a draw after the computer's move
  if (checkWinner()) {
    alert(`${currentPlayer} wins!`);
    gameActive = false; // Set the game to inactive
  } else if (gameBoard.every(cell => cell !== '')) {
    alert("It's a draw!");
    gameActive = false; // Set the game to inactive
  } else {
    switchPlayer(); // Switch to the next player
  }
}
