//create gameboard iife
const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""]

    const display = () => {
        let boardHTML = "";
        //in square an index from array is entered)
        gameboard.forEach((square, index) => {
            boardHTML += `<div id="square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
    }

    return {
        display,
    }
})();



//start button to run game
const startButton = document.querySelector('.startBtn')
startButton.addEventListener('click', ()=> {
    Game.start();
})