import { LitElement } from "lit";
import { PlayerType, DataType } from "./DataStore";
export declare class Leaderboard extends LitElement {
    data: DataType;
    players: PlayerType[];
    private dataStoreInstance;
    usernameWithNoData: string;
    name: string;
    constructor();
    connectedCallback(): Promise<void>;
    handleMatchRequest(e: CustomEvent): Promise<void>;
    handleNoPlayerData(username: string): void;
    handleClickOffModal(): void;
    handleInputChange(e: InputEvent): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
//# sourceMappingURL=leaderboard.d.ts.map