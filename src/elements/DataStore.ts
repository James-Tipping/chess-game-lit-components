
export interface DataType {
  games: [
    {
      url: string,
      white: {
        username: string;
        rating: number;
        result: string;
      };
      black: {
        username: string;
        rating: number;
        result: string;
      };
    }
  ];
  players: [
    {
      username: string;
      points: number;
      is_winner: boolean;
    }
  ];
}

export interface MatchType {
  url: string,
  white: {
    username: string;
    rating: number;
    result: string;
  };
  black: {
    username: string;
    rating: number;
    result: string;
  };
}

export interface PlayerType {
  username: string,
  points: number,
  is_winner: boolean
};


export class DataStore {
  private static instance: DataStore;
  private data!: DataType;

  private constructor() { }

  static getInstance(): DataStore {
    if (!this.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }

  async getData(): Promise<DataType> {
    if (!this.data) {
      const response = await fetch("https://api.chess.com/pub/tournament/late-titled-tuesday-blitz-january-31-2023-3732262/11/1");
      if (!response.ok) {
        throw new Error('Error fetching data from API');
      } else {
        this.data = await response.json();
        this.sortData();
      }
    }
    return this.data
  }

  private async sortData() {
    if (!this.data) {
      await this.getData();
    }
    this.data.players.sort((a, b) => {
      if (a.is_winner === true && b.is_winner === false) return -1;
      if (b.is_winner === true && a.is_winner === false) return 1;
      if (a.points > b.points) return -1;
      if (a.points < b.points) return 1;
      else return 0;
    });
  }

  async getMatchIdFromUsername(username: string) {
    const match = await this.getMatchFromUsername(username);
    if (match === undefined) {
      throw new Error(`No match found for user "${username}". Please choose a different player and try again.`)
    }
    const matchId = match.url.substring(31);

    return matchId;
  }

  async getMatchFromId(id: string) {
    if (!this.data) {
      await this.getData();
    }
    const match = this.data.games.filter(game => game.url.includes(id))[0]

    return match;
  }

  async getMatchFromUsername(username: string) {
    if (!this.data) {
      await this.getData();
    }
    const match = this.data.games.filter((game) =>
      game.white.username.toLowerCase() === username.toLowerCase() ||
      game.black.username.toLowerCase() === username.toLowerCase()
    )[0]; // why is there an error (I think undefined) when curly brackets surround the filter condition?
    return match;
  }

  async getPlayersDetails(usernameSearchString?: string): Promise<PlayerType[]> {
    if (!this.data) {
      await this.getData();
    }
    if (usernameSearchString) {
      const playersData = this.data.players.filter(player => player.username.includes(usernameSearchString));
      return playersData;
    } else {
      const playersData = this.data.players;
      return playersData;
    }
  }
}