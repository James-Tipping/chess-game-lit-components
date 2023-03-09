import { LitElement } from "lit";
export declare class Leaderboard extends LitElement {
    private playerScores;
    private players;
    private dataStoreInstance;
    private modalStatus;
    private name;
    constructor();
    connectedCallback(): Promise<void>;
    handleMatchRequest(e: CustomEvent): Promise<void>;
    closeModal(): void;
    handleInputChange(e: InputEvent): Promise<void>;
    getPlayerScores(): Promise<number[]>;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
//# sourceMappingURL=leaderboard.d.ts.map