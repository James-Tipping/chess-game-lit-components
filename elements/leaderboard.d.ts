import { LitElement } from 'lit';
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
    players: [
        {
            'username': string;
            'points': number;
            'is_winner': boolean;
        }
    ];
    constructor();
    fetchData(): void;
    sortData(): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=leaderboard.d.ts.map