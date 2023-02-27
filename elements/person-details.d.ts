import { LitElement, nothing } from "lit";
export interface PlayerType {
    username: string;
    points: number;
    is_winner: boolean;
}
export declare class Person extends LitElement {
    static styles: import("lit").CSSResult;
    playerData: PlayerType;
    dataComponent: () => import("lit-html").TemplateResult<1> | typeof nothing;
    handleClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=person-details.d.ts.map