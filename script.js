//create gameboard iife
const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""]

    const display = () => {
        let boardHTML = "";
        //in square an index from array is entered)
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
        //reselects after each click squares again, to again handleclick
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleclick);
        })
    }

    const update = (index, value) => {
        gameboard[index] = value;
        display();
    }

    //recalls the gameboard to prevent players from selecting
    //already filled divs
    const getGameboard = () => gameboard;

    return {
        display,
        update,
        getGameboard
    }
})();

//creating players
const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

//running the actual game
const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O"),
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.display();
        //click event for square divs
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", handleclick);
        })
    }
        //
    const handleclick = (event) => {
        if (gameOver) {
            return;
        }
        //split integer value from index-
        let index = parseInt(event.target.id.split("-")[1]);
        if (Gameboard.getGameboard() [index] !== "")
            return;

        Gameboard.update(index, players[currentPlayerIndex].mark);
        
        if (checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
            gameOver = true;
            displayMessage.renderMessage(`${players[currentPlayerIndex].name} Wins!`)
        } else if (checkForTie(Gameboard.getGameboard())) {
            gameOver = true;
            displayMessage.renderMessage("Tie!")

        }
        //switches player
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    const restart = () => {
        //update all squares to be empty
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, "");
        }
        //rerender the board
        Gameboard.display();
        gameOver = false;
        document.querySelector("#message").innerHTML = "";
    }

    return {
        start,
        restart,
        handleclick
    }
})();

function checkForTie(board) {
    return board.every(cell => cell !== "")
}

function checkForWin(board) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board [a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

const displayMessage = (() => {
    const renderMessage = (message) => {
        document.querySelector("#messageContainer").innerHTML = message;
    }
    return {
        renderMessage,
    }
})();

//start button to run game
const startButton = document.querySelector("#startBtn");
startButton.addEventListener("click", () => {
    Game.start();
})

const restartButton = document.querySelector("#restartBtn");
restartButton.addEventListener("click", () => {
    Game.restart();
} )
