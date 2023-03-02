import { LitElement, nothing } from "lit";
import { PlayerType } from "./DataStore";
export declare class Person extends LitElement {
    static styles: import("lit").CSSResult;
    playerData: PlayerType;
    dataComponent: () => import("lit-html").TemplateResult<1> | typeof nothing;
    handleClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=person-details.d.ts.map