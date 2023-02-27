import { LitElement } from "lit";
export interface PlayerType {
    username: string;
    points: number;
    is_winner: boolean;
}
export interface MatchType {
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
export interface DataType {
    games: [
        {
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
export declare class Leaderboard extends LitElement {
    data: DataType;
    players: PlayerType[];
    private matchData;
    name: string;
    static styles: import("lit").CSSResult;
    constructor();
    fetchData(): Promise<void>;
    sortData(): void;
    handleMatchRequest(e: CustomEvent): void;
    handleBackButtonClick(): void;
    handleInputChange(e: InputEvent): void;
    getTournamentHtml(): import("lit-html").TemplateResult<1>;
    getGameHtml(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=leaderboard.d.ts.map