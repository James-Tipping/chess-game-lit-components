export interface DataType {
    games: [
        {
            url: string;
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
    url: string;
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
    username: string;
    points: number;
    is_winner: boolean;
}
export declare class DataStore {
    private static instance;
    private data;
    private constructor();
    static getInstance(): DataStore;
    getData(): Promise<DataType>;
    private sortData;
    getMatchIdFromUsername(username: string): Promise<string>;
    getMatchFromId(id: string): Promise<{
        url: string;
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
    }>;
    getMatchFromUsername(username: string): Promise<{
        url: string;
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
    }>;
    getPlayersDetails(usernameSearchString?: string): Promise<PlayerType[]>;
    getPlayerScores(): Promise<Set<number>>;
}
//# sourceMappingURL=DataStore.d.ts.map