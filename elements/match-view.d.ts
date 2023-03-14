import { LitElement } from "lit";
export declare class MatchView extends LitElement {
    private matchData;
    private dataStoreInstance;
    matchId: string;
    constructor();
    connectedCallback(): Promise<void>;
    handleBackButtonClick(): void;
    text: string;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
//# sourceMappingURL=match-view.d.ts.map