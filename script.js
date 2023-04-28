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
    }

    const update = (index, value) => {
        gameboard[index] = value;
        display();
    }

    return {
        display,
        update,
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
        square.addEventListener("click", Game.handleclick);
        })
    }
        //
    const handleclick = (event) => {
        //split integer value from index-
        let index = parseInt(event.target.id.split("-")[1]);
        Gameboard.update(index, players[currentPlayerIndex].mark);
    }
    return {
        start,
        handleclick
    }
})();


//start button to run game
const startButton = document.querySelector('#startBtn');
startButton.addEventListener('click', () => {
    Game.start();
})