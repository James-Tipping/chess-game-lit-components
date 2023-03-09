import { LitElement } from "lit";
import type { MultiSelectComboBoxSelectedItemsChangedEvent } from "@vaadin/multi-select-combo-box";
export declare class Leaderboard extends LitElement {
    private playerScores;
    private selectedPlayerScores;
    private players;
    private dataStoreInstance;
    private modalStatus;
    private name;
    constructor();
    connectedCallback(): Promise<void>;
    handleMatchRequest(e: CustomEvent): Promise<void>;
    closeModal(): void;
    handleInputChange(e: InputEvent | MultiSelectComboBoxSelectedItemsChangedEvent<number>): Promise<void>;
    getPlayerScores(): Promise<number[]>;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
//# sourceMappingURL=leaderboard.d.ts.map