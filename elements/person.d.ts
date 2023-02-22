import { LitElement } from "lit";
export declare class Person extends LitElement {
    playerData: {
        'username': string;
        'points': number;
        'is_winner': boolean;
    };
    dataComponent: () => import("lit-html").TemplateResult<1> | null;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=person.d.ts.map