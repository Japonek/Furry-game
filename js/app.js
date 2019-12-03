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
        let board = document.getElementById('board');
        this.board = board.getElementsByTagName('div');
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        this.interval = 500;
        this.index = (x, y) => {
            return (x + (y * 10));
        };

        this.furry
        this.showFurry = () => {
            //  console.log(this.furry.x+" "+this.furry.y)
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');

        };
        this.showCoin = () => {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        };
        this.startGame = () => {

            this.control()
            this.idSetInterval = setInterval(() => {
                this.moveFurry()
            }, this.interval);

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

        };
        this.hideVisibleFurry = () => {
            document.querySelector(".furry").classList.remove('furry')
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
                document.querySelector("div.coin").classList.remove("coin");
                this.score++;
                if (this.interval > 60) this.interval -= 40
                console.log(this.interval)
                clearInterval(this.idSetInterval);
                this.startGame()
                document.getElementById("scoreboard").innerText = (this.score);
                this.coin = new Coin()
                if (this.coin.x === this.furry.x && this.coin.y === this.furry.y) this.coin.y = 8
                this.showCoin()
            }
        }

        this.gameOver = () => {
            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
                clearInterval(this.idSetInterval);
                this.hideVisibleFurry()
                let endGame = document.createElement("div")
                endGame.classList.add('logScreen')
                let score = document.getElementById('score')
                document.body.insertBefore(endGame, score)
                let continueGame = document.createElement('button')
                continueGame.innerText = "Continue"
                endGame.appendChild(continueGame)
                let newGame = document.createElement('button')
                newGame.innerText = "New game"
                endGame.appendChild(newGame)


                continueGame.addEventListener('click', this.continueGame)
                newGame.addEventListener('click', this.restartGame)
                return false
            }
            return true
        }
        this.continueGame = () => {
            endGame = document.querySelector('.logScreen')
            endGame.parentNode.removeChild(endGame)

            this.furry.x = 0
            this.furry.y = 0
            this.furry.direction = "right"

            this.showFurry()
            game.startGame()
        }
        this.restartGame = () => {
            endGame = document.querySelector(".logScreen")
            endGame.parentNode.removeChild(endGame)
            delete(this.furry)
            this.furry = new Furry()
            this.score = 0
            document.getElementById("scoreboard").innerText = (this.score);
            this.interval = 500
            document.querySelector("div.coin").classList.remove("coin");
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

    }

    game.showFurry();
    game.showCoin();
    game.startGame();





});