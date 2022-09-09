const small = new GameMode(6, 4, "Malá");
const medium = new GameMode(10, 5, "Střední");
const large = new GameMode(15, 6, "Velká");
const gameModes = [small, medium, large];
const newGameButton = document.getElementById("newGameButton");
const chooseGame = document.getElementById("chooseGame");
const previousGame = document.getElementById("previousGameButton");
const previousGameView = document.getElementById("previousGameView");
const resetPlayersButton = document.getElementById("resetPlayersButton");
const saveScoreButton = document.getElementById("saveScoreButton");
const player1 = new Player("", 0, "X", "blue");
const player2 = new Player("", 0, "O", "red");
const statistics = new GameStatistic();
let game;
let actualGameMode;

window.onload = function () {

    newGameButton.onclick = function () {
        $("#chooseGame").dialog({
            title: "Výběr hry",
            modal: true,
            buttons: {
                "Malá": function () {
                    newGame(0);
                    $(this).dialog("close");
                },
                "Střední": function () {
                    newGame(1);
                    $(this).dialog("close");
                },
                "Velká": function () {
                    newGame(2);
                    $(this).dialog("close");
                }
            },
        });
        chooseGame.innerHTML = "";
        for (let i = 0; i < gameModes.length; i++) {
            chooseGame.innerHTML += `<span>${gameModes[i].title}: <br> ${gameModes[i].areaSize}x${gameModes[i].areaSize} <br> ${gameModes[i].winSymbols} tahy </span>`
        }
    }

    previousGame.onclick = function () {
        $("#previousGameView").dialog({
            width:"500px",
            title: "Zaznamenaná skóre",
            modal: true,
            buttons: {
                "Vymazat všechna skóre": function () {
                    statistics.clearStatistics();
                    previousGameView.innerHTML = statistics.publishStatistics();
                }
            },
        });
        previousGameView.innerHTML = statistics.publishStatistics();
    }

    resetPlayersButton.onclick = function () {
        resetPlayers();
    }

    saveScoreButton.onclick = function () {
        statistics.addStatisticPlayedGame(actualGameMode.title, {...player1}, {...player2});
        alert("Skóre bylo uloženo!");
    }
}

function zeroScore() {
    player1.score = 0;
    player2.score = 0;
}

function newGame(gameMode) {
    zeroScore();
    actualGameMode = gameModes[gameMode];
    game = new Game(actualGameMode, player1, player2);
    resetPlayersButton.hidden = false;
    saveScoreButton.hidden = false;
}

function resetPlayers() {
    zeroScore();
    player1.name = "";
    player2.name = "";
    game = new Game(actualGameMode, player1, player2);
}