import { LitElement } from "lit";
import { PlayerType, DataType } from "./DataStore";
export declare class Leaderboard extends LitElement {
    data: DataType;
    players: PlayerType[];
    private dataStoreInstance;
    modalStatus: {
        isModalOpen: boolean;
        usernameNoMatchData: string;
    };
    name: string;
    errorMessage: {
        showErrorMessage: boolean;
        message: string;
    };
    constructor();
    connectedCallback(): Promise<void>;
    handleMatchRequest(e: CustomEvent): Promise<void>;
    closeModal(): void;
    handleInputChange(e: InputEvent): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
//# sourceMappingURL=leaderboard.d.ts.map