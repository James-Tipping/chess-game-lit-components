import { LitElement } from "lit";
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
export declare class MatchView extends LitElement {
    matchData: MatchType | undefined;
    location: import("@vaadin/router").RouterLocation;
    handleBackButtonClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=match.d.ts.map