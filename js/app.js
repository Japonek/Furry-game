document.addEventListener("DOMContentLoaded", function (event) {

    let game = new Game();

    function Furry(x, y, direction) {
        this.x = 0;
        this.y = 0;
        this.direction = "right";
    }

    function Coin(x, y, ) {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);

    }



    function Game() {
        let continueButtons = document.getElementsByClassName("continue-button")
        let endGame = document.querySelector(".container-endgame")
        let endGameElements = document.querySelector(".endgame-elements")
        let newGameElements = document.querySelector(".newgame-elements")
        let board = document.getElementById('board');
        this.board = board.getElementsByClassName("tile");
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        this.interval = 500;
        this.index = (x, y) => {
            return (x + (y * 10));
        };
        this.start = (event) => {
            document.addEventListener('keydown', function start(event) {
                if (event.keyCode === 68) {
                    game.hideVisibleFurry()
                    game.showFurry();
                    game.showCoin();
                    game.startGame();
                    document.removeEventListener('keydown', start)
                }
            })

        }
        this.showFurry = () => {
            let furry = document.createElement('div')
            furry.classList.add("furry")
            if (this.furry.direction === "left") furry.classList.add("rotate")
            this.board[this.index(this.furry.x, this.furry.y)].appendChild(furry)

        };
        this.showCoin = () => {
            let coin = document.createElement('div')
            coin.classList.add("coin")
            this.board[this.index(this.coin.x, this.coin.y)].appendChild(coin)
        };
        this.startGame = () => {
            endGame.classList.add("invisible")
            this.control()
            this.idSetInterval = setInterval(() => {
                this.moveFurry()
            }, this.interval);
        };
        this.moveFurry = () => {

            if (this.furry.direction === "right") {
                this.furry.x++;

            } else if (this.furry.direction === "left") {
                this.furry.x--;

            } else if (this.furry.direction === "up") {
                this.furry.y--;

            } else if (this.furry.direction === "down") {
                this.furry.y++;

            }
            if (this.gameOver()) {
                this.hideVisibleFurry();
                this.checkCoinCollision();
                this.showFurry()
            }
        }
        this.hideVisibleFurry = () => {
            document.querySelector(".furry").parentNode.removeChild(document.querySelector(".furry"))
        };
        this.hideVisibleCoin = () => {
            document.querySelector(".coin").parentNode.removeChild(document.querySelector(".coin"))
        };
        this.turnFurry = function (event) {
            switch (event.which) {
                case 65:
                    this.furry.direction = 'left';
                    break;
                case 87:
                    this.furry.direction = 'up';
                    break;
                case 68:
                    this.furry.direction = 'right';
                    break;
                case 83:
                    this.furry.direction = 'down';
                    break;
            }
        }

        this.checkCoinCollision = () => {
            if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
                this.hideVisibleCoin()
                this.score++;
                if (this.interval > 60) this.interval -= 40
                clearInterval(this.idSetInterval);
                this.startGame()
                document.querySelectorAll(".scoreboard").forEach((score) => score.innerText = (this.score))
                this.coin = new Coin()
                if (this.coin.x === this.furry.x && this.coin.y === this.furry.y) this.coin.y = 8
                this.showCoin()
            }
        }

        this.gameOver = () => {
            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
                clearInterval(this.idSetInterval);
                this.hideVisibleFurry()
                this.hideVisibleCoin()
                endGameElements.classList.remove("invisible")
                endGame.classList.remove("invisible")
                newGameElements.style = ("display:none")
                document.getElementById("score").classList.add("invisible")
                let furry = document.createElement('div')
                furry.classList.add("furry")
                continueButtons[0].appendChild(furry)
                document.addEventListener('keydown', game.select)
                return false
            }
            return true
        }
        this.continueGame = () => {
            document.removeEventListener('keydown', game.select)
            endGame.classList.add("invisible")
            this.hideVisibleFurry()
            this.furry.x = 0
            this.furry.y = 0
            this.furry.direction = "right"
            document.getElementById("score").classList.remove("invisible")
            this.showCoin()
            this.showFurry()
            game.startGame()
        }
        this.restartGame = () => {
            document.removeEventListener('keydown', game.select)
            endGame.classList.add("invisible")
            this.hideVisibleFurry()
            document.getElementById("score").classList.remove("invisible")
            this.furry.x = 0
            this.furry.y = 0
            this.furry.direction = "right"
            this.score = 0
            document.querySelectorAll(".scoreboard").forEach((score) => score.innerText = (this.score))
            this.interval = 500
            delete(this.coin)
            this.coin = new Coin();
            this.showCoin()
            this.showFurry()
            game.startGame()
        }

        this.control = () => {
            document.addEventListener('keydown', function (event) {
                game.turnFurry(event);
            });
        }
        this.select = (event) => {
            if (event.keyCode === 87 || event.keyCode === 83) {
                if (continueButtons[0].contains(document.querySelector(".furry"))) {
                    this.hideVisibleFurry()
                    let furry = document.createElement('div')
                    furry.classList.add("furry")
                    continueButtons[1].appendChild(furry)
                } else {
                    this.hideVisibleFurry()
                    let furry = document.createElement('div')
                    furry.classList.add("furry")
                    continueButtons[0].appendChild(furry)
                }
            } else if (event.keyCode === 68) {
                (continueButtons[0].contains(document.querySelector(".furry"))) ? this.continueGame(): this.restartGame()
            }


        }

    }

    game.start(event)

})