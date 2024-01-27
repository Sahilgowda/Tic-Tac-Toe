let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-block');
let drawIndicator = getComputedStyle(document.body).getPropertyValue('--draw-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let countPlays = 0;
let gameWon = false; // New variable to track if the game has been won

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
    if (gameWon) return; // If the game has been won, prevent further moves

    const id = e.target.id;
    countPlays++;

    if (!spaces[id] && countPlays < 9) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            gameWon = true; // Set the game as won
            playerText.innerHTML = `${currentPlayer} has won`;
            let winningBlocks = playerHasWon();
            winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            return;
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }

    if (!playerHasWon()) {
        if (countPlays === 9) {
            playerText.innerHTML = 'Draw Game!';
            boxes.forEach(box => box.style.color = drawIndicator);
        }
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

restartBtn.addEventListener('click', restart);

function restart() {
    gameWon = false; // Reset the gameWon variable
    spaces.fill(null);
    countPlays = 0;

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
        box.style.color = '#f2c14e';
    });

    playerText.innerHTML = 'Tic Tac Toe';

    currentPlayer = X_TEXT;
}

startGame();
