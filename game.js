class Game {
    constructor(gameMode, player1, player2) {
        this.gameArea = document.getElementById("gameArea");
        this.restartButton = document.getElementById("restartButton");
        this.actualPlayer = document.getElementById("actualPlayer");
        this.scoreInfo = document.getElementById("score");
        this.areaSize = gameMode.areaSize;
        this.winSymbols = gameMode.winSymbols;
        this.dataGameArea = [];
        this.starterPlayer = Math.round(Math.random());
        this.player = this.starterPlayer;
        this.inicializePlayers(player1, player2);
        this.players = [player1, player2];
        this.refreshPlayerInfo();
        this.refreshGameInfo();
        this.createGameArea();
        this.fillData();
        this.fillGameArea();
        this.events();
    }

    events() {
        restartButton.onclick = () => {
            this.restartGame();
        }
    }

    restartGame() {
        this.fillData();
        this.fillGameArea();
        this.player = this.starterPlayer;
        this.refreshPlayerInfo();
    }

    createGameArea() {
        const newTable = document.createElement("table");
        const oldTable = document.getElementsByTagName("table");
        if (this.gameArea.children.length > 0)
            this.gameArea.replaceChild(newTable, oldTable[0]);
        else
            this.gameArea.appendChild(newTable);
        for (let y = 0; y < this.areaSize; y++) {
            const row = document.createElement("tr");
            newTable.appendChild(row);
            for (let x = 0; x < this.areaSize; x++) {
                const cell = document.createElement("td");
                row.appendChild(cell);
            };
        };
    }

    fillGameArea() {
        let occupiedCell = 0;
        const table = document.getElementsByTagName("table");
        const rows = table[0].getElementsByTagName("tr");
        for (let y = 0; y < rows.length; y++) {
            const cells = rows[y].getElementsByTagName("td");
            for (let x = 0; x < cells.length; x++) {
                cells[x].innerText = this.dataGameArea[x][y];
                cells[x].classList.remove("red");
                cells[x].classList.remove("blue");
                cells[x].classList.add((cells[x].innerText == "X") ? "blue" : "red");
                cells[x].onclick = () => {
                    this.markCell(x, y);
                };
                if (this.dataGameArea[x].includes("X") || this.dataGameArea[x].includes("O"))
                    occupiedCell++;
            }
        }
        if (occupiedCell > 0)
            this.restartButton.hidden = false
        else
            this.restartButton.hidden = true;
    }

    fillData() {
        for (let x = 0; x < this.areaSize; x++) {
            this.dataGameArea[x] = [];
            for (let y = 0; y < this.areaSize; y++) {
                this.dataGameArea[x][y] = " ";
            }
        }
    }

    changePlayer() {
        if (this.player == 0)
            this.player = 1
        else
            this.player = 0
        this.refreshPlayerInfo();
    }

    refreshPlayerInfo() {
        this.actualPlayer.hidden = false;
        this.actualPlayer.innerHTML = `Na tahu: <span class="${this.players[this.player].color}">${this.players[this.player].symbol}</span><br>${this.players[this.player].name}`;
    }

    refreshGameInfo() {
        this.scoreInfo.innerHTML = `<span class="${this.players[0].color}">${this.players[0].symbol}</span> ${this.player1.score}:${this.player2.score} <span class="${this.players[1].color}">${this.players[1].symbol}</span><br>${this.players[0].name} VS ${this.players[1].name}`;
    }

    inicializePlayers(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        while (player1.name.length > 10 || player1.name.length < 3) {
            player1.name = prompt("Zadejte jméno hráče s křížky.");
            if (player1.name == null)
                player1.name = "Hráč1";
            if (player1.name.length <= 10 && player1.name.length >= 3)
                break;
            alert("Zadejte jméno v délce tří až deseti znaků");
        }

        while (player2.name.length > 10 || player2.name.length < 3) {
            player2.name = prompt("Zadejte jméno hráče s kolečky.");
            if (player2.name == null)
                player2.name = "Hráč2";
            if (player2.name.length <= 10 && player2.name.length >= 3)
                break;
            alert("Zadejte jméno v délce tří až deseti znaků");
        }
    }

    changeStartPlayer() {
        if (this.starterPlayer == 0)
            this.starterPlayer = 1
        else
            this.starterPlayer = 0
    }

    markCell(x, y) {
        if (this.dataGameArea[x][y] == " ") {
            this.dataGameArea[x][y] = this.players[this.player].symbol;
            this.fillGameArea();
            this.checkGameState();
            this.changePlayer();
        }
    }

    checkGameState() {
        let sameSymbolsRow = 0;
        let sameSymbolsColumn = 0;
        let sameSymbolsLeftBottomDiagonal = 0;
        let sameSymbolsRightBottomDiagonal = 0;
        let sameSymbolsLeftTopDiagonal = 0;
        let sameSymbolsRightTopDiagonal = 0;
        let occupiedCell = 0;

        for (let x = 0; x < this.dataGameArea.length; x++) {
            sameSymbolsColumn = 0;
            sameSymbolsRow = 0;
            sameSymbolsLeftBottomDiagonal = 0;
            sameSymbolsRightBottomDiagonal = 0;
            sameSymbolsLeftTopDiagonal = 0;
            sameSymbolsRightTopDiagonal = 0;

            for (let y = 0; y < this.dataGameArea[x].length; y++) {
                if (this.dataGameArea[x][y] == this.players[this.player].symbol) {
                    sameSymbolsColumn++;
                }
                else
                    sameSymbolsColumn = 0;

                if (this.dataGameArea[y][x] == this.players[this.player].symbol) {
                    sameSymbolsRow++;
                }
                else
                    sameSymbolsRow = 0;

                if ((x + y) < this.dataGameArea.length && (this.dataGameArea[y][x + y] == this.players[this.player].symbol)) {
                    sameSymbolsLeftBottomDiagonal++;
                }
                else
                    sameSymbolsLeftBottomDiagonal = 0;

                if ((x + y) < this.dataGameArea.length && (this.dataGameArea[x + y][y] == this.players[this.player].symbol)) {
                    sameSymbolsLeftTopDiagonal++;
                }
                else
                    sameSymbolsLeftTopDiagonal = 0;

                if (((y - x) >= 0 && this.dataGameArea[this.dataGameArea.length - 1 - y][y - x] == this.players[this.player].symbol)) {
                    sameSymbolsRightTopDiagonal++;
                }
                else
                    sameSymbolsRightTopDiagonal = 0;

                if (((x + y) < this.dataGameArea.length && this.dataGameArea[this.dataGameArea.length - 1 - y][x + y] == this.players[this.player].symbol)) {
                    sameSymbolsRightBottomDiagonal++;
                }
                else
                    sameSymbolsRightBottomDiagonal = 0;

                if (this.dataGameArea[x][y] != " ") {
                    occupiedCell++;
                }
                if (sameSymbolsColumn == this.winSymbols || sameSymbolsRow == this.winSymbols || sameSymbolsLeftBottomDiagonal == this.winSymbols || sameSymbolsLeftTopDiagonal == this.winSymbols || sameSymbolsRightBottomDiagonal == this.winSymbols || sameSymbolsRightTopDiagonal == this.winSymbols) {
                    alert(`Vyhrál ${this.players[this.player].name}`);
                    this.players[this.player].score++;
                    this.restartGame();
                    this.changeStartPlayer();
                    this.refreshGameInfo();
                }
                else
                    if (occupiedCell == this.dataGameArea.length * this.dataGameArea[x].length) {
                        alert(`Remíza`);
                        this.restartGame();
                        this.changeStartPlayer();
                    }
            }
        }
    }
}