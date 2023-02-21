import { LitElement } from 'lit';
export interface playerType {
    'username': string;
    'points': number;
    'is_winner': boolean;
}
export declare class Leaderboard extends LitElement {
    data: {
        'games': [];
        'players': [
            {
                'username': string;
                'points': number;
                'is_winner': boolean;
            }
        ];
    };
    players: Array<playerType>;
    constructor();
    fetchData(): Promise<void>;
    sortData(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=leaderboard.d.ts.map