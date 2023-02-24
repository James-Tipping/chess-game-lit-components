import { LitElement } from "lit";
export interface PlayerType {
    username: string;
    points: number;
    is_winner: boolean;
}
export declare class Person extends LitElement {
    playerData: PlayerType;
    dataComponent: () => import("lit-html").TemplateResult<1> | null;
    handleClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=person.d.ts.map