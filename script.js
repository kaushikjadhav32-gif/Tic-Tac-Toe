const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

const human = "X";
const ai = "O";

let currentPlayer = human;
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Add click event to each cell
cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
});

// Restart button
restartBtn.addEventListener("click", restartGame);

// Human clicks
function cellClicked() {

    const index = this.dataset.index;

    if (!gameActive || board[index] !== "" || currentPlayer !== human)
        return;

    board[index] = human;
    this.textContent = human;

    if (checkWinner()) return;

    currentPlayer = ai;
    statusText.textContent = "AI is thinking...";

    setTimeout(aiMove, 500);
}

// AI Move (Random)
function aiMove() {

    let emptyCells = [];

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            emptyCells.push(i);
        }
    }

    if (emptyCells.length === 0) return;

    const randomMove =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

    board[randomMove] = ai;
    cells[randomMove].textContent = ai;

    if (checkWinner()) return;

    currentPlayer = human;
    statusText.textContent = "Your Turn";
}

// Check Winner
function checkWinner() {

    for (let condition of winningConditions) {

        const a = board[condition[0]];
        const b = board[condition[1]];
        const c = board[condition[2]];

        if (a === "" || b === "" || c === "")
            continue;

        if (a === b && b === c) {

            gameActive = false;

            if (a === human) {
                statusText.textContent = "🎉 You Win!";
            } else {
                statusText.textContent = "🤖 AI Wins!";
            }

            return true;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        statusText.textContent = "🤝 It's a Draw!";
        return true;
    }

    return false;
}

// Restart Game
function restartGame() {

    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = human;

    statusText.textContent = "Your Turn";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}