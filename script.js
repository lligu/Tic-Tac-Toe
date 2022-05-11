// Gameboard setup
const Gameboard = (() => {
    const _BoardTile = () => {
        let sign = "free";
        return { sign };
    };
    let gameboard = [];
    for (i = 0; i < 9; i++) {
        gameboard.push(_BoardTile());
        // array index config
        // 0 | 1 | 2
        // ---------
        // 3 | 4 | 5
        // ---------
        // 6 | 7 | 8
    }
    return { gameboard };
})();


// Players setup
const Player = (sign) => {
    const move = (position) => {
        Gameboard.gameboard[position].sign = sign;
        if (Gameflow.checkBoard() === true) {
            Gameflow.winGame(sign.toUpperCase())
        };
    }
    return { move };
}
const playerX = Player("x");
const playerO = Player("o");


// Gameflow setup
const Gameflow = (() => {
    const checkBoard = () => {
        const _tile0 = Gameboard.gameboard[0].sign;
        const _tile1 = Gameboard.gameboard[1].sign;
        const _tile2 = Gameboard.gameboard[2].sign;
        const _tile3 = Gameboard.gameboard[3].sign;
        const _tile4 = Gameboard.gameboard[4].sign;
        const _tile5 = Gameboard.gameboard[5].sign;
        const _tile6 = Gameboard.gameboard[6].sign;
        const _tile7 = Gameboard.gameboard[7].sign;
        const _tile8 = Gameboard.gameboard[8].sign;
        if (
            _tile0 !== "free" && _tile0 === _tile1 && _tile1 === _tile2 ||
            _tile0 !== "free" && _tile0 === _tile3 && _tile3 === _tile6 ||
            _tile1 !== "free" && _tile1 === _tile4 && _tile4 === _tile7 ||
            _tile3 !== "free" && _tile3 === _tile4 && _tile4 === _tile5 ||
            _tile2 !== "free" && _tile2 === _tile5 && _tile5 === _tile8 ||
            _tile6 !== "free" && _tile6 === _tile7 && _tile7 === _tile8 ||
            _tile0 !== "free" && _tile0 === _tile4 && _tile4 === _tile8 ||
            _tile6 !== "free" && _tile6 === _tile4 && _tile4 === _tile2) {
            return true;
        } else {
            return false;
        }
    };
    const winGame = (player) => {
        console.log(`Game won by ${player}`);
    }
    return { checkBoard, winGame };
})()


// Testing
console.log(Gameboard.gameboard)