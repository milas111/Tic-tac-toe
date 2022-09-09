class GameStatistic {
    constructor() {
        const storageStatistics = localStorage.getItem("statistics");
        this.statistics = storageStatistics ? JSON.parse(storageStatistics) : [];
    }

    addStatisticPlayedGame(gameMode, player1, player2) {
        let date = new Date();
        date = String(date.getDate()).padStart(2, 0) + "-" + String(date.getMonth() + 1).padStart(2, 0) + "-" + date.getFullYear();
        const gameInfo = [gameMode, player1, player2, date];
        this.statistics.push(gameInfo);
        this.saveStatistics();
    }

    clearStatistics() {
        this.statistics = [];
        this.saveStatistics();
    }

    publishStatistics() {
        let describeStatistics = "";
        for (const s of this.statistics) {
            describeStatistics += `${s[0]}: ${s[1].name}<span class="${s[1].color}"> ${s[1].symbol}</span> ${s[1].score}:${s[2].score}<span class="${s[2].color}"> ${s[2].symbol}</span> ${s[2].name} <span style="float: right;">${s[3]}</span><br> `;
        }
        return describeStatistics;
    }

    saveStatistics() {
        localStorage.setItem("statistics", JSON.stringify(this.statistics));
    }
}