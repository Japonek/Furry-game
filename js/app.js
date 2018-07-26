document.addEventListener("DOMContentLoaded", function (event) {


    function Furry(x, y, direction) {
        this.x = 0;
        this.y = 0;
        this.direction = "right";
    }

    function Coin(x, y,) {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);

    }

    function Game() {
        var board = document.getElementById('board');
        this.board = board.getElementsByTagName('div');
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        this.index = (x, y) => {
            return (x + (y * 10));
        };
        this.showFurry = () => {

            console.log("x"+this.furry.x+"y"+this.furry.y)
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');

        };
        this.showCoin = () => {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        };
        this.startGame = () => {

            this.idSetInterval = setInterval(() => {
                this.moveFurry()
            }, 500);

            this.moveFurry = () => {
                if (this.furry.direction === "right") {
                    this.furry.x ++;
                    this.showFurry()
                } else if (this.furry.direction === "left") {
                    this.furry.x --;
                    this.showFurry()
                } else if (this.furry.direction === "up") {
                    this.furry.y --;
                    this.showFurry()
                } else if (this.furry.direction === "down") {
                    this.furry.y ++;
                    this.showFurry()
                }

                this.checkCoinCollision();
                this.gameOver();
                this.hideVisibleFurry();
            }

        };
        this.hideVisibleFurry = () => {
            document.querySelector(".furry").removeAttribute('class')
        };
        this.turnFurry=function(event){
            switch (event.which) {
                case 37:
                    this.furry.direction = 'left';
                    break;
                case 38:
                    this.furry.direction = 'up';
                    break;
                case 39:
                    this.furry.direction = 'right';
                    break;
                case 40:
                    this.furry.direction = 'down';
                    break;
            }
        }
        this.checkCoinCollision = () => {
            if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
                document.querySelector("div.coin").classList.remove("coin");
                this.score++;
                document.getElementById("scoreboard").innerText = (this.score);
                this.coin = new Coin()
                this.showCoin()
            }
        }
        this.gameOver = () => {
            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
                clearInterval(this.idSetInterval);
                this.hideVisibleFurry()
            }
        }


    }


    let game = new Game();
    game.showFurry();
    game.showCoin();
    game.startGame();






    document.addEventListener('keydown', function(event){
        game.turnFurry(event);
    });


});