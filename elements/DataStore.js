;
export class DataStore {
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }
    async getData() {
        if (!this.data) {
            const response = await fetch("https://api.chess.com/pub/tournament/late-titled-tuesday-blitz-january-31-2023-3732262/11/1");
            if (!response.ok) {
                throw new Error('Error fetching data from API');
            }
            else {
                this.data = await response.json();
                this.sortData();
            }
        }
        return this.data;
    }
    async sortData() {
        if (!this.data) {
            await this.getData();
        }
        this.data.players.sort((a, b) => {
            if (a.is_winner === true && b.is_winner === false)
                return -1;
            if (b.is_winner === true && a.is_winner === false)
                return 1;
            if (a.points > b.points)
                return -1;
            if (a.points < b.points)
                return 1;
            else
                return 0;
        });
    }
    async getMatchIdFromUsername(username) {
        const match = await this.getMatchFromUsername(username);
        if (!match) {
            const matchId = "None";
            return matchId;
        }
        else {
            const matchId = match.url.substring(31);
            return matchId;
        }
    }
    async getMatchFromId(id) {
        if (!this.data) {
            await this.getData();
        }
        const match = this.data.games.filter(game => game.url.includes(id))[0];
        return match;
    }
    async getMatchFromUsername(username) {
        if (!this.data) {
            await this.getData();
        }
        const match = this.data.games.filter((game) => game.white.username.toLowerCase() === username.toLowerCase() ||
            game.black.username.toLowerCase() === username.toLowerCase())[0]; // why is there an error (I think undefined) when curly brackets surround the filter condition?
        return match;
    }
    async getPlayersDetails(usernameSearchString) {
        if (!this.data) {
            await this.getData();
        }
        if (usernameSearchString) {
            const playersData = this.data.players.filter(player => player.username.includes(usernameSearchString));
            return playersData;
        }
        else {
            const playersData = this.data.players;
            return playersData;
        }
    }
    async getPlayerScores() {
        if (!this.data) {
            await this.getData();
        }
        const arrayOfScores = [];
        this.data.players.forEach(player => {
            arrayOfScores.push(player.points);
        });
        const setOfScores = new Set(arrayOfScores);
        return setOfScores;
    }
}
//# sourceMappingURL=DataStore.js.map