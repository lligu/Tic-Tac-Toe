// Gameboard setup
const Gameboard = (() => {
    const _BoardTile = (index) => {
        const tileDiv = document.querySelector(`#tile${index}`);
        let sign = "free";
        const signTile = (sign) => {
            if (sign !== "free") {
                if (sign === playerUser.sign) {
                    tileDiv.style.color = "green";
                } else {
                    tileDiv.style.color = "red";
                }
                tileDiv.textContent = sign.toUpperCase();
            }
        }
        return { signTile, index, sign, tileDiv };
    };
    let gameboard = [];
    for (i = 0; i < 9; i++) {
        gameboard.push(_BoardTile(i));
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
        if (Gameboard.gameboard[position].sign === "free") {
            Gameboard.gameboard[position].sign = sign;
            Gameboard.gameboard[position].signTile(sign);
            Gameflow.checkBoard(sign);
        }
    }
    const computerMove = () => {
        let randomIndex = Math.floor(Math.random() * (Math.floor(9) - Math.ceil(0)) + 0);
        if (Gameflow.checkBoard(sign) === "false") {
            if (Gameboard.gameboard[randomIndex].sign === "free") {
                move(randomIndex);
            } else {
                computerMove();
            }
        }
    }
    return { computerMove, move, sign };
}
let playerUser;
let playerComputer;

// Gameflow setup
const Gameflow = (() => {
    const _gameboardFadeOut = (winner) => {
        const _gameboardDiv = document.querySelector('.gameboard');
        const _gameboardWall = document.querySelector('.gameboardWall');
        const _winnerH1 = document.querySelector('.winnerH1');
        const _winnerSpan = document.querySelector('.winnerSpan');
        _gameboardDiv.style.opacity = 0;
        if (winner === "x" || winner === "o") {
            _winnerH1.textContent = "Game won by";
            if (playerUser.sign === winner) {
                _winnerSpan.style.color = "green";
            } else {
                _winnerSpan.style.color = "red";
            }
            _winnerSpan.textContent = `${winner.toUpperCase()}`
        } else {
            _winnerH1.textContent = "The game is a tie!";
            _winnerSpan.style.display = "none";
        }
        _gameboardWall.style.display = "flex";
        setTimeout(() => { _gameboardWall.style.opacity = 1; _gameboardDiv.style.display = "none" }, 1000)
    }
    let _isWin = false;
    const checkBoard = (currPlayer) => {
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
            if (_isWin === false) {
                _isWin = true;
                _gameboardFadeOut(currPlayer);
            }
            return "true";
        } else if (
            _tile0 !== "free" && _tile1 !== "free" && _tile2 !== "free" &&
            _tile3 !== "free" && _tile4 !== "free" && _tile5 !== "free" &&
            _tile6 !== "free" && _tile7 !== "free" && _tile8 !== "free") {
            if (_isWin === false) {
                _isWin = true;
                _gameboardFadeOut("tie");
            }
            return "tie";
        } else {
            return "false";
        }
    };
    return { checkBoard };
})()


// Controls setup 
const Controls = (() => {
    const _chooseCard = document.querySelector('.chooseCard');
    const _gameboardDiv = document.querySelector('.gameboard');
    const _gameStart = document.querySelector('#gameStart');
    const _gameRestart = document.querySelector('#gameRestart');
    const _chooseX = document.querySelector('#chooseX');
    const _chooseO = document.querySelector('#chooseO');
    _chooseX.addEventListener('click', () => {
        _chooseO.classList.remove('signChoosen');
        _chooseX.classList.add('signChoosen');
        _gameStart.style.opacity = 1;
        playerUser = Player('x');
        playerComputer = Player('o');
    })
    _chooseO.addEventListener('click', () => {
        _chooseX.classList.remove('signChoosen');
        _chooseO.classList.add('signChoosen');
        _gameStart.style.opacity = 1;
        playerUser = Player('o');
        playerComputer = Player('x');
    })
    _gameStart.addEventListener('click', () => {
        _chooseCard.style.opacity = 0;
        setTimeout(() => {
            _chooseCard.style.display = "none";
            _gameboardDiv.style.display = "grid";
        }, 750)
        setTimeout(() => {
            _gameboardDiv.style.opacity = 1;
        }, 800)
    })
    _gameRestart.addEventListener('click', () => {
        location.reload();
    })
    Gameboard.gameboard.forEach(tile => {
        tile.tileDiv.addEventListener('click', () => {
            sign = tile.sign;
            playerUser.move(tile.index);
            if (sign === "free") {
                playerComputer.computerMove();
            }
        }, { once: true })
    })
})();