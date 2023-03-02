import { LitElement } from "lit";
export declare class MatchView extends LitElement {
    private matchData;
    private dataStoreInstance;
    location: import("@vaadin/router").RouterLocation;
    constructor();
    connectedCallback(): Promise<void>;
    handleBackButtonClick(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
//# sourceMappingURL=match.d.ts.map